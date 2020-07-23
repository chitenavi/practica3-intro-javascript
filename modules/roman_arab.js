const DIC_ARABE_ROMANO = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
}

const checkRoman = function (romanString) {
  let esRomano = true
  const objCont = {}

  if (romanString === '' || romanString.includes('MMMM')) esRomano = false
  else {
    for (let i = 0; i < romanString.length; i += 1) {
      /* Si la letra no pertenece al numero romano o
         aparezca mas de 4 veces, no es romano */
      if (
        !Object.prototype.hasOwnProperty.call(DIC_ARABE_ROMANO, romanString[i])
        || objCont[romanString[i]] > 4
      ) {
        esRomano = false
        break
      }

      // Contamos la repetición de cada letra y construimos un objeto con estos valores
      objCont[romanString[i]] = (objCont[romanString[i]] || 0) + 1
    }

    if (esRomano) {
      /* Observamos que se cumple las veces de repeticion
        de cada letra */
      Object.keys(objCont).forEach(key => {
        if ((key === 'D' || key === 'L' || key === 'V') && objCont[key] > 1) {
          esRomano = false
        } else if ((key === 'C' || key === 'X' || key === 'I') && objCont[key] > 3) {
          esRomano = false
        }
      })

      /* Si el número pasa el filtro de lo anterior
      buscamos que se cumplan los requisitos que restan */
      if (esRomano && romanString.length > 1) {
        for (let i = 0; i < romanString.length; i += 1) {
          const actualValue = DIC_ARABE_ROMANO[romanString[i]]

          if (i + 1 < romanString.length) {
            const nextValue = DIC_ARABE_ROMANO[romanString[i + 1]]

            if (nextValue > actualValue) {
              if (
                romanString[i - 1] === romanString[i]
                || DIC_ARABE_ROMANO[romanString[i + 2]] > actualValue
              ) {
                esRomano = false
              }
              switch (romanString[i]) {
                case 'C':
                  if (romanString[i + 1] !== 'M' && romanString[i + 1] !== 'D') {
                    esRomano = false
                  }
                  break
                case 'X':
                  if (romanString[i + 1] !== 'L' && romanString[i + 1] !== 'C') {
                    esRomano = false
                  }
                  break
                case 'I':
                  if (romanString[i + 1] !== 'X' && romanString[i + 1] !== 'V') {
                    esRomano = false
                  }
                  break
                default:
                  esRomano = false
                  break
              }
            }
          }
        }
      }
    }
  }

  return esRomano
}

const arabToRoman = function (numArab) {
  let numRomano = ''
  let numAux = numArab

  if (numArab >= 1 && numArab < 3999) {
    // Empezamos por las unidades de millar y vamos bajando descontado
    // y formando el numero romano requerido
    Object.keys(DIC_ARABE_ROMANO).forEach(i => {
      while (numAux >= DIC_ARABE_ROMANO[i]) {
        numRomano += i
        numAux -= DIC_ARABE_ROMANO[i]
      }
    })
  }

  return numRomano
}

const romanToArab = function (romanString) {
  let numArab = -1
  if (checkRoman(romanString)) {
    numArab = 0
    for (let i = 0; i < romanString.length; i += 1) {
      const actualValue = DIC_ARABE_ROMANO[romanString[i]]
      numArab += actualValue

      if (i + 1 < romanString.length) {
        const nextValue = DIC_ARABE_ROMANO[romanString[i + 1]]
        if (nextValue > actualValue) {
          numArab += nextValue - actualValue * 2
          i += 1
        }
      }
    }
  }

  return numArab
}

module.exports = { checkRoman, arabToRoman, romanToArab }
