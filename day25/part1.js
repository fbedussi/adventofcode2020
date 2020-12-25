const cardPublicKeyTest = 5764801
const doorPublicKeyTest = 17807724

const cardPublicKeyTrue = 2069194
const doorPublicKeyTrue = 16426071

function main(cardPublicKey, doorPublicKey) {
  function calculateEncryptionKey(subjectNumber, loopSize) {
    let value = 1
    for (i = 0; i < loopSize; i++) {
      value = value * subjectNumber % 20201227
    }
    return value
  }

  function reverseEngineeringLoopSize(publickKey) {
    const subjectNumber = 7
    let result = 1
    let loopSize = 0
    while (result !== publickKey) {
      loopSize++
      result = result = result * subjectNumber % 20201227
    }
    return loopSize
  }

  const cardLoopNumber = reverseEngineeringLoopSize(cardPublicKey)
  console.log(cardLoopNumber)
  const doorLoopNumber = reverseEngineeringLoopSize(doorPublicKey)
  console.log(doorLoopNumber)

  const encryptionKey1 = calculateEncryptionKey(doorPublicKey, cardLoopNumber)
  const encryptionKey2 = calculateEncryptionKey(cardPublicKey, doorLoopNumber)

  console.log(encryptionKey1, encryptionKey2)
}

// main(cardPublicKeyTest, doorPublicKeyTest)

main(cardPublicKeyTrue, doorPublicKeyTrue)
