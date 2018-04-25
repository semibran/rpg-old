import loadImage from "img-load"
import neighborhood from "../lib/range"
import disassemble from "./sprites"
import maps from "./maps"
import View from "./view"

loadImage("sprites.png")
	.then(main)

let state = {
	map: maps.test,
	ranges: [],
	cursor: {
		position: null,
		selection: null
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
		View.render(view, state)
		requestAnimationFrame(loop)
		// setTimeout(loop, 1000 / 15) // debug speed
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

			if (view.animation) {
				return
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
			let unit = map.units[cursor.selection]
			let range = ranges[cursor.selection]
			for (let node of range.move) {
				if (node.cell[0] === cursor.position[0] && node.cell[1] === cursor.position[1]) {
					unit.position = cursor.position

					view.animation = {
						type: "move",
						time: 0,
						data: {
							target: cursor.selection,
							path: node.path
						}
					}

					for (let i = 0; i < map.units.length; i++) {
						let unit = map.units[i]
						ranges[i] = neighborhood(map, unit)
					}

					break
				}
			}

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
