const fs = require('fs')

const JP = require('./modules/juego_poker')

const { JuegoPoker } = JP

let salida = ''

const juego = new JuegoPoker('Ivan', 'Johana')
juego.repartirCartas()

/* Bucle para forzar las jugadas, dependiendo del resultado
   que devuelve evaluarMano()[0]; 'escalera de color' = 8,
   'poker' = 7, ..., 'carta más alta' = 0 */

/*
while (juego.jugador1.evaluarMano()[0] !== 2 || juego.jugador2.evaluarMano()[0] !== 3) {
  juego = new JuegoPoker('Ivan', 'Johana')
  juego.repartirCartas()
}
*/

salida = `Entrada:
${juego.jugador1.mostrarMano()}
${juego.jugador2.mostrarMano()}
Salida: ${juego.jugarPartida()}\n\n`

console.log(salida)

fs.appendFile('./poker_result_async.txt', salida, err => {
  if (err) console.error(err)
  else console.log('"./poker_result_async.txt" => partida agredada con éxito')
})

fs.appendFileSync('./poker_result_sync.txt', salida)
console.log('"./poker_result_sync.txt" => partida agredada con éxito')
