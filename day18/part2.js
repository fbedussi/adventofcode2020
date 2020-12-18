const fs = require('fs')

const data = '1 + 2 * 3 + 4 * 5 + 6'
const data2 = '1 + (2 * 3) + (4 * (5 + 6))'
const data3 = '2 * 3 + (4 * 5)'
const data4 = '5 + (8 * 3 + 9 + 3 * 4 * 3)'
const data5 = '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))'
const data6 = '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'

const realData = fs.readFileSync('data.txt', 'UTF-8');

function resolve(data, index) {
  console.log(data)
  // console.log('index', index)
  // console.log(data.slice(index, index + 3))
  if (data.length === 1) {
    // console.log('this is the end')
    return data[0]
  }
  console.log('operator', index, data[index + 1])
  if (data[index + 1] === '*' && data.includes('+')) {
    console.log('skipping *', index, data[index + 1], data)
    return resolve(data, index + 2)
  }
  const exp = `${Array.isArray(data[index]) ? resolve(data[index], 0) : data[index]}${data[index + 1]}${Array.isArray(data[index + 2]) ? resolve(data[index + 2], 0) : data[index + 2]}`
  console.log(exp) 
  const isTheEnd = index > data.length - 4
  console.log('isTheEnd', isTheEnd)
  return resolve(data.slice(0, index).concat([eval(exp)]).concat(data.slice(index+3)), isTheEnd ? 0 : index)
}

function parseLine(dataRaw) {
  const data = eval(`[${dataRaw
    .replace(/ /g, ',')
    .replace(/\(/g, '[')
    .replace(/\)/g, ']')
    .replace(/\+/g, '"+"')
    .replace(/\*/g, '"*"')
  }]`)
  const result = resolve(data, 0)
  console.log('result', result)
  return result
}

// parseLine(data6)

const lines = realData.split(/\r?\n/);

const results = lines.map(line => {
  console.log(line)
  return line.length ? parseLine(line) : 0})

const result = results.reduce((sum, n) => sum + n, 0)

console.log('result', result)
