// import fs from 'fs'
// import * as convRomArab from './modules/roman_arab_module.mjs'
const fs = require('fs')
const convRomArab = require('./modules/roman_arab_module')

const operarData = function (data) {
  /* Transformamos a un array de cada número,
     salto de linea */
  const arrayDatos = data.split('\r\n')

  /* Operamos y generamos los datos de salida */
  let dataOut = ''

  for (let i = 0; i < arrayDatos.length; i += 1) {
    if (arrayDatos[i]) {
      dataOut += `${arrayDatos[i]}`
      if (convRomArab.checkRoman(arrayDatos[i])) {
        dataOut += ` => ${convRomArab.romanToArab(arrayDatos[i])}`
      } else if (Number(arrayDatos[i])) {
        const romano = convRomArab.arabToRoman(arrayDatos[i])
        if (romano === '') dataOut += ' => !Error, número incorrecto'
        else dataOut += ` => ${romano}`
      } else dataOut += ' => !Error, romano incorrecto'
      dataOut += '\r\n'
    }
  }

  return dataOut
}

// -- Operacion fichero sincrona --
/* Lectura del fichero con numeros romanos, arábigos y también
   incorrectos. Cada uno por línea */
const dataSync = fs.readFileSync('./data_numbers_in.txt', 'utf-8')

/* Mostarmos por pantalla y generamos el fichero */
console.log(operarData(dataSync))
fs.writeFileSync('./data_numbers_out_sync.txt', operarData(dataSync))
console.log('"data_numbers_out_sync.txt" generado con éxito')

// -- Operacion fichero asincrona --
fs.readFile('./data_numbers_in.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  } else {
    fs.writeFile('./data_numbers_out_async.txt', operarData(data), err2 => {
      if (err) console.error(err2)
      else console.log('"data_numbers_out_async.txt" generado con éxito')
    })
  }
})
