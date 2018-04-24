import sourcemap from "../dist/tmp/sprites.json"
import extract from "../lib/img-extract"
import pixels from "../lib/pixels"
import Canvas from "../lib/canvas"

export default function disassemble(spritesheet) {
	let sprites = {}
	for (let id in sourcemap) {
		let [ x, y, w, h ] = sourcemap[id]
		sprites[id] = extract(spritesheet, x, y, w, h)
	}

	sprites.squares = {
		attack: extract(sprites.squares, 16, 0, 16, 16),
		move: extract(sprites.squares, 0, 0, 16, 16)
	}

	sprites.arrows = {
		left:      extract(sprites.arrows,  0,  0, 16, 16),
		right:     extract(sprites.arrows, 16,  0, 16, 16),
		up:        extract(sprites.arrows, 32,  0, 16, 16),
		down:      extract(sprites.arrows, 48,  0, 16, 16),
		leftStub:  extract(sprites.arrows,  0, 16, 16, 16),
		rightStub: extract(sprites.arrows, 16, 16, 16, 16),
		upStub:    extract(sprites.arrows, 32, 16, 16, 16),
		downStub:  extract(sprites.arrows, 48, 16, 16, 16),
		upLeft:    extract(sprites.arrows,  0, 32, 16, 16),
		upRight:   extract(sprites.arrows, 16, 32, 16, 16),
		downLeft:  extract(sprites.arrows, 32, 32, 16, 16),
		downRight: extract(sprites.arrows, 48, 32, 16, 16),
		horiz:     extract(sprites.arrows,  0, 48, 16, 16),
		vert:      extract(sprites.arrows, 16, 48, 16, 16),
	}

	sprites.pieces = { player: {}, enemy: {}, ally: {} }

	let palette = sprites.piece
		.getContext("2d")
		.getImageData(0, 18, 3, 3 )

	let colors = {
		white: [ 255, 255, 255, 255 ],

		cyan: pixels.get(palette, 0, 0),
		blue: pixels.get(palette, 1, 0),
		navy: pixels.get(palette, 2, 0),

		pink:   pixels.get(palette, 0, 1),
		red:    pixels.get(palette, 1, 1),
		purple: pixels.get(palette, 2, 1),

		lime:  pixels.get(palette, 0, 2),
		green: pixels.get(palette, 1, 2),
		teal:  pixels.get(palette, 2, 2)
	}

	console.log(colors)

	let palettes = {
		player: [ colors.cyan, colors.blue, colors.navy ],
		enemy:  [ colors.pink, colors.red, colors.purple ],
		ally:   [ colors.lime, colors.green, colors.teal ]
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

			pixels.replace(base, colors.blue, palette[1])
			pixels.replace(base, colors.navy, palette[2])
			piece.putImageData(base, 0, 0)

			let symbol = Canvas(source.width, source.height)
			symbol.drawImage(source, 0, 0)

			let template = symbol.getImageData(0, 0, source.width, source.height)
			pixels.replace(template, colors.white, palette[0])
			symbol.putImageData(template, 0, 0)
			piece.drawImage(symbol.canvas, 4, 5)

			pixels.replace(template, palette[0], palette[2])
			symbol.putImageData(template, 0, 0)
			piece.drawImage(symbol.canvas, 4, 4)

			sprites.pieces[faction][equipment] = piece.canvas
		}
	}

	return sprites
}
