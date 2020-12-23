const fs = require('fs')

const file = fs.readFileSync('data.txt', 'UTF-8');

const lines = file.split(/\r?\n/);

let player1 = []
let player2 = []
let isPlayer
lines.forEach(line => {
  if (line === 'Player 1:') {
    isPlayer = 1
  } else if (line === 'Player 2:') {
    isPlayer = 2
  } else if (line !== '') {
    if (isPlayer === 1) {
      player1.push(parseInt(line))
    } else if (isPlayer === 2) {
      player2.push(parseInt(line))
    }
  }
})

// console.log(player1,player2)

let round = 1
while (player1.length && player2.length) {
  const move1 = player1[0]
  const move2 = player2[0]
  if (move1 > move2) {
    console.log(round, '1 wins', player1, player2)
    player2 = player2.slice(1)
    player1 = player1.slice(1).concat([move1, move2])
  } else {
    console.log(round, '2 wins', player1, player2)
    player1 = player1.slice(1)
    player2 = player2.slice(1).concat([move2, move1])
  }
  round++
}

const winner = player1.length ? player1 : player2
const winnerScore = winner.reduce((result, card, index, cards) => {
  const position = cards.length - index
  const cardScore = card * position
  return result + cardScore
}, 0)

console.log('winnerScore', winnerScore)
