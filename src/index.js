import loadImage from "img-load"
import disassemble from "./sprites"
import maps from "./maps"
import View from "./view"

loadImage("sprites.png")
  .then(main)

let state = {
  map: maps.test,
  cursor: {
    position: null,
    selection: null
  }
}

function get(image, x, y) {
  let i = (y * image.width + x) * 4
  let r = image.data[i]
  let g = image.data[i + 1]
  let b = image.data[i + 2]
  let a = image.data[i + 3]
  return [ r, g, b, a ]
}

function replace(image, oldColor, newColor) {
  for (var i = 0; i < image.data.length; i += 4) {
    for (var c = 0; c < 4; c++) {
      if (image.data[i + c] !== oldColor[c]) {
        break
      }
    }

    if (c !== 4) {
      continue
    }

    for (var c = 0; c < 4; c++) {
      image.data[i + c] = newColor[c]
    }
  }
}

function extract(image, x, y, width, height) {
  var canvas = document.createElement("canvas")
  var context = canvas.getContext("2d")
  canvas.width = width
  canvas.height = height
  context.drawImage(image, -x, -y)
  return canvas
}

function Canvas(width, height) {
  var canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  return canvas.getContext("2d")
}

function main(spritesheet) {
  let { map, cursor } = state
  let sprites = disassemble(spritesheet)
  sprites.squares = {
    attack: extract(sprites.squares, 16, 0, 16, 16),
    move: extract(sprites.squares, 0, 0, 16, 16)
  }

	sprites.arrows = {
		left:      extract(sprites.arrows,  0,  0, 16, 16),
		right:     extract(sprites.arrows, 16,  0, 16, 16),
		up:        extract(sprites.arrows, 32,  0, 16, 16),
		down:      extract(sprites.arrows, 48,  0, 16, 16),
		upLeft:    extract(sprites.arrows,  0, 16, 16, 16),
		upRight:   extract(sprites.arrows, 16, 16, 16, 16),
		downLeft:  extract(sprites.arrows, 32, 16, 16, 16),
		downRight: extract(sprites.arrows, 48, 16, 16, 16),
		horiz:     extract(sprites.arrows,  0, 32, 16, 16),
		vert:      extract(sprites.arrows, 16, 32, 16, 16),
	}

  sprites.pieces = { player: {}, enemy: {}, ally: {} }
  console.log(sprites)

  let palette = extract(sprites.piece, 0, 18, 3, 3)
    .getContext("2d")
    .getImageData(0, 0, 3, 3)

  let colors = {
    white: [ 255, 255, 255, 255 ],
    lightBlue: get(palette, 0, 0),
    blue:      get(palette, 1, 0),
    darkBlue:  get(palette, 2, 0)
  }

  let palettes = {
    player: [ get(palette, 0, 0), get(palette, 1, 0), get(palette, 2, 0) ],
    enemy:  [ get(palette, 0, 1), get(palette, 1, 1), get(palette, 2, 1) ],
    ally:   [ get(palette, 0, 2), get(palette, 1, 2), get(palette, 2, 2) ]
  }

  let equipments = [ "sword", "lance", "axe", "bow", "dagger", "shield", "hat" ]
  for (let faction in palettes) {
    let palette = palettes[faction]
    for (let equipment of equipments) {
      let source = sprites["symbols/" + equipment]

      let piece = Canvas(16, 18)
      let base = sprites.piece
        .getContext("2d")
        .getImageData(0, 0, 16, 18)

      replace(base, colors.blue, palette[1])
      replace(base, colors.darkBlue, palette[2])
      piece.putImageData(base, 0, 0)

      let symbol = Canvas(source.width, source.height)
      symbol.drawImage(source, 0, 0)

      let template = symbol.getImageData(0, 0, source.width, source.height)
      replace(template, colors.white, palette[0])
      symbol.putImageData(template, 0, 0)
      piece.drawImage(symbol.canvas, 4, 5)

      replace(template, palette[0], palette[2])
      symbol.putImageData(template, 0, 0)
      piece.drawImage(symbol.canvas, 4, 4)

      sprites.pieces[faction][equipment] = piece.canvas
    }
  }

  let view = View(map.layout.size[0] * 16, map.layout.size[1] * 16, sprites)
  document.body.appendChild(view.context.canvas)

  View.render(view, state)
  requestAnimationFrame(loop)

  function loop() {
    View.render(view, state)
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
      if (!cursor.position) {
        cursor.position = scale(event.offsetX, event.offsetY)
      }

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
