const fs = require('fs')

const data = fs.readFileSync('data.txt', 'UTF-8');

  const lines = data.split(/\r?\n/);

  let instructions = []
  let myTicket = []
  let otherTickets = []
  let isOtherTickets = false
  let prevLine = ''
  lines.forEach((line) => {
    const instructionMatch = line.match(/.+: (.+) or (.+)/)
    if (instructionMatch) {
      instructions.push(instructionMatch.slice(1).map(instruction => instruction.split('-').map(str => parseInt(str))))
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

  // console.log('instructions', instructions)
  // console.log('myTicket', myTicket)
  // console.log('otherTickets', otherTickets)

  function question(instructions, tickets) {
    const flatInstructions = instructions.flatMap(inst => inst)
    // console.log('flatInstructions', flatInstructions)
    const invalidValues = tickets.map(ticket => {
      // console.log('ticket', ticket)
      const isValid = ticket.filter(value => !flatInstructions.some(([min, max]) => {
        const isOk = value >= min && value <= max
        // console.table({value, min, max, isOk})
        return isOk
      }))
      return isValid
    })
    // console.log('invalidValues', invalidValues)
    const result = invalidValues.flatMap(values => values).reduce((tot, x) => tot + x, 0)
    console.log('result1', result)
  }

  question(instructions, otherTickets)
