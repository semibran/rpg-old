import loadImage from "img-load"
import listen from "key-state"
import neighborhood from "../lib/range"
import disassemble from "./sprites"
import maps from "./maps"
import View from "./view"

let root = document.querySelector("main")

loadImage("sprites.png")
	.then(main)

let state = {
	map: maps.test,
	paused: false,
	ranges: [],
	cursor: {
		cell: null,
		selection: null,
		released: false
	},
	keys: {
		prev: {},
		held: listen(window, {
			pause: [ "KeyP" ]
		})
	}
}

function main(spritesheet) {
	let { map, ranges, cursor } = state
	let sprites = disassemble(spritesheet)
	let view = View(map.layout.size[0] * 16, map.layout.size[1] * 16, sprites)
	root.appendChild(view.context.canvas)

	for (let i = 0; i < map.units.length; i++) {
		let unit = map.units[i]
		ranges[i] = neighborhood(map, unit)
	}

	View.render(view, state)
	requestAnimationFrame(loop)

	function Text(content) {
		let canvas = document.createElement("canvas")
		canvas.width = content.length * 8
		canvas.height = 8

		let context = canvas.getContext("2d")
		for (let i = 0; i < content.length; i++) {
			let char = content[i]
			let sprite = sprites.ui.typeface[char]
			context.drawImage(sprite, i * 8, 0)
		}

		return canvas
	}

	function Box(width, height) {
		const cols = Math.ceil(width / 16)
		const rows = Math.ceil(height / 16)

		let canvas = document.createElement("canvas")
		let context = canvas.getContext("2d")
		canvas.width = width
		canvas.height = height

		for (let x = 1; x < cols - 1; x++) {
			context.drawImage(sprites.ui.box.top,    x * 16,           0)
			context.drawImage(sprites.ui.box.bottom, x * 16, height - 16)
		}

		for (let y = 1; y < rows - 1; y++) {
			context.drawImage(sprites.ui.box.left,           0, y * 16)
			context.drawImage(sprites.ui.box.right, width - 16, y * 16)
		}

		context.drawImage(sprites.ui.box.topLeft,                     0,                  0)
		context.drawImage(sprites.ui.box.topRight,    canvas.width - 16,                  0)
		context.drawImage(sprites.ui.box.bottomLeft,                  0, canvas.height - 16)
		context.drawImage(sprites.ui.box.bottomRight, canvas.width - 16, canvas.height - 16)

		return canvas
	}

	function TextBox(lines) {
		const lengths = lines.map(line => line.length)
		const longest = Math.max(...lengths)
		const width   = longest * 8
		const height  = (lines.length * 2 - 1) * 8

		let box = Box(width + 32, height + 32)
		let canvas = document.createElement("canvas")
		let context = canvas.getContext("2d")
		canvas.width = width
		canvas.height = height

		for (let y = 0; y < lines.length; y++) {
			let line = lines[y]
			context.drawImage(Text(line), 0, y * 16)
		}

		box.getContext("2d")
			.drawImage(canvas, 16, 16)

		return box
	}

	let box = TextBox([
		`MAGE's attack`,
		`WARRIOR suffered 2 damage.`,
		`WARRIOR was defeated.`
	])

	root.appendChild(box)

	function loop() {
		let keys = state.keys
		if (keys.held.pause && !keys.prev.pause) {
			state.paused = !state.paused
		}

		if (!state.paused) {
			View.render(view, state)
		}

		requestAnimationFrame(loop)
		// setTimeout(loop, 1000 / 15) // debug speed

		Object.assign(keys.prev, keys.held)
	}

	window.addEventListener("mousemove", event => {
		let canvas = view.context.canvas
		if (event.target === canvas) {
			cursor.cell = scale(event.offsetX, event.offsetY)
		}
	})

	window.addEventListener("mousedown", event => {
		let canvas = view.context.canvas
		if (event.target === canvas) {
			// define cursor cell if not already existent
			if (!cursor.cell) {
				cursor.cell = scale(event.offsetX, event.offsetY)
			}

			// ignore click if a piece is already selected
			if (cursor.selection !== null || view.animation) {
				return
			}

			let [ x, y ] = cursor.cell
			for (let i = 0; i < map.units.length; i++) {
				let unit = map.units[i]
				if (equals(unit.cell, cursor.cell)) {
					cursor.selection = i
					break
				}
			}

			/*
			if (cursor.selection !== null) {
				view.animations.piece.push([
					Animation("lift")
				])
			}*/
		}
	})

	window.addEventListener("mouseup", event => {
		if (cursor.selection !== null) {
			let unit = map.units[cursor.selection]
			if (equals(cursor.cell, unit.cell)) {
				if (!cursor.released) {
					cursor.released = true
					return
				} else {
					cursor.released = false
					cursor.selection = null
					return
				}
			}

			let range = ranges[cursor.selection]
			for (let node of range.move) {
				if (equals(cursor.cell, node.cell)) {
					unit.cell = cursor.cell
					view.cache.animation = {
						type: "move",
						time: 0,
						target: cursor.selection,
						path: node.path
					}

					for (let i = 0; i < map.units.length; i++) {
						let unit = map.units[i]
						ranges[i] = neighborhood(map, unit)
					}

					break
				}
			}

			cursor.released = false
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

function equals(a, b) {
	return a[0] === b[0] && a[1] === b[1]
}
