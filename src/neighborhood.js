export default function neighborhood(cell, range) {
  range = range || 1
  let start = cell
  let cells = [ start ]
  let queue = [ start ]
  while (queue.length) {
    let cell = queue.shift()
    let steps = Math.abs(cell[0] - start[0]) + Math.abs(cell[1] - start[1])
    let neighbors = [
      [ cell[0] - 1, cell[1] ],
      [ cell[0] + 1, cell[1] ],
      [ cell[0], cell[1] - 1 ],
      [ cell[0], cell[1] + 1 ]
    ]

    for (let neighbor of neighbors) {
      let valid = true
      for (let cell of cells) {
        if (cell[0] === neighbor[0] && cell[1] === neighbor[1]) {
          valid = false
          break
        }
      }
      if (valid) {
        cells.push(neighbor)
        if (steps + 1 < range) {
          queue.push(neighbor)
        }
      }
    }
  }
  return cells
}
