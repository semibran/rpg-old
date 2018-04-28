module.exports = {
	tiles: [
		{ name: "floor",           solid: false },
		{ name: "water",           solid: true  },
		{ name: "wall",            solid: true  },
		{ name: "stairs",          solid: false },
		{ name: "wall-base",       solid: true  },
		{ name: "wall-reflection", solid: true  },
		{ name: "bridge-left",     solid: false },
		{ name: "bridge-right",    solid: false },
		{ name: "grass",           solid: false },
		{ name: "grass-edge",      solid: false },
		{ name: "grass-hang",      solid: true  },
		{ name: "grass-rock",      solid: false },
	],
	layout: {
		size: [ 16, 16 ],
		data: [
			 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
			 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
			 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
			 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
			 0,  0,  0,  3,  3,  0,  0,  0,  0,  0,  0,  3,  3,  0,  0,  0,
			 2,  2,  2,  3,  3,  2,  2,  2,  2,  2,  2,  3,  3,  2,  2,  2,
			 2,  2,  2,  3,  3,  2,  2,  2,  2,  2,  2,  3,  3,  2,  2,  2,
			 4,  4,  4,  3,  3,  4,  4,  4,  4,  4,  4,  3,  3,  4,  4,  4,
			 5,  5,  5,  6,  7,  5,  5,  5,  5,  5,  5,  6,  7,  5,  5,  5,
			10, 10, 10,  6,  7, 10, 10, 10, 10, 10, 10,  6,  7, 10, 10, 10,
			 9,  9,  9,  6,  7,  9,  9,  9,  9,  9,  9,  6,  7,  9,  9,  9,
			 8,  8,  8,  9,  9,  8,  8,  8,  8,  8,  8,  9,  9,  8, 11,  8,
			 8, 11,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,
			 8,  8,  8,  8,  8,  8,  8, 11,  8,  8,  8,  8,  8,  8,  8,  8,
			 8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,
			 8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,
		]
	},
	units: [
		{ class: "knight",  faction: "enemy",  cell: [  3,  3 ] },
		{ class: "knight",  faction: "enemy",  cell: [  4,  3 ] },
		{ class: "knight",  faction: "enemy",  cell: [ 11,  3 ] },
		{ class: "knight",  faction: "enemy",  cell: [ 12,  3 ] },
		{ class: "mage",    faction: "enemy",  cell: [  5,  1 ] },
		{ class: "mage",    faction: "enemy",  cell: [ 10,  1 ] },
		{ class: "warrior", faction: "player", cell: [  6, 11 ] },
		{ class: "thief",   faction: "player", cell: [ 11, 12 ] },
		{ class: "mage",    faction: "ally",   cell: [  8, 13 ] }
	]
}
