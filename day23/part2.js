const List = require('./list.js')

const testData = '389125467'.split('')

const data = '364289715'.split('')

const LIST_LENGTH = 1000000
const MAX_MOVES = 10000000

function main(baseDataStr) {
  const baseData = baseDataStr.map(n => parseInt(n)).reverse()
  console.log(1)
  const cups = new List()
  let lastCup
  for (let i = 1; i <= LIST_LENGTH; i++) {
    const label = baseData[i - 1] || i
    const newCup = cups.insertAtBeginning({
      label,
      removed: false,
    })
    if (i === 1) {
      lastCup = newCup
    }
  }
  console.log(2)

  lastCup.next = cups.head

  cups.setCurrent(cups.head)
  
  const minLabel = 1
  const maxLabel = LIST_LENGTH

  for (let move = 1; move <= MAX_MOVES; move++) {
    console.log(`\n-- move ${move} --`)
    // console.log('cups:')
    // cups.forEach(cup => console.log(cup.data.label))
    const removedCup1 = cups.current.next
    const removedCup2 = cups.current.next.next
    const removedCup3 = cups.current.next.next.next
    // console.log('removedCups', removedCup1.data.label, removedCup2.data.label, removedCup3.data.label)

    cups.relinkCurrentTo(cups.current.next.next.next.next)
    let destinationCupLabel = cups.current.data.label - 1
    while (destinationCupLabel === 0 || destinationCupLabel === removedCup1.data.label || destinationCupLabel === removedCup2.data.label || destinationCupLabel === removedCup3.data.label) {
      // console.log({destinationCupLabel})
      destinationCupLabel = destinationCupLabel >= minLabel + 1 ? destinationCupLabel - 1 : maxLabel
    }
    // console.log('destinationCupLabel', destinationCupLabel)
    const destinationCup = cups.find(cup => {
      const label = cup.data.label
      // console.log('label', label, destinationCupLabel)
      return label === destinationCupLabel
    })
    // console.log('destinationCup', destinationCup.data.label)
    const cupAfterDestinationCup = destinationCup.next
    destinationCup.next = removedCup1
    removedCup3.next = cupAfterDestinationCup
    cups.setCurrent(cups.current.next)
  }
  // console.log('final', cups)
  const cup1 = cups.find(({data: {label}}) => label === 1)
  const cupAfter1 = cup1.next
  const cupAfterCupAfter1 = cup1.next.next
  console.log('cupAfter1', cupAfter1)
  console.log('cupAfterCupAfter1', cupAfterCupAfter1)
  const result = cupAfter1.data.label * cupAfterCupAfter1.data.label
  console.log('result', result)
}

main(testData)


// 76538924 too low
