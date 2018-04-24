import loadImage from "img-load"
import disassemble from "./sprites"
import maps from "./maps"
import View from "./view"

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
