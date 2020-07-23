const C = require('./carta')

const { Carta } = C

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

module.exports = { BarajaPoker }
