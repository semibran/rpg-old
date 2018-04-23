#!/usr/bin/env node
const { join, basename, extname } = require("path")
const fs = require("fs")
const pack = require("pack")
const Jimp = require("jimp")
const dest = join(__dirname, "../dist")

async function main() {
  let sourcemap = {}
  let files = process.argv.slice(2)
  let paths = files.map(file => join(process.cwd(), file))
  let common = paths[0]
  for (let i = 1; i < paths.length; i++) {
    let path = paths[i]
    while (common.length && path.indexOf(common) !== 0) {
      common = common.slice(0, -1)
    }
    if (!common.length) {
      break
    }
  }

  let names = paths.map(path => path.slice(common.length, -extname(path).length))
  let images = await Promise.all(paths.map(path => Jimp.read(path)))
  let sizes = images.map(image => [ image.bitmap.width, image.bitmap.height ])
  let layout = pack(sizes)
  let target = await new Jimp(layout.size[0], layout.size[1])
  for (let i = 0; i < images.length; i++) {
    let image = images[i]
    let name = names[i]
    let box = layout.boxes[i]
    let [ w, h ] = box.size
    let [ x, y ] = box.position
    target.blit(image, x, y, 0, 0, w, h)
    sourcemap[name] = [ x, y, w, h ]
  }

  target.write(join(dest, "sprites.png"))
  fs.writeFileSync(join(dest, "tmp/sprites.json"), JSON.stringify(sourcemap), "utf8")
}

main()
