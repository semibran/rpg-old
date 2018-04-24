import Game from "./constants"
import range from "./range"
import equipment from "./equipment.json"

function View(width, height, sprites) {
	let canvas = document.createElement("canvas")
	canvas.width = width
	canvas.height = height

	return {
		context: canvas.getContext("2d"),
		sprites: sprites,
		animation: null,
		nodes: null
	}
}

function render(view, state) {
	let { context, sprites, animation, nodes } = view
	let { map, cursor } = state

	let floors = []
	let walls = []
	for (let y = 0; y < map.layout.size[1]; y++) {
		for (let x = 0; x < map.layout.size[0]; x++) {
			let i = y * map.layout.size[0] + x
			let id = map.layout.data[i]
			let tile = map.tiles[id]
			if (!tile.solid) {
				floors.push({ id, cell: [ x, y ] })
			} else {
				walls.push({ id, cell: [ x, y ] })
			}
		}
	}

	for (let floor of floors) {
		let tile = map.tiles[floor.id]
		let [ x, y ] = floor.cell
		context.drawImage(sprites[tile.name], x * 16, y * 16)
	}

	if (animation) {
		animation.time++
	}

	if (cursor.selection !== null) {
		let unit = map.units[cursor.selection]

		if (!animation) {
			animation = view.animation = {
				type: "lift",
				time: 0,
				data: {
					target: cursor.selection,
					offset: 0
				}
			}
		} else if (animation.type === "lift") {
			if (animation.time < 8) {
				animation.data.offset = animation.time
			} else {
				animation = view.animation = {
					type: "float",
					time: 0,
					data: {
						target: cursor.selection,
						offset: 0,
						range: 0
					}
				}

				if (!nodes) {
					nodes = view.nodes = range(map, unit)
				}
			}
		} else if (animation.type === "float") {
			let furthest = 0
			for (let node of nodes) {
				let [ x, y ] = node.cell
				let steps = Math.abs(x - unit.position[0]) + Math.abs(y - unit.position[1])
				if (steps <= animation.time) {
					context.drawImage(sprites.squares.move, x * 16, y * 16)
				}

				if (steps > furthest) {
					furthest = steps
				}
			}

			animation.data.range = furthest

			let path = null
			for (let node of nodes) {
				if (node.cell[0] === cursor.position[0] && node.cell[1] === cursor.position[1]) {
					path = node.path
					break
				}
			}

			if (path) {
				for (let i = 0; i < path.length; i++) {
					let [ x, y ] = path[i]
					let l = false
					let r = false
					let u = false
					let d = false

					let prev = path[i - 1]
					if (prev) {
						let dx = x - prev[0]
						let dy = y - prev[1]
						if (dx === 1) {
							l = true
						} else if (dx === -1) {
							r = true
						}

						if (dy === 1) {
							u = true
						} else if (dy === -1) {
							d = true
						}
					}

					let next = path[i + 1]
					if (next) {
						let dx = next[0] - x
						let dy = next[1] - y
						if (dx === -1) {
							l = true
						} else if (dx === 1) {
							r = true
						}

						if (dy === -1) {
							u = true
						} else if (dy === 1) {
							d = true
						}
					}

					if (l || r || u || d) {
						let direction = null
						if (l && r) {
							direction = "horiz"
						} else if (u && d) {
							direction = "vert"
						} else if (u && l) {
							direction = "upLeft"
						} else if (u && r) {
							direction = "upRight"
						} else if (d && l) {
							direction = "downLeft"
						} else if (d && r) {
							direction = "downRight"
						} else if (l && !i) {
							direction = "leftStub"
						} else if (r && !i) {
							direction = "rightStub"
						} else if (u && !i) {
							direction = "upStub"
						} else if (d && !i) {
							direction = "downStub"
						} else if (l) {
							direction = "left"
						} else if (r) {
							direction = "right"
						} else if (u) {
							direction = "up"
						} else if (d) {
							direction = "down"
						}

						if (direction) {
							context.drawImage(sprites.arrows[direction], x * 16, y * 16)
						}
					}
				}
			}

			let duration = 60 * 3
			let progress = animation.time % duration / duration
			animation.data.offset = 8 + Math.sin(2 * Math.PI * progress) * 2
		}
	} else {
		if (animation) {
			let unit = map.units[animation.data.target]
			if (animation.type !== "drop") {
				animation = view.animation = {
					type: "drop",
					time: 0,
					data: {
						target: animation.data.target,
						offset: animation.data.offset,
						range: animation.data.range
					}
				}
			} else {
				if (nodes) {
					for (let node of nodes) {
						let [ x, y ] = node.cell
						let steps = Math.abs(x - unit.position[0]) + Math.abs(y - unit.position[1])
						if (steps <= animation.data.range - animation.time) {
							context.drawImage(sprites.squares.move, x * 16, y * 16)
						}
					}
				}

				if (--animation.data.offset < 0) {
					animation.data.offset = 0
					view.animation = null
					nodes = view.nodes = null
				}
			}
		}
	}

	for (let wall of walls) {
		let [ x, y ] = wall.cell
		context.drawImage(sprites.wall, x * 16, y * 16 - 8)
	}

	for (let i = 0; i < map.units.length; i++) {
		let unit = map.units[i]
		let x = unit.position[0] * 16
		let y = unit.position[1] * 16
		let oy = y
		let sprite = sprites.pieces[unit.faction][equipment[unit.class]]

		if (animation && i === animation.data.target) {
			oy -= animation.data.offset
		}

		if (!animation
		|| animation && animation.data.target !== i
		|| animation && animation.data.target === i && animation.time % 2
		) {
			context.drawImage(sprites.shadow, Math.round(x), Math.round(y + 2))
		}

		context.drawImage(sprite, Math.round(x), Math.round(oy - 2))
	}
}

export default View
View.render = render