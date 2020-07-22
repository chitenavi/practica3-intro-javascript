const JP = require('./modules/juego_poker')

const juego = new JP.JuegoPoker('Ivan', 'Johana')
juego.repartirCartas()

/*
while (juego.jugador1.evaluarMano()[0] !== 2 || juego.jugador2.evaluarMano()[0] !== 2) {
  juego = new JuegoPoker('Ivan', 'Johana')
  juego.repartirCartas()
  console.log('.')
}
*/
console.log(juego.jugador1.mostrarMano())
console.log(juego.jugador2.mostrarMano())
console.log(juego.jugarPartida())
