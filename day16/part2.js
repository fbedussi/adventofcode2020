const fs = require('fs')

const data = fs.readFileSync('data.txt', 'UTF-8');

  const lines = data.split(/\r?\n/);

  let instructions = []
  let myTicket = []
  let otherTickets = []
  let isOtherTickets = false
  let prevLine = ''
  lines.forEach((line) => {
    const instructionMatch = line.match(/(.+): (.+) or (.+)/)
    if (instructionMatch) {
      const label = instructionMatch[1]
      const ranges = instructionMatch.slice(2).map((instruction) => instruction.split('-').map(str => parseInt(str)))
      instructions.push({
        label,
        ranges
      })
    }
    if (!instructionMatch && prevLine === 'your ticket:') {
      myTicket = line.split(',').map(str => parseInt(str))
    }
    if (!instructionMatch && line !== '' && (prevLine === 'nearby tickets:' || isOtherTickets)) {
      isOtherTickets = true;
      otherTickets.push(line.split(',').map(str => parseInt(str)))
    }
    prevLine = line
  });

  console.log('instructions', instructions)
  // console.log('myTicket', myTicket)
  // console.log('otherTickets', otherTickets)

  function question(instructions, tickets) {
    const flatInstructions = instructions.map(({ranges}) => ranges).flatMap(inst => inst)
    // console.log('flatInstructions', flatInstructions)
    const validTickets = tickets.filter(ticket => {
      // console.log('ticket', ticket)
      const isValid = ticket.every(value => flatInstructions.some(([min, max]) => {
        const isOk = value >= min && value <= max
        // console.table({value, min, max, isOk})
        return isOk
      }))
      // console.log('isValid', isValid)
      return isValid
    })
    // console.log('totalTickets', tickets.length, 'validTickets', validTickets.length)
    let positions = []
    validTickets.forEach(ticket => {
      ticket.forEach((value, index) => {
        const rulesLabelsSatified = instructions.filter(({ranges}) => ranges.some(([min, max]) => value >= min && value <= max)).map(({label}) => label)
        // console.log('rulesLabelsSatified', rulesLabelsSatified)
        positions[index] = positions[index] ? positions[index].filter(label => rulesLabelsSatified.includes(label)) : rulesLabelsSatified
      })
    })
    const result1 = positions
    .map((labels, index) => ({labels, index}))
    .sort((a, b) => a.labels.length - b.labels.length)
    // console.log('result1', result1)
    const result2 = result1
    .map(({index, labels}, posIndex) => ({
      index,
      labels: labels.filter(label => !result1.slice(0, posIndex).flatMap(({labels}) => labels).includes(label))
    }))
    .sort((a, b) => a.index - b.index)

    console.log('result2', result2)
    const fieldsToCheck = result2.filter(({labels}) => labels.find(label => label.match(/^departure/)))
    console.log('fieldsToCheck', fieldsToCheck)
    const fieldsToCheckIndexes = fieldsToCheck.map(({index}) => index)
    console.log('fieldsToCheckIndexes', fieldsToCheckIndexes)
    const valuesInMyTicket = myTicket.filter((_, index) => fieldsToCheckIndexes.includes(index))
    console.log('valuesInMyTicket', valuesInMyTicket)
    const finalResult = valuesInMyTicket.reduce((result, val) => result * val)
    console.log('finalResult', finalResult)
  }

  question(instructions, [myTicket].concat(otherTickets))
