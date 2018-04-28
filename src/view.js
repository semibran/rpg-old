import Game from "../lib/game"
import Canvas from "../lib/canvas"

function View(width, height, sprites) {
	return {
		context: Canvas(width, height),
		sprites: sprites,
		cache: {
			time: 0,
			dest: null,
			dialog: null,
			animation: null
		}
	}
}

function render(view, state) {
	let { context, sprites, cache } = view
	let { map, ranges, cursor } = state

	let order = [ "tiles", "shadows", "pieces", "squares", "arrows", "fg", "actions", "dialogs" ]
	let layers = {}
	for (let name of order) {
		layers[name] = []
	}

	if (cursor.cell) {
		let [ x, y ] = cursor.cell
		let z = 0
		let i = y * map.layout.size[0] + x
		let id = map.layout.data[i]
		let tile = map.tiles[id]
		let frame = Math.floor(cache.time / 30) % sprites.ui.cursor.length

		layers.fg.push({
			image: sprites.ui.cursor[frame],
			position: [ x * 16, y * 16 + 1, z - 1 ]
		})
	}

	for (let y = 0; y < map.layout.size[1]; y++) {
		for (let x = 0; x < map.layout.size[0]; x++) {
			let i = y * map.layout.size[0] + x
			let id = map.layout.data[i]
			let tile = map.tiles[id]
			let sprite = sprites.tiles[tile.name]

			if (!tile.solid) {
				layers.tiles.push({
					image: sprite,
					position: [ x * 16, y * 16 ]
				})
			} else {
				layers.tiles.push({
					image: sprite,
					position: [ x * 16, y * 16 ]
				})
			}
		}
	}

	if (cursor.selection !== null) {
		let unit = map.units[cursor.selection]
		let weapon = Game.weapons[Game.units[unit.class].weapon]

		if (!cache.dialog) {
			let symbol = sprites.pieces.symbols[Game.equipment[unit.class]]

			cache.dialog = sprites.ui.TextBox([
				`  ${ unit.class.toUpperCase() }`,
				``,
				`HP  3/3`,
				`STR ???`,
				`INT ???`,
				`AGI ???`,
				`MOV ${ Game.units[unit.class].move }`
			])

			cache.dialog.getContext("2d")
				.drawImage(symbol, 16, 16)
		}

		let x = unit.cell[0] >= 8
			? 8
			: context.canvas.width - cache.dialog.width - 8

		let y = unit.cell[1] >= 8
			? 8
			: context.canvas.height - cache.dialog.height - 8

		layers.dialogs.push({
			image: cache.dialog,
			position: [ x, y ]
		})

		if (!cache.animation) {
			cache.animation = {
				type: "lift",
				time: 0,
				target: cursor.selection,
				offset: 0
			}
		} else if (cache.animation.type === "lift") {
			if (cache.animation.time < 4) {
				cache.animation.offset = cache.animation.time * 2
			} else {
				cache.animation = {
					type: "float",
					time: 0,
					target: cache.animation.target,
					offset: cache.animation.offset,
					range: 0
				}
			}
		} else if (cache.animation.type === "float") {
			let duration = 60 * 3
			let progress = cache.animation.time % duration / duration
			let offset = Math.sin(2 * Math.PI * progress) * 2
			let height = 8
			cache.animation.offset = height + offset

			let furthest = 0
			let range = ranges[cursor.selection]
			for (let node of range.attack) {
				let [ x, y ] = node.cell
				let valid = true
				for (let other of range.move) {
					if (equals(node.cell, other.cell)) {
						valid = false
						break
					}
				}

				if (!valid) {
					continue
				}

				let steps = manhattan(node.cell, unit.cell)
				if (steps <= cache.animation.time) {
					layers.squares.push({
						image: sprites.ui.squares.attack,
						position: [ x * 16, y * 16, 0 ]
					})
				}
			}

			for (let node of range.move) {
				let [ x, y ] = node.cell
				let steps = manhattan(node.cell, unit.cell)
				if (steps <= cache.animation.time) {
					layers.squares.push({
						image: sprites.ui.squares.move,
						position: [ x * 16, y * 16, 0 ]
					})
				}

				if (steps > furthest) {
					furthest = steps
				}
			}

			cache.animation.range = furthest

			let dest = null
			if (!equals(unit.cell, cursor.cell)) {
				for (let node of range.move) {
					if (equals(cursor.cell, node.cell)) {
						dest = node
						break
					}
				}
			} else {
				dest = {
					cell: unit.cell,
					path: null
				}
			}

			if (dest) {
				cache.dest = dest
			} else {
				dest = cache.dest
			}

			let target = null
			for (let node of range.attack) {
				for (let other of map.units) {
					if (equals(cursor.cell, node.cell) && equals(node.cell, other.cell)) {
						target = other
						break
					}
				}
			}

			if (target) {
				// if target is out of range from given destination
				if (manhattan(dest.cell, target.cell) > weapon.range) {
					if (manhattan(unit.cell, target.cell) <= weapon.range) {
						dest = cache.dest = {
							cell: unit.cell,
							path: null
						}
					} else {
						for (let node of range.move) {
							if (manhattan(node.cell, target.cell) <= weapon.range) {
								dest = node
								cache.dest = dest
								break
							}
						}
					}
				}

				let sprite = sprites.ui.swords
				layers.actions.push({
					image: sprite,
					position: [
						target.cell[0] * 16 + 8 - sprite.width / 2,
						target.cell[1] * 16 + 8 - sprite.height / 2,
						-20 + offset,
					]
				})
			}

			let path = dest.path
			if (path) {
				let [ x, y ] = dest.cell
				let sprite = sprites.pieces[unit.faction][Game.equipment[unit.class]]

				if (cache.animation.time % 2) {
					layers.fg.push({
						image: sprite,
						position: [ x * 16, y * 16 + 2, -2 - height - offset ]
					})

					layers.shadows.push({
						image: sprites.pieces.shadow,
						position: [ x * 16, y * 16 + 4, 0 ]
					})
				}

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
							layers.arrows.push({
								image: sprites.ui.arrows[direction],
								position: [ x * 16, y * 16, 0 ]
							})
						}
					}
				}
			}
		}
	} else {
		cache.dialog = null

		if (cache.animation) {
			let unit = map.units[cache.animation.target]
			if (cache.animation.type === "move") {
				if (cache.animation.time >= cache.dest.path.length * 4 - 4) {
					cache.animation = {
						type: "drop",
						time: 0,
						target: cache.animation.target,
						offset: 8,
						range: 0
					}
				}
			} else if (cache.animation.type !== "drop") {
				cache.animation = {
					type: "drop",
					time: 0,
					target: cache.animation.target,
					offset: cache.animation.offset,
					range: cache.animation.range
				}
			} else {
				cache.animation.offset -= 2
				if (cache.animation.offset < 0) {
					cache.animation = null
				}
			}
		}
	}

	for (let i = 0; i < map.units.length; i++) {
		let unit = map.units[i]
		let x = unit.cell[0] * 16
		let y = unit.cell[1] * 16
		let z = 0
		let sprite = sprites.pieces[unit.faction][Game.equipment[unit.class]]

		if (cache.animation && i === cache.animation.target) {
			if ([ "lift", "float", "drop" ].includes(cache.animation.type)) {
				z = -cache.animation.offset
			} else if (cache.animation.type === "move") {
				let index = Math.floor(cache.animation.time / 4)
				let path = cache.dest.path
				let mod = cache.animation.time % 4 * 0.25
				let cell = path[index]
				let next = path[index + 1]

				x = cell[0] * 16
				y = cell[1] * 16
				z = -8

				if (next) {
					x += (next[0] * 16 - x) * mod
					y += (next[1] * 16 - y) * mod
				}
			}

			layers.fg.push({
				image: sprite,
				position: [ x, y + 2, z - 2 ]
			})
		} else {
			layers.pieces.push({
				image: sprite,
				position: [ x, y, z ]
			})
		}


		if (!cache.animation
			|| cache.animation && cache.animation.target !== i
			|| cache.animation && cache.animation.target === i && cache.animation.time % 2
		) {
			layers.shadows.push({
				image: sprites.pieces.shadow,
				position: [ x + 1, y + 4, 0 ]
			})
		}
	}

	for (let name of order) {
		let layer = layers[name]
		layer.sort((a, b) =>
			(a.position[1] - (a.position[2] || 0)) -
			(b.position[1] - (b.position[2] || 0))
		)

		for (let element of layer) {
			let [ x, y, z ] = element.position
			context.drawImage(element.image, Math.round(x), Math.round(y + (z || 0)))
		}
	}

	cache.time++

	if (cache.animation) {
		cache.animation.time++
	}
}

function manhattan(a, b) {
	return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1])
}

function equals(a, b) {
	return a[0] === b[0] && a[1] === b[1]
}

export default View
View.render = render
