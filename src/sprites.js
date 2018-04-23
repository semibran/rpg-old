import sourcemap from "../dist/tmp/sprites.json"

export default function disassemble(spritesheet) {
  return extract(spritesheet, sourcemap)
}

function extract(image, sourcemap) {
  let sprites = {}
  for (let id in sourcemap) {
    let [ x, y, w, h ] = sourcemap[id]
    let canvas = document.createElement("canvas")
    let context = canvas.getContext("2d")
    canvas.width = w
    canvas.height = h
    context.drawImage(image, -x, -y)
    sprites[id] = canvas
  }
  return sprites
}
