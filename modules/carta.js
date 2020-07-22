function Carta(palo, valor, valorNm) {
  this.palo = palo
  this.valor = valor
  this.valorNm = valorNm
}

Carta.prototype.mostrarCarta = function () {
  return `${this.valor}${this.palo}`
}

module.exports = { Carta }
