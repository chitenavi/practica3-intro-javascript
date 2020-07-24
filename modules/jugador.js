/* Funcion constructora del jugador */
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

module.exports = { Jugador }
