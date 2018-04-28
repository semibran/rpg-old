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
			let symbol = Canvas(source.width, source.height)
			symbol.drawImage(source, 0, 0)

			let base = sprites.base
				.getContext("2d")
				.getImageData(0, 0, 16, 16)

			pixels.replace(base, colors.cyan, palette[0])
			pixels.replace(base, colors.blue, palette[1])
			pixels.replace(base, colors.navy, palette[2])

			let piece = Canvas(base.width, base.height)
			piece.putImageData(base, 0, 0)

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
		typeface: typeface(sprites.typeface),
		cursor:  cursor(sprites.cursor),
		swords:  sprites.swords,
		box: {
			topLeft:     extract(sprites.box,  0,  0, 16, 16),
			top:         extract(sprites.box, 16,  0, 16, 16),
			topRight:    extract(sprites.box, 32,  0, 16, 16),
			left:        extract(sprites.box,  0, 16, 16, 16),
			center:      extract(sprites.box, 16, 16, 16, 16),
			right:       extract(sprites.box, 32, 16, 16, 16),
			bottomLeft:  extract(sprites.box,  0, 32, 16, 16),
			bottom:      extract(sprites.box, 16, 32, 16, 16),
			bottomRight: extract(sprites.box, 32, 32, 16, 16),
		},
		squares: {
			move:   extract(sprites.squares,  0, 0, 16, 16),
			attack: extract(sprites.squares, 16, 0, 16, 16)
		},
		arrows: {
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
	}
}

function typeface(image) {
	const cols = 10
	const rows = 7
	const width = 8
	const height = 8
	const sequence =
		`0123456789` +
		`ABCDEFGHIJ` +
		`KLMNOPQRST` +
		`UVWXYZ,.!?` +
		`abcdefghij` +
		`klmnopqrst` +
		`uvwxyz'"  `

	let sprites = {}
	let i = 0
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			let char = sequence[i++]
			sprites[char] = extract(image, x * width, y * height, width, height)
		}
	}

	return sprites
}

function cursor(image) {
	var frames = image.width / 16
	var animation = new Array(frames)
	for (var i = 0; i < frames; i++) {
		animation[i] = extract(image, i * 16, 0, 16, 16)
	}

	return animation
}
