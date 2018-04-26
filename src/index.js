import loadImage from "img-load"
import listen from "key-state"
import neighborhood from "../lib/range"
import disassemble from "./sprites"
import maps from "./maps"
import View from "./view"

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
	document.body.appendChild(view.context.canvas)

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
			if (!cursor.cell) {
				cursor.cell = scale(event.offsetX, event.offsetY)
			}

			if (view.animation) {
				return
			}

			let [ x, y ] = cursor.cell
			for (let i = 0; i < map.units.length; i++) {
				let unit = map.units[i]
				if (unit.cell[0] === x && unit.cell[1] === y) {
					cursor.selection = i
					break
				}
			}
		}
	})

	window.addEventListener("mouseup", event => {
		if (cursor.selection !== null) {
			let unit = map.units[cursor.selection]
			if (cursor.cell[0] === unit.cell[0] && cursor.cell[1] === unit.cell[1]) {
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
				if (node.cell[0] === cursor.cell[0] && node.cell[1] === cursor.cell[1]) {
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
