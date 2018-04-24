import loadImage from "img-load"
import disassemble from "./sprites"
import maps from "./maps"
import View from "./view"
import pixels from "../lib/pixels"
import extract from "../lib/img-extract"
import Canvas from "../lib/canvas"

loadImage("sprites.png")
	.then(main)

let state = {
	map: maps.test,
	cursor: {
		position: null,
		selection: null
	}
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
	console.log(sprites)

	let palette = (_ => {
		let piece = Canvas(sprites.piece.width, sprites.piece.height)
		piece.drawImage(sprites.piece, 0, 0)
		piece.getImageData(0, 18, 3, 3)
	})()

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
			pixels.replace(base, colors.darkBlue, palette[2])
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
