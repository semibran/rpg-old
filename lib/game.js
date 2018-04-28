module.exports = {
	units: {
		thief: {
			str: 1,
			int: 0,
			agi: 1,
			move: 5,
			weapon: "knife",
			armor: null
		},
		knight: {
			str: 1,
			int: 0,
			agi: 0,
			move: 3,
			weapon: "lance",
			armor: "shield"
		},
		warrior: {
			str: 2,
			int: 0,
			agi: 0,
			move: 4,
			weapon: "axe",
			armor: null
		},
		mage: {
			str: 0,
			int: 2,
			agi: 0,
			move: 4,
			weapon: "tome",
			armor: null
		}
	},
	weapons: {
		knife: {
			type: "str",
			mt: 1,
			range: 1
		},
		lance: {
			type: "str",
			mt: 2,
			range: 1
		},
		axe: {
			type: "str",
			mt: 1,
			hit: -1,
			range: 1,
			pierce: true
		},
		tome: {
			type: "int",
			mt: 3,
			range: 2
		}
	},
	armors: {
		shield: {
			def: +2,
			movee: -1
		}
	},
	equipment: {
		soldier: "sword",
		lancer:  "lance",
		warrior: "axe",
		archer:  "bow",
		thief:   "dagger",
		knight:  "shield",
		mage:    "hat"
	}
}
