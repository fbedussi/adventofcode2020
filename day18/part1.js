const fs = require('fs')

const data = '1 + 2 * 3 + 4 * 5 + 6'
const data2 = '1 + (2 * 3) + (4 * (5 + 6))'
const data3 = '2 * 3 + (4 * 5)'
const data4 = '5 + (8 * 3 + 9 + 3 * 4 * 3)'
const data5 = '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))'
const data6 = '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'

const realData = fs.readFileSync('data.txt', 'UTF-8');

function resolve(data) {
  if (data.length === 1) {
    return data[0]
  }
  const exp = `${Array.isArray(data[0]) ? resolve(data[0]) : data[0]}${data[1]}${Array.isArray(data[2]) ? resolve(data[2]) : data[2]}`
  // console.log(exp) 
  return resolve([eval(exp)].concat(data.slice(3)))
}

function parseLine(dataRaw) {
  const data = eval(`[${dataRaw
    .replace(/ /g, ',')
    .replace(/\(/g, '[')
    .replace(/\)/g, ']')
    .replace(/\+/g, '"+"')
    .replace(/\*/g, '"*"')
  }]`)
  const result = resolve(data)
  // console.log('result', result)
  return result
}

const lines = realData.split(/\r?\n/);

const results = lines.map(line => {
  console.log(line)
  return line.length ? parseLine(line) : 0})

const result = results.reduce((sum, n) => sum + n, 0)

console.log('result', result)
