const testData0 = [0,3,6]
const testData1 = [1,3,2]
const testData2 = [2,1,3]
const testData3 = [3,1,2]
const data = [2,0,6,12,1,3]


function question(data, length) {
  const map = data.slice(0, data.length - 1).reduce((result, item, index) => {
    result.set(item, index)
    return result
  }, new Map)
  let i = data.length - 1
  let lastN = data[data.length - 1] 
  let newN
  while(i < length - 1) {
    const lastNIndex  = map.get(lastN)
    newN = lastNIndex !== undefined ? i - lastNIndex : 0
    map.set(lastN,  i)
    lastN = newN
    i++
    // if (i % 50000 === 0) {
    //   console.log(i)
    // }
  }
  // console.table({lastN, lastNIndex, newN, i})
  console.log('result', newN, lastN)
}

question(data, 30000000)
