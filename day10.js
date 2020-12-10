const testData = [16,10,15,5,1,11,7,19,6,12,4]

const testData2 = [28,33,18,42,31,14,46,20,48,47,24,23,49,45,19,38,39,11,1,32,25,35,8,17,7,9,4,2,34,10,3]

const data = [56,139,42,28,3,87,142,57,147,6,117,95,2,112,107,54,146,104,40,26,136,127,111,47,8,24,13,92,18,130,141,37,81,148,31,62,50,80,91,33,77,1,96,100,9,120,27,97,60,102,25,83,55,118,19,113,49,133,14,119,88,124,110,145,65,21,7,74,72,61,103,20,41,53,32,44,10,34,121,114,67,69,66,82,101,68,84,48,73,17,43,140]

function question1(data) {
  const dataSorted = [0].concat(data.slice().sort((a,b) => a - b))
  console.log({dataSorted})
  const deviceAdapter = dataSorted[dataSorted.length - 1] + 3
  const isValid = dataSorted.concat(deviceAdapter).every((item, index, arr) => index === arr.length - 1 || arr[index + 1] - item <= 3)
  if (!isValid) {
    throw new Error('not valid')
  }
  const differences = dataSorted.concat(deviceAdapter).map((item, index, arr) => index === arr.length - 1 ? 0 : arr[index + 1] - item)
  console.log({differences})
  const result1 = differences.reduce((result, item) => {
    if (item === 1) {
      result.one = result.one + 1
    }
    if (item === 2) {
      result.one = result.two + 1
    }
    if (item === 3) {
      result.three = result.three + 1
    }
    return result
  }, {one: 0, two: 0, three: 0})
  console.log({result1})
  console.log('result1', result1.one * result1.three)
}

question1(testData)


function question2(data) {
  const dataSorted = [0].concat(data.slice().sort((a,b) => a - b))
  console.log({dataSorted})
  const deviceAdapter = dataSorted[dataSorted.length - 1] + 3
  const isValid = dataSorted.concat(deviceAdapter).every((item, index, arr) => index === arr.length - 1 || arr[index + 1] - item <= 3)
  if (!isValid) {
    throw new Error('not valid')
  }
  const differences = dataSorted.concat(deviceAdapter).map((item, index, arr) => index === arr.length - 1 ? 0 : arr[index + 1] - item)
  console.log({differences})
  

  // TODO: result 2 is wrong
  const result2 = differences.reduce((result, item, index, arr) => {
    const nextItem = arr[index + 1]
    if (nextItem && item === 1 && nextItem === 1) {
      result = result + 1
    }
    return result
  }, 0)
  console.log({result2})
  let threeOnesSequences = 0
  let i = 0
  while(i < differences.length) {
    if (differences[i] === 1 && differences[i + 1] === 1 && differences[i +2] === 1) {
      threeOnesSequences++
      i = i + 1
    } else {
      i++
    }
  }
  console.log(threeOnesSequences)
}

question2(testData2)
