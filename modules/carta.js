/* Función constructora de la carta */
function Carta(palo, valor, valorNm) {
  this.palo = palo // (H, C, D, S)
  this.valor = valor // ('2', '3', ..., 'K', 'A')
  this.valorNm = valorNm // (2, 3, ..., 13, 14)
}

Carta.prototype.mostrarCarta = function () {
  return `${this.valor}${this.palo}`
}

module.exports = { Carta }
