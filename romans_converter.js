const fs = require('fs')
const converter = require('./modules/roman_arab_module.js')

// Operacion fichero sincrona
const data = fs.readFileSync('data_romans.txt', 'utf-8')
const arrayDatos = data.split('\r\n')
console.log(arrayDatos)

for (let i = 0; i < arrayDatos.length; i += 1) {
  if (Number(arrayDatos[i])) console.log(converter.arabToRoman(arrayDatos[i]))
  else console.log(converter.romanToArab(arrayDatos[i]))
}
