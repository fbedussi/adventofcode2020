const List = require('./list.js')

const testData = '389125467'.split('')

const data = '364289715'.split('')

const LIST_LENGTH = 1000000
const MAX_MOVES = 10000000

function main(baseDataStr) {
  const baseData = baseDataStr.map(n => parseInt(n))
  console.log('base data ready')
  const cups = new List()
  let newCup
  let cupsMap = {}
  for (let i = 1; i <= LIST_LENGTH; i++) {
    const label = baseData[i - 1] || i
    newCup = cups.insertAfter(newCup, label)
    cupsMap[label] = newCup
  }
  console.log('data ready')

  newCup.next = cups.head

  cups.setCurrent(cups.head)
  
  const minLabel = 1
  const maxLabel = LIST_LENGTH

  for (let move = 1; move <= MAX_MOVES; move++) {
    if (move % 100000 === 0) {
      console.log(`\n-- move ${move} --`)
    }
    const removedCup1 = cups.current.next
    const removedCup2 = removedCup1.next
    const removedCup3 = removedCup2.next

    cups.relinkCurrentTo(removedCup3.next)
    let destinationCupLabel = cups.current.data - 1
    while (destinationCupLabel === 0 || destinationCupLabel === removedCup1.data || destinationCupLabel === removedCup2.data || destinationCupLabel === removedCup3.data) {
      destinationCupLabel = destinationCupLabel >= minLabel + 1 ? destinationCupLabel - 1 : maxLabel
    }
    const destinationCup = cupsMap[destinationCupLabel]
    const cupAfterDestinationCup = destinationCup.next
    destinationCup.next = removedCup1
    removedCup3.next = cupAfterDestinationCup
    cups.setCurrent(cups.current.next)
  }
  const cup1 = cups.find(({data}) => data === 1)
  const cupAfter1 = cup1.next
  const cupAfterCupAfter1 = cup1.next.next
  console.log('cupAfter1', cupAfter1.data)
  console.log('cupAfterCupAfter1', cupAfterCupAfter1.data)
  const result = cupAfter1.data * cupAfterCupAfter1.data
  console.log('result', result)
}

main(data)
