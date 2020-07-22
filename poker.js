function Carta(palo, valor, valorNm) {
  this.palo = palo
  this.valor = valor
  this.valorNm = valorNm
}

Carta.prototype.mostrarCarta = function () {
  return `${this.valor}${this.palo}`
}

function BarajaPoker() {
  const PALO = {
    C: 'clubs',
    H: 'hearts',
    S: 'spades',
    D: 'diamonds',
  }

  const PAR_VALOR = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

  this.baraja = []

  /* Formamos la baraja, cada carta con su valor y un valor
     numérico según las reglas. El 'A' tendria valor numerico de 14,
     que es la que más vale. Esto simplifica la lógica */
  Object.keys(PALO).forEach(palo => {
    for (let i = 0; i < PAR_VALOR.length; i += 1) {
      const CARTA = new Carta(palo, PAR_VALOR[i], i + 2)
      this.baraja.push(CARTA)
    }
  })
}

BarajaPoker.prototype.mostrarBaraja = function () {
  this.baraja.forEach(carta => {
    console.log(carta.mostrarCarta())
  })
}

BarajaPoker.prototype.barajarCartas = function (iteracion = 1) {
  /* Cada carta de la baraja la intercambiamos por otra
     en una posicion aleatoria dentro de la baraja */

  for (let ite = 0; ite < iteracion; ite += 1) {
    for (let i = 0; i < this.baraja.length; i += 1) {
      const POS = Math.floor(Math.random() * 52)
      const cartaTemp = this.baraja[POS]
      this.baraja[POS] = this.baraja[i]
      this.baraja[i] = cartaTemp
    }
  }
}

BarajaPoker.prototype.repartirMano = function () {
  const mano = []
  for (let i = 0; i < 5; i += 1) {
    mano.push(this.baraja.pop())
  }
  // Ordeno la mano de menor valor a mayor
  mano.sort((a, b) => a.valorNm - b.valorNm)

  return mano
}

function Jugador(nombre, mano) {
  this.nombre = nombre
  this.mano = mano
}

Jugador.prototype.mostrarMano = function () {
  let aux = ''
  for (let i = 0; i < this.mano.length; i += 1) {
    aux += ` ${this.mano[i].mostrarCarta()}`
  }

  return `${this.nombre}:${aux}`
}

Jugador.prototype.evaluarMano = function () {
  /* Funcion que se encarga de analizar que lleva la mano
     y devuelve un array con la jugada en la primera posicion
     y el valor más alto en la siguiente

     'escalera de color' = 8 ... 'carta mas alta' = 0 */

  let resultado = []

  const hayColor = function (mano) {
    let color = true

    for (let i = 0; i < mano.length - 1; i += 1) {
      if (mano[i].palo !== mano[i + 1].palo) color = false
    }
    return color
  }

  const hayEscalera = function (mano) {
    let escalera = true

    for (let i = 0; i < mano.length - 1; i += 1) {
      if (mano[i].valorNm !== mano[i + 1].valorNm - 1) escalera = false
    }
    return escalera
  }

  const contarRepCarta = function (mano) {
    /* Devuelve un array donde el indice es el valor de
       la carta y el contenido el numero que se repite */
    const nRep = new Array(15)
    nRep.fill(0)

    for (let i = 2; i < nRep.length; i += 1) {
      mano.forEach(carta => {
        if (carta.valorNm === i) nRep[i] += 1
      })
    }
    return nRep
  }

  const nRep = contarRepCarta(this.mano)

  /* Empezamos desde la mano de mayor valor (escalera color)
     hasta menor valor (carta mas alta) */

  if (hayEscalera(this.mano) && hayColor(this.mano)) resultado = [8, this.mano[4].valorNm]
  else if (nRep.includes(4)) resultado = [7, nRep.indexOf(4)]
  else if (nRep.includes(3) && nRep.includes(2)) resultado = [6, nRep.indexOf(3)]
  else if (hayColor(this.mano)) resultado = [5, this.mano[4].valorNm]
  else if (hayEscalera(this.mano)) resultado = [4, this.mano[4].valorNm]
  else if (nRep.includes(3)) resultado = [3, nRep.indexOf(3)]
  else if (nRep.includes(2)) {
    // Evaluamos la parejas que hay
    let rep = 0
    nRep.forEach((value, idx) => {
      if (value === 2) {
        rep += 1
        // Introducimos el valor de la pareja en el array
        resultado.unshift(idx)
      }
    })
    // Introducimos el numero de parejas
    resultado.unshift(rep)
  } else resultado = [0]

  return resultado
}

function JuegoPoker(jugador1, jugador2) {
  this.barajaPok = new BarajaPoker()
  this.jugador1 = new Jugador(jugador1, [])
  this.jugador2 = new Jugador(jugador2, [])
}

JuegoPoker.prototype.repartirCartas = function () {
  this.barajaPok.barajarCartas()
  this.jugador1.mano = this.barajaPok.repartirMano()
  this.jugador2.mano = this.barajaPok.repartirMano()
}

JuegoPoker.prototype.jugarPartida = function () {
  const JUGADAS = [
    'carta más alta',
    'pareja',
    'dobles parejas',
    'trío',
    'escalera',
    'color',
    'full',
    'póker',
    'escalera de color',
  ]

  const cartaMasAlta = function (manoJ1, manoJ2) {
    let gana
    for (let i = 4; i >= 0; i -= 1) {
      if (manoJ1[i].valorNm > manoJ2[i].valorNm) {
        gana = 'j1'
        break
      } else if (manoJ1[i].valorNm < manoJ2[i].valorNm) {
        gana = 'j2'
        break
      }
    }
    return gana
  }

  const MANO_J1 = this.jugador1.evaluarMano()
  const MANO_J2 = this.jugador2.evaluarMano()

  let resultado = 'Empate'
  let ganaJ1 = false
  let ganaJ2 = false

  /* Comparamos las manos obtenidas de cada jugador,
     en caso de empate, se evalua el segundo parametro
     recibido según las reglas. Por último se compara
     la carta mas alta */
  if (MANO_J1[0] > MANO_J2[0]) ganaJ1 = true
  else if (MANO_J1[0] < MANO_J2[0]) ganaJ2 = true
  else if (MANO_J1[0] <= 8 && MANO_J1[0] >= 0) {
    if (MANO_J1[1] > MANO_J2[1]) {
      ganaJ1 = true
    } else if (MANO_J1[1] < MANO_J2[1]) {
      ganaJ2 = true
    } else if (MANO_J1[2] > MANO_J2[2]) {
      ganaJ1 = true
    } else if (MANO_J1[2] < MANO_J2[2]) {
      ganaJ2 = true
    } else if (cartaMasAlta(this.jugador1.mano, this.jugador2.mano) === 'j1') {
      ganaJ1 = true
    } else if (cartaMasAlta(this.jugador1.mano, this.jugador2.mano) === 'j2') {
      ganaJ2 = true
    }
  }

  if (ganaJ1) {
    resultado = `${this.jugador1.nombre} gana, ${JUGADAS[MANO_J1[0]]}`
  } else if (ganaJ2) {
    resultado = `${this.jugador2.nombre} gana, ${JUGADAS[MANO_J2[0]]}`
  }

  return resultado
}

let juego = new JuegoPoker('Ivan', 'Johana')
juego.repartirCartas()

while (juego.jugador1.evaluarMano()[0] !== 2 || juego.jugador2.evaluarMano()[0] !== 2) {
  juego = new JuegoPoker('Ivan', 'Johana')
  juego.repartirCartas()
  console.log('.')
}
console.log(juego.jugador1.mostrarMano())
console.log(juego.jugador2.mostrarMano())
console.log(juego.jugarPartida())
