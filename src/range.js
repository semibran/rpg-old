var Game = require("./constants")

module.exports = function range(map, unit) {
	var steps = Game.units[unit.class].move
	var start = { cell: unit.position, path: [ unit.position ] }
	var nodes = []
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

			var index = y * map.layout.size[0] + x
			if (map.layout.data[index] === 1) {
				continue // neighbor cell contains a wall
			}

			for (var j = 0; j < nodes.length; j++) {
				var other = nodes[j]
				if (equals(neighbor, other.cell)) {
					break
				}
			}

			if (j < nodes.length) {
				continue // neighbor cell has already been visited
			}

			for (var j = 0; j < map.units.length; j++) {
				var unit = map.units[j]
				if (equals(neighbor, unit.position)) {
					break
				}
			}

			if (j < map.units.length) {
				continue // neighbor cell contains a unit
			}

			var path = node.path.slice()
			path.push(neighbor)

			var neighbor = {
				cell: neighbor,
				path: path
			}

			nodes.push(neighbor)

			if (path.length - 1 < steps) {
				queue.push(neighbor)
			}
		}
	}

	return nodes
}

function equals(a, b) {
	return a[0] === b[0] && a[1] === b[1]
}
