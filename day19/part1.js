const fs = require('fs')

const data = fs.readFileSync('data.txt', 'UTF-8');

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
while (unresolvedRule) {
  const referredRule = ruleMap[unresolvedRule[0]].match(/\d+/)[0]
  ruleMap[unresolvedRule[0]] = unresolvedRule[1].replace(referredRule, `(${ruleMap[referredRule]})`) 
  unresolvedRule = Object.entries(ruleMap).find(([number, rule]) => rule.match(/\d/))
}

console.log(ruleMap)

const rule0 = `^${ruleMap['0'].replace(/ /g, '')}$`
console.log('rule0', rule0)
const regex = new RegExp(rule0)
const validMessages = messages.filter(message => {
  return message.match(regex)
})

console.log('result1', validMessages, validMessages.length)



