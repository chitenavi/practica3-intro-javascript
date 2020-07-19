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

  // Formamos la baraja
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

const deck = new BarajaPoker()
deck.barajarCartas(3)

console.log(deck.baraja)
const IVAN = new Jugador('Ivan', deck.repartirMano())
const JOHANA = new Jugador('Johana', deck.repartirMano())

console.log(IVAN.mostrarMano())
console.log(JOHANA.mostrarMano())
console.log(deck.baraja)

function JuegoPoker(jugador1, jugador2) {
  this.baraja = new BarajaPoker()
  this.jugador1 = new Jugador(jugador1, this.baraja.repartirMano())
  this.jugador2 = new Jugador(jugador2, this.baraja.repartirMano())
}

JuegoPoker.prototype.jugar = function () {}

const jugadaMano = function (mano) {
  const JUGADAS = [
    'Escalera de color',
    'Poker',
    'Full',
    'Color',
    'Escalera',
    'Trio',
    'Doble pareja',
    'Pareja',
    'Carta mas alta',
  ]
  let jugada = ''

  for (let jug = 0; jug < JUGADAS.length; jug += 1) {
    switch (jug) {
      case 0:
        const PAL = mano[0].palo
        for (let j = 0; j < mano.length; j += 1) {
          if (mano[j].palo !== PAL || mano[j].valorNm !== mano[j + 1].valorNm) {
            jugada = 'Poker'
            break
          }
        }
        break
      case 1:
    }
  }

  if (jugada !== 'Escalera de color') {
  }
}
