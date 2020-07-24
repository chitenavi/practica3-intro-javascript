const J = require('./jugador')
const BP = require('./baraja_poker')

const { Jugador } = J
const { BarajaPoker } = BP

/* Función constructora del juego del póker */
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
  // Jugadas de menor a mayor valor
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

module.exports = { JuegoPoker }
