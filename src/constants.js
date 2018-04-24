module.exports = {
	units: {
		thief: {
			move: 5,
			range: 1
		},
		knight: {
			move: 3,
			range: 1
		},
		warrior: {
			move: 4,
			range: 1
		},
		mage: {
			move: 4,
			range: 2
		}
	}
}

// thief
// > thief:   1
// > knight:  0
// > warrior: 1
// > mage:    2

// knight
// > knight:  1
// > warrior: 1
// > thief:   2
// > mage:    2

// warrior
// > warrior: 2
// > mage:    2
// > knight:  2
// > thief:   0

// mage
// > mage:    1
// > thief:   1
// > knight:  2
// > warrior: 2
