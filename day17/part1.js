const testData = [
  '.#.',
  '..#',
  '###',
]

function getNumberOfNeighbors(cellIndex, lineIndex, layerIndex, layers) {
  let combinations = []
  // console.log('x, y, z', cellIndex, lineIndex, layerIndex)
  // console.log('line', layers[layerIndex] && layers[layerIndex][lineIndex])
  // console.log('cell', layers[layerIndex] && layers[layerIndex][lineIndex] && layers[layerIndex][lineIndex][cellIndex])
  const xs = [cellIndex - 1, cellIndex, cellIndex + 1]
  // console.log('xs', xs)
  xs.forEach(x => [lineIndex - 1, lineIndex, lineIndex + 1].forEach(y => [layerIndex - 1, layerIndex, layerIndex + 1].forEach(z => {
    if (x!== cellIndex || y !== lineIndex || z !== layerIndex)  combinations.push([x, y, z])
  }) ))
  // console.log(combinations)
  let neighbors = 0
  combinations.forEach(([x, y, z]) => {
    // console.log('neighbor ', layers[z] && layers[z][y] && layers[z][y][x] && layers[z][y][x])

    if (layers[z] && layers[z][y] && layers[z][y][x] && layers[z][y][x] === '#' ) {
      neighbors ++
    }
  })
  return neighbors
}

function question(data) {
  let dataAsArray = data.map(line => line.split(''))
  let cycle = 1
  let layers = [dataAsArray]
  const newLayer = dataAsArray.map(line => line.map(() => '.'))
  while (cycle <= 6) {
    layers = [newLayer].concat(layers).concat([newLayer])
    console.log('layers', layers)
    layers = layers.map((layer, layerIndex) => {
      return layer.map((line, lineIndex) => line.map((cell, cellIndex) => {
      // console.log('cell', cell)
      const isActive = cell === '#'
      let result = cell
      const numberOfNeighbors = getNumberOfNeighbors(cellIndex, lineIndex, layerIndex, layers)
      // console.log('numberOfNeighbors', numberOfNeighbors)
      if (isActive) {
        if ([2,3].includes(numberOfNeighbors)) {
          result = '#'
        } else {
          result = '.'
        }
      } else {
        if (numberOfNeighbors === 3) {
          result = '#'
        } else {
          result = '.'
        }
      }
      return result
    }))})
    cycle++
  }
}

question(testData)
