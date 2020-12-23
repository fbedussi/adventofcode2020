const testData = '389125467'.split('')

const data = '364289715'.split('')

function remove3Cups(cups, currentCupIndex) {
  return cups.map((cup, index) => {
    const removedIndex = currentCupIndex < index ? index - currentCupIndex : index - (currentCupIndex - cups.length)
    const removed = removedIndex > 0 && removedIndex <= 3
    return {
      ...cup,
      removed,
      removedIndex: removed && removedIndex
    }
  })
}

function main(data) {
  let cups = data.map((n, index) => ({
    label: parseInt(n),
    removed: false,
    current: index === 0,
  }))
  const labels = cups.map(({label}) => label)
  const minLabel = Math.min(...labels)
  const maxLabel = Math.max(...labels)
  for (let move = 1; move <= 100; move++) {
    console.log(`\n-- move ${move} --`)
    console.log('cups:', cups.map(cup => cup.current ? `(${cup.label})` : cup.label).join(' '))
    const currentCupIndex = cups.findIndex(({current}) => current)
    cups = remove3Cups(cups, currentCupIndex)
    // console.log('removed', cups)
    const currentCup = cups[currentCupIndex]
    let destinationCupLabel = currentCup.label - 1
    while (!labels.includes(destinationCupLabel) || cups.find(({label}) => label === destinationCupLabel).removed) {
      // console.log({destinationCupLabel})
      destinationCupLabel = destinationCupLabel > minLabel + 1 ? destinationCupLabel - 1 : maxLabel
    }
    const pickedUpCups = cups.filter(({removed}) => removed).sort((a,b) => a.removedIndex - b.removedIndex)
    console.log('pick up:', pickedUpCups.map(({label}) => label).join(', '))
    const remainingCups = cups.filter(({removed}) => !removed)
    const destinationCupIndex = remainingCups.findIndex(({label}) => label === destinationCupLabel)
    console.log('destination', remainingCups[destinationCupIndex].label)
    cups = remainingCups.slice(0, destinationCupIndex + 1)
      .concat(pickedUpCups)
      .concat(remainingCups.slice(destinationCupIndex + 1))

    const newCurrentCupIndex = cups.findIndex(({current}) => current)
    cups = cups.map((cup, index) => ({
      ...cup, 
      removed: false, 
      removedIndex: false,
      current: newCurrentCupIndex < cups.length - 1 - 1 ? index === newCurrentCupIndex + 1 : index === 0
    }))
  }
  console.log('final', cups)
  const result = cups.map(({label}) => label).join('').split('1').reverse().join('')
  console.log('result', result)
}

main(testData)


// 76538924 too low
