const fs = require('fs')

const data = fs.readFileSync('data.txt', 'UTF-8');

const lines = data.split(/\r?\n/);

let tileId = ''
let i = 0
let tiles = {}
while (i < lines.length) {
  const line = lines[i]
  const idMatch = line.match(/Tile (\d+):/)
  if (idMatch) {
    tileId = idMatch[1]
  } else if (line !== '') {
    let lineArr = line.split('')
    if (tiles[tileId]) {
      tiles[tileId].push(lineArr)
    } else {
      tiles[tileId] = [lineArr]
    }
  }
  i++
}

function matchLine(line1, line2) {
  const line2Reversed = line2.slice().reverse()
  const match = line1.every((pixel, i) => pixel === line2[i]) || line1.every((pixel, i) => pixel === line2Reversed[i])
  return match
}

function hasHorizontalMatch(tile1, tile2Border) {
  const match = matchLine(tile1[0], tile2Border) || matchLine(tile1[tile1.length - 1], tile2Border)
  return match
}

function hasVerticalMatch(tile1, tile2Border) {
  const tile1LeftBorder = tile1.map(lines => lines[0])
  const tile1RightBorder = tile1.map(lines => lines[lines.length - 1])
  const match = matchLine(tile1LeftBorder, tile2Border) || matchLine(tile1RightBorder, tile2Border)
  return match
}

function getCorners([tileId, tileData], index, tiles) {
  const otherTiles = tiles.filter((_, i) => i !== index)
  const top = tileData[0]
  const bottom = tileData[tileData.length - 1]
  const left = tileData.map(lines => lines[0])
  const right = tileData.map(lines => lines[lines.length - 1])
  const neighboors = [top, bottom, left, right]
    .map(border => !otherTiles.some(([id, otherTileData]) => hasHorizontalMatch(otherTileData, border) || hasVerticalMatch(otherTileData, border)))
    .filter(Boolean)
    .length
 return neighboors === 2
}

const corners = Object.entries(tiles).filter(getCorners)

console.log(corners)

const result = corners.map(([id]) => id).reduce((tot, id) => tot * id)

console.log('result', result)
// result 14986175499719
