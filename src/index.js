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
