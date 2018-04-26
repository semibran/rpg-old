var Game = require("./game")
var allied = require("./allied")

module.exports = function neighborhood(map, unit) {
	var steps = Game.units[unit.class].move
	var weapon = Game.weapons[Game.units[unit.class].weapon]
	var start = { cell: unit.cell, path: [ unit.cell ] }
	var range = {
		move: [ start ],
		attack: []
	}

	var queue = [ start ]
	while (queue.length) {
		var node = queue.shift()
		var neighbors = [
			[ node.cell[0] - 1, node.cell[1] ],
			[ node.cell[0] + 1, node.cell[1] ],
			[ node.cell[0], node.cell[1] - 1 ],
			[ node.cell[0], node.cell[1] + 1 ]
		]

		for (var i = 0; i < neighbors.length; i++) {
			var neighbor = neighbors[i]
			var x = neighbor[0]
			var y = neighbor[1]

			// if neighbor cell contains a wall
			var index = y * map.layout.size[0] + x
			if (map.layout.data[index] === 1) {
				continue
			}

			// check previously added nodes
			for (var j = 0; j < range.move.length; j++) {
				var other = range.move[j]
				if (equals(neighbor, other.cell)) {
					break
				}
			}

			// if neighbor cell has already been visited
			if (j < range.move.length) {
				continue
			}

			// check map units
			for (var j = 0; j < map.units.length; j++) {
				var other = map.units[j]
				if (equals(neighbor, other.cell)) {
					break
				}
			}

			// neighbor cell contains a unit
			if (j < map.units.length) {
				if (!allied(unit, other)) {
					continue
				}
			}

			var path = node.path.slice()
			path.push(neighbor)

			var neighbor = {
				cell: neighbor,
				path: path
			}

			// if neighbor cell is not occupied by another unit
			if (j === map.units.length) {
				range.move.push(neighbor)
			}

			if (path.length - 1 < steps) {
				queue.push(neighbor)
			}
		}
	}

	var offsets = moore(weapon.range)
	for (var i = 0; i < range.move.length; i++) {
		var node = range.move[i]
		for (var j = 0; j < offsets.length; j++) {
			var offset = offsets[j]
			var x = node.cell[0] + offset[0]
			var y = node.cell[1] + offset[1]
			var cell = [ x, y ]

			// if neighbor cell contains a wall
			var index = y * map.layout.size[0] + x
			if (map.layout.data[index] === 1) {
				continue
			}

			if (equals(cell, unit.cell)) {
				continue
			}

			for (var k = 0; k < range.attack.length; k++) {
				var other = range.attack[k]
				if (equals(other.cell, cell)) {
					break
				}
			}

			if (k < range.attack.length) {
				continue
			}

			for (var k = 0; k < map.units.length; k++) {
				var other = map.units[k]
				if (equals(other.cell, cell) && allied(unit, other)) {
					break
				}
			}

			if (k < map.units.length) {
				continue
			}

			range.attack.push({
				cell: cell,
				path: node.path
			})
		}
	}

	range.move.shift() // remove center cell
	return range
}

function moore(max) {
	var start = [ 0, 0 ]
	var cells = []
	var queue = [ start ]
	while (queue.length) {
		var cell = queue.shift()
		var neighbors = [
			[ cell[0] - 1, cell[1] ],
			[ cell[0] + 1, cell[1] ],
			[ cell[0], cell[1] - 1 ],
			[ cell[0], cell[1] + 1 ]
		]

		for (var i = 0; i < neighbors.length; i++) {
			var neighbor = neighbors[i]
			var x = neighbor[0]
			var y = neighbor[1]

			var steps = Math.abs(x - start[0]) + Math.abs(y - start[1])
			if (!steps) {
				continue
			}

			for (var j = 0; j < cells.length; j++) {
				var cell = cells[j]
				if (cell[0] === x && cell[1] === y) {
					break
				}
			}

			if (j < cells.length) {
				continue
			}

			cells.push(neighbor)

			if (steps < max) {
				queue.push(neighbor)
			}
		}
	}

	return cells
}

function equals(a, b) {
	return a[0] === b[0] && a[1] === b[1]
}
