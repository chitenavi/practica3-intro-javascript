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

  const PAR_VALOR = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
  ]

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
  mano.sort((a, b) => {
    return a.valorNm - b.valorNm
  })
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

  if (hayEscalera(this.mano) && hayColor(this.mano))
    resultado = [8, this.mano[4].valorNm]
  else if (nRep.includes(4)) resultado = [7, nRep.indexOf(4)]
  else if (nRep.includes(3) && nRep.includes(2))
    resultado = [6, nRep.indexOf(3)]
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
  this.barajaPok.barajarCartas(2)
  this.jugador1.mano = this.barajaPok.repartirMano()
  this.jugador2.mano = this.barajaPok.repartirMano()
}

/*
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

  const MANOJ1 = this.jugador1.evaluarMano()
  const MANOJ2 = this.jugador2.evaluarMano()

  let resultado = 'Empate'
  let ganaJ1 = false
  let ganaJ2 = false

  if (MANOJ1[0] > MANOJ2[0]) ganaJ1 = true
  else if (MANOJ1[0] < MANOJ2[0]) ganaJ2 = true
  else if (MANOJ1[0] <= 8 && MANOJ1[0] >= 3) {
    if (MANOJ1[1] > MANOJ2[1]) {
      ganaJ1 = true
    } else if (MANOJ1[1] < MANOJ2[1]) {
      ganaJ2 = true
    }
  } else if (MANOJ1[0] === 2) {
    if (MANOJ1[1] > MANOJ2[1]) {
      ganaJ1 = true
    } else if (MANOJ1[1] < MANOJ2[1]) {
      ganaJ2 = true
    } else if (MANOJ1[2] > MANOJ2[2]) {
      ganaJ1 = true
    } else if (MANOJ1[2] < MANOJ2[2]) {
      ganaJ2 = true
    }
  } else if (MANOJ1[0] === 1) {
    if (MANOJ1[1] > MANOJ2[1]) {
      ganaJ1 = true
    } else if (MANOJ1[1] < MANOJ2[1]) {
      ganaJ2 = true
    }
  } else if (MANOJ1[0] === 0) {
    for (let i = 4; i >= 0; i -= 1) {
      if (this.jugador1.mano[i].valorNm > this.jugador2.mano[i].valorNm) {
        ganaJ1 = true
        break
      } else if (
        this.jugador1.mano[i].valorNm < this.jugador2.mano[i].valorNm
      ) {
        ganaJ2 = true
        break
      }
    }
  }

  if (ganaJ1) {
    resultado = `${this.jugador1.nombre} gana, ${JUGADAS[MANOJ1[0]]}`
  } else if (ganaJ2) {
    resultado = `${this.jugador2.nombre} gana, ${JUGADAS[MANOJ2[0]]}`
  }

  return resultado
}
*/
const jugar = function (jugador1, jugador2) {
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

  const MANOJ1 = jugador1.evaluarMano()
  const MANOJ2 = jugador2.evaluarMano()

  let resultado = 'Empate'
  let ganaJ1 = false
  let ganaJ2 = false

  if (MANOJ1[0] > MANOJ2[0]) ganaJ1 = true
  else if (MANOJ1[0] < MANOJ2[0]) ganaJ2 = true
  else if (MANOJ1[0] <= 8 && MANOJ1[0] >= 3) {
    if (MANOJ1[1] > MANOJ2[1]) {
      ganaJ1 = true
    } else if (MANOJ1[1] < MANOJ2[1]) {
      ganaJ2 = true
    }
  } else if (MANOJ1[0] === 2) {
    if (MANOJ1[1] > MANOJ2[1]) {
      ganaJ1 = true
    } else if (MANOJ1[1] < MANOJ2[1]) {
      ganaJ2 = true
    } else if (MANOJ1[2] > MANOJ2[2]) {
      ganaJ1 = true
    } else if (MANOJ1[2] < MANOJ2[2]) {
      ganaJ2 = true
    } else {
      for (let i = 4; i >= 0; i -= 1) {
        if (jugador1.mano[i].valorNm > jugador2.mano[i].valorNm) {
          ganaJ1 = true
          break
        } else if (jugador1.mano[i].valorNm < jugador2.mano[i].valorNm) {
          ganaJ2 = true
          break
        }
      }
    }
  } else if (MANOJ1[0] === 1) {
    if (MANOJ1[1] > MANOJ2[1]) {
      ganaJ1 = true
    } else if (MANOJ1[1] < MANOJ2[1]) {
      ganaJ2 = true
    }
  } else if (MANOJ1[0] === 0) {
    for (let i = 4; i >= 0; i -= 1) {
      if (jugador1.mano[i].valorNm > jugador2.mano[i].valorNm) {
        ganaJ1 = true
        break
      } else if (jugador1.mano[i].valorNm < jugador2.mano[i].valorNm) {
        ganaJ2 = true
        break
      }
    }
  }

  if (ganaJ1) {
    resultado = `${jugador1.nombre} gana, ${JUGADAS[MANOJ1[0]]}`
  } else if (ganaJ2) {
    resultado = `${jugador2.nombre} gana, ${JUGADAS[MANOJ2[0]]}`
  }

  return resultado
}
/*
const JUEGO = new JuegoPoker('Ivan', 'Johana')
JUEGO.repartirCartas()
console.log(JUEGO.jugador1.mostrarMano())
console.log(JUEGO.jugador2.mostrarMano())
console.log(JUEGO.jugar())
*/

const bar = new BarajaPoker()
const jug1 = new Jugador('jug1', [])
const jug2 = new Jugador('jug2', [])
/*
console.log(bar.baraja)
for (let i = 0; i < 5; i += 1) {
  jug1.mano.push(bar.baraja[i])
  jug2.mano.push(bar.baraja[i + 13])
}
*/
jug2.mano.push(bar.baraja[5])
jug2.mano.push(bar.baraja[18])
jug2.mano.push(bar.baraja[1])
jug2.mano.push(bar.baraja[14])
jug2.mano.push(bar.baraja[18 + 1])
jug1.mano.push(bar.baraja[26])
jug1.mano.push(bar.baraja[39])
jug1.mano.push(bar.baraja[27])
jug1.mano.push(bar.baraja[40])
jug1.mano.push(bar.baraja[47])

jug1.mano.sort((a, b) => {
  return a.valorNm - b.valorNm
})
jug2.mano.sort((a, b) => {
  return a.valorNm - b.valorNm
})

console.log(jug1.mano)
console.log(jug2.mano)
console.log(jug1.evaluarMano())
console.log(jug2.evaluarMano())
console.log(jugar(jug1, jug2))
