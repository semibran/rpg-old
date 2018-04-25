module.exports = function allied(a, b) {
	return a.faction === b.faction
		|| a.faction === "player" && b.faction === "ally"
		|| a.faction === "ally" && b.faction === "player"
}
