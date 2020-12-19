const fs = require('fs')

const data = fs.readFileSync('data2.txt', 'UTF-8');

const lines = data.split(/\r?\n/);

// console.log(lines)
const separatorIndex = lines.findIndex(line => line === '')
const rules = lines.slice(0,separatorIndex)
const messages = lines.slice(separatorIndex + 1).filter(line => line !== '')

// console.log(messages)

const ruleMap = rules.reduce((map, ruleRaw) => {
  const [ruleNumber, rule] = ruleRaw.split(': ')
  map[ruleNumber] = rule.replace(/"/g, '')
  return map
}, {})

// console.log(ruleMap)

let unresolvedRule = Object.entries(ruleMap).find(([number, rule]) => rule.match(/\d/))
// console.log('referredRules', referredRules)
while (ruleMap['0'].match(/\d/)) {
  const referredRule = ruleMap[unresolvedRule[0]].match(/\d+/)[0]
  ruleMap[unresolvedRule[0]] = unresolvedRule[1].replace(referredRule, `(${ruleMap[referredRule]})`) 
  unresolvedRule = Object.entries(ruleMap).find(([number, rule]) => rule.match(/\d/))
}

console.log(ruleMap)

const maxLength = messages.map(message => message.length).sort((a, b) => b - a)[0]

console.log('max length', maxLength)

let validCombinations = []
for (let i = 1; i < maxLength / 2; i++) {
  const rule0 = `^${ruleMap['0'].replace(/ /g, '').replace(/\{\}/g, `{${i}}`)}$`
  // console.log('rule0', rule0)
  const regex = new RegExp(rule0)
  const validMessages = messages.filter(message => {
    return message.match(regex)
  })
  
  validCombinations.push(validMessages.length)
  console.log('validMessages.length', validMessages.length)
}

console.log(validCombinations.reduce((tot, n) => tot + n), 0)



