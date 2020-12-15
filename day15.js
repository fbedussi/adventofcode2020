const testData0 = [0,3,6]
const testData1 = [1,3,2]
const testData2 = [2,1,3]
const testData3 = [3,1,2]
const data = [2,0,6,12,1,3]

function question(data) {
  while(data.length < 2020) {
    const lastN = data[data.length - 1]
    // console.log({lastN})
    const lastNindex = data.slice(0, data.length - 1).reverse().findIndex(n => n === lastN)
    // console.log({lastNindex})
    const newN = Math.max(0, lastNindex + 1)
    // console.log({newN})
    data.push(newN)
  }
  console.log(data.length, data[2019])
}

question(data)
