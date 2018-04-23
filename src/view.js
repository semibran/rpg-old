import neighborhood from "./neighborhood"
import equipment from "./equipment.json"

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
  let { context, sprites } = view
  let { map, cursor } = state

  let floors = []
  let walls = []
  for (let y = 0; y < map.layout.size[1]; y++) {
    for (let x = 0; x < map.layout.size[0]; x++) {
      let i = y * map.layout.size[0] + x
      let id = map.layout.data[i]
      if (id === 0) {
        floors.push([ x, y ])
      } else if (id === 1) {
        walls.push([ x, y ])
      }
    }
  }

}

function render(view, state) {
  let { context, sprites, animation, squares } = view
  let { map, cursor } = state

  let floors = []
  let walls = []
  for (let y = 0; y < map.layout.size[1]; y++) {
    for (let x = 0; x < map.layout.size[0]; x++) {
      let i = y * map.layout.size[0] + x
      let id = map.layout.data[i]
      if (id === 0) {
        floors.push([ x, y ])
      } else if (id === 1) {
        walls.push([ x, y ])
      }
    }
  }

  for (let [ x, y ] of floors) {
    context.drawImage(sprites.grass, x * 16, y * 16)
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
          offset: 0,
          range: 0
        }
      }

      if (!squares) {
        let move = unit.class === "soldier" ? 5 : unit.class === "knight" ? 3 : 4
        let range = unit.class === "archer" || unit.class === "mage" ? 2 : 1
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
      let furthest = 0
      for (let [ x, y ] of squares.attack) {
        let steps = Math.abs(x - unit.position[0]) + Math.abs(y - unit.position[1])
        if (steps <= animation.time) {
          context.drawImage(sprites.squares.attack, x * 16, y * 16)
        }

        if (steps > furthest) {
          furthest = steps
        }
      }

      for (let [ x, y ] of squares.move) {
        let steps = Math.abs(x - unit.position[0]) + Math.abs(y - unit.position[1])
        if (steps <= animation.time) {
          context.drawImage(sprites.squares.move, x * 16, y * 16)
        }

        if (steps > furthest) {
          furthest = steps
        }
      }

      animation.data.range = furthest
    }
  } else {
    if (animation) {
      if (animation.type !== "drop") {
        animation = view.animation = {
          type: "drop",
          time: 0,
          data: {
            target: animation.data.target,
            offset: animation.data.offset,
            range: animation.data.range
          }
        }
      } else if (squares) {
        let unit = map.units[animation.data.target]
        for (let [ x, y ] of squares.attack) {
          let steps = Math.abs(x - unit.position[0]) + Math.abs(y - unit.position[1])
          if (steps <= animation.data.range - animation.time) {
            context.drawImage(sprites.squares.attack, x * 16, y * 16)
          }
        }

        for (let [ x, y ] of squares.move) {
          let steps = Math.abs(x - unit.position[0]) + Math.abs(y - unit.position[1])
          if (steps <= animation.data.range - animation.time) {
            context.drawImage(sprites.squares.move, x * 16, y * 16)
          }
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
          squares = view.squares = null
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

  for (let [ x, y ] of walls) {
    context.drawImage(sprites.wall, x * 16, y * 16 - 8)
  }
}

export default View
View.render = render
