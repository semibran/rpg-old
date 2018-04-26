import sourcemap from "../dist/tmp/sprites.json"
import extract from "../lib/img-extract"
import pixels from "../lib/pixels"
import Canvas from "../lib/canvas"

export default function normalize(spritesheet) {
	let sprites = disassemble(spritesheet, sourcemap)
	return {
		tiles:  sprites.tiles,
		pieces: pieces(sprites.piece),
		ui:     ui(sprites.ui),
	}
}

function disassemble(spritesheet, sourcemap) {
	let sprites = {}
	for (let id in sourcemap) {
		if (Array.isArray(sourcemap[id])) {
			let [ x, y, w, h ] = sourcemap[id]
			sprites[id] = extract(spritesheet, x, y, w, h)
		} else {
			sprites[id] = disassemble(spritesheet, sourcemap[id])
		}
	}

	return sprites
}

function pieces(sprites) {
	let pieces = {
		player: {},
		enemy: {},
		ally: {},
		shadow: sprites.shadow
	}

	let palette = sprites.palette
		.getContext("2d")
		.getImageData(0, 0, 3, 3)

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

	let palettes = {
		player: [ colors.cyan, colors.blue, colors.navy ],
		enemy:  [ colors.pink, colors.red, colors.purple ],
		ally:   [ colors.lime, colors.green, colors.teal ]
	}

	for (let faction in palettes) {
		let palette = palettes[faction]
		for (let name in sprites.symbols) {
			let source = sprites.symbols[name]
			let piece = Canvas(16, 16)
			let base = sprites.base
				.getContext("2d")
				.getImageData(0, 0, 16, 16)

			pixels.replace(base, colors.cyan, palette[0])
			pixels.replace(base, colors.blue, palette[1])
			pixels.replace(base, colors.navy, palette[2])
			piece.putImageData(base, 0, 0)

			let symbol = Canvas(source.width, source.height)
			symbol.drawImage(source, 0, 0)

			let template = symbol.getImageData(0, 0, source.width, source.height)
			pixels.replace(template, colors.white, palette[0])
			symbol.putImageData(template, 0, 0)
			piece.drawImage(symbol.canvas, 5, 5)

			pixels.replace(template, palette[0], palette[2])
			symbol.putImageData(template, 0, 0)
			piece.drawImage(symbol.canvas, 5, 4)

			pieces[faction][name] = piece.canvas
		}
	}

	return pieces
}

function ui(sprites) {
	return {
		cursor:  sprites.cursor,
		swords:  sprites.swords,
		squares: squares(sprites.squares),
		arrows:  arrows(sprites.arrows)
	}
}

function squares(image) {
	return {
		move:   extract(image,  0, 0, 16, 16),
		attack: extract(image, 16, 0, 16, 16)
	}
}

function arrows(image) {
	return {
		left:      extract(image,  0,  0, 16, 16),
		right:     extract(image, 16,  0, 16, 16),
		up:        extract(image, 32,  0, 16, 16),
		down:      extract(image, 48,  0, 16, 16),
		leftStub:  extract(image,  0, 16, 16, 16),
		rightStub: extract(image, 16, 16, 16, 16),
		upStub:    extract(image, 32, 16, 16, 16),
		downStub:  extract(image, 48, 16, 16, 16),
		upLeft:    extract(image,  0, 32, 16, 16),
		upRight:   extract(image, 16, 32, 16, 16),
		downLeft:  extract(image, 32, 32, 16, 16),
		downRight: extract(image, 48, 32, 16, 16),
		horiz:     extract(image,  0, 48, 16, 16),
		vert:      extract(image, 16, 48, 16, 16),
	}
}
