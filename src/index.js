import loadImage from "img-load"

const sourcemaps = {
  squares: {
    move:   [  0, 0, 16, 16 ],
    attack: [ 16, 0, 16, 16 ]
  },
  pieces: {
    player: {
      sword:  [  0, 0, 16, 18 ],
      axe:    [ 16, 0, 16, 18 ],
      shield: [ 32, 0, 16, 18 ],
      bow:    [ 48, 0, 16, 18 ]
    },
    enemy: {
      sword:  [  0, 18, 16, 18 ],
      axe:    [ 16, 18, 16, 18 ],
      shield: [ 32, 18, 16, 18 ],
      bow:    [ 48, 18, 16, 18 ]
    },
    ally: {
      sword:  [  0, 36, 16, 18 ],
      axe:    [ 16, 36, 16, 18 ],
      shield: [ 32, 36, 16, 18 ],
      bow:    [ 48, 36, 16, 18 ]
    }
  }
}

const equipment = {
  soldier: "sword",
  warrior: "axe",
  knight: "shield",
  archer: "bow"
}

let paths = [ "./sprites/grass.png", "./sprites/wall.png", "./sprites/pieces.png", "./sprites/shadow.png", "./sprites/squares.png" ]
Promise.all(paths.map(path => loadImage(path)))
  .then(main)

let state = {
  map: {
    size: [ 16, 16 ],
    layout: [
      1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1,
      1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
      1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
    ],
    units: [
      { class: "soldier", faction: "player", position: [ 6, 7 ] },
      { class: "knight",  faction: "player", position: [ 7, 9 ] },
      { class: "warrior", faction: "enemy",  position: [ 8, 6 ] },
      { class: "archer",  faction: "ally",   position: [ 9, 8 ] }
    ]
  },
  cursor: {
    position: null,
    selection: null
  }
}

function main(sprites) {
  sprites = {
    floor: sprites[0],
    wall: sprites[1],
    shadow: sprites[3],
    squares: extract(sprites[4], sourcemaps.squares),
    pieces: extract(sprites[2], sourcemaps.pieces)
  }

  let { map, cursor } = state
  let view = View(map.size[0] * 16, map.size[1] * 16, sprites)
  document.body.appendChild(view.context.canvas)

  render(view, state)
  requestAnimationFrame(loop)

  function loop() {
    render(view, state)
    requestAnimationFrame(loop)
  }

  window.addEventListener("mousemove", event => {
    let canvas = view.context.canvas
    if (event.target === canvas) {
      cursor.position = scale(event.offsetX, event.offsetY)
    }
  })

  window.addEventListener("mousedown", event => {
    let canvas = view.context.canvas
    if (event.target === canvas) {
      let [ x, y ] = cursor.position
      for (let i = 0; i < map.units.length; i++) {
        let unit = map.units[i]
        if (unit.position[0] === x && unit.position[1] === y) {
          cursor.selection = i
          break
        }
      }
    }
  })

  window.addEventListener("mouseup", event => {
    if (cursor.selection !== null) {
      cursor.selection = null
    }
  })

  function scale(x, y) {
    let canvas = view.context.canvas
    let width = canvas.width
    let height = canvas.height
    return [ Math.floor(x / width * 16), Math.floor(y / height * 16) ]
  }
}

function neighborhood(cell, range) {
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

function View(width, height, sprites) {
  let canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height

  return {
    context: canvas.getContext("2d"),
    sprites: sprites,
    animation: null,
    squares: null
  }
}

function render(view, state) {
  let { context, sprites, animation, squares } = view
  let { map, cursor } = state

  for (let y = 0; y < map.size[0]; y++) {
    for (let x = 0; x < map.size[1]; x++) {
      let i = y * map.size[0] + x
      let id = map.layout[i]
      if (id === 0) {
        context.drawImage(sprites.floor, x * 16, y * 16)
      }
    }
  }

  if (animation) {
    animation.time++
  }

  if (cursor.selection !== null) {
    let unit = map.units[cursor.selection]

    if (!animation) {
      animation = view.animation = {
        type: "lift",
        time: 0,
        data: {
          target: cursor.selection,
          offset: 0
        }
      }
    } else if (animation.type === "lift" && animation.time >= 8) {
      animation = view.animation = {
        type: "float",
        time: 0,
        data: {
          target: cursor.selection,
          offset: 0
        }
      }

      if (!squares) {
        let move = unit.class === "soldier" ? 4 : 3
        let range = unit.class === "archer" ? 2 : 1
        squares = view.squares = {
          move: neighborhood(unit.position, move),
          attack: neighborhood(unit.position, move + range)
        }

        for (let i = 0; i < squares.move.length; i++) {
          let square = squares.move[i]
          for (let j = 0; j < map.units.length; j++) {
            let unit = map.units[j]
            if (square[0] === unit.position[0] && square[1] === unit.position[1]) {
              squares.move.splice(i, 1)
              break
            }
          }
        }

        for (let i = 0; i < squares.attack.length; i++) {
          let square = squares.attack[i]
          if (square[0] === unit.position[0] && square[1] === unit.position[1]) {
            squares.attack.splice(i, 1)
            break
          }
        }
      }
    }

    if (animation.type === "float") {
      for (let [ x, y ] of squares.attack) {
        if (Math.abs(x - unit.position[0]) + Math.abs(y - unit.position[1]) <= animation.time / 2) {
          context.drawImage(sprites.squares.attack, x * 16, y * 16)
        }
      }

      for (let [ x, y ] of squares.move) {
        if (Math.abs(x - unit.position[0]) + Math.abs(y - unit.position[1]) <= animation.time / 2) {
          context.drawImage(sprites.squares.move, x * 16, y * 16)
        }
      }
    }
  } else {
    squares = view.squares = null
    if (animation && animation.type !== "drop") {
      animation = view.animation = {
        type: "drop",
        time: 0,
        data: {
          target: animation.data.target,
          offset: animation.data.offset
        }
      }
    }
  }

  for (let i = 0; i < map.units.length; i++) {
    let unit = map.units[i]
    let x = unit.position[0] * 16
    let y = unit.position[1] * 16
    let ox = x
    let oy = y
    let sprite = sprites.pieces[unit.faction][equipment[unit.class]]

    if (animation && i === animation.data.target) {
      if (animation.type === "lift") {
        animation.data.offset = Math.min(8, animation.time)
      } else if (animation.type === "float") {
        let duration = 60 * 3
        let progress = animation.time % duration / duration
        animation.data.offset = 8 + Math.sin(2 * Math.PI * progress) * 2
      } else if (animation.type === "drop") {
        if (--animation.data.offset < 0) {
          animation.data.offset = 0
          view.animation = null
        }
      }

      oy -= animation.data.offset
    }

    if (!animation
    || animation && animation.data.target !== i
    || animation && animation.data.target === i && animation.time % 2
    ) {
      context.drawImage(sprites.shadow, Math.round(x), Math.round(y + 2))
    }

    context.drawImage(sprite, Math.round(x), Math.round(oy - 2))
  }

  for (let y = 0; y < map.size[0]; y++) {
    for (let x = 0; x < map.size[1]; x++) {
      let i = y * map.size[0] + x
      let id = map.layout[i]
      if (id === 1) {
        context.drawImage(sprites.wall, x * 16, y * 16 - 8)
      }
    }
  }
}

function extract(image, sourcemap, sprites) {
  sprites = sprites || {}
  for (let id in sourcemap) {
    if (Array.isArray(sourcemap[id])) {
      let [ x, y, w, h ] = sourcemap[id]
      let canvas = document.createElement("canvas")
      canvas.width = w
      canvas.height = h

      let context = canvas.getContext("2d")
      context.drawImage(image, -x, -y)

      sprites[id] = canvas
    } else {
      sprites[id] = extract(image, sourcemap[id])
    }
  }
  return sprites
}
