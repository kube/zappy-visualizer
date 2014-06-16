var Block = require('./Block.js');

var Map = function(game, width, height) {
	var self = this;

	if (height <= 0 || width <= 0)
		throw new Error("Invalid Map size");

	this.width = width;
	this.height = height;
	this.blocks = [];
	this.game = game;

	function initBlocks() {
		for (var i = 0; i < width; i++) {
			self.blocks[i] = [];
			for (var j = 0; j < height; j++)
				self.blocks[i][j] = new Block(self, i, j);
		}
	}
	initBlocks();

	this.displayRessource = function(type) {
		for (var i in self.blocks)
			for (var j in self.blocks[i])
				self.blocks[i][j].displayRessource(type);
	}
}

module.exports = Map;
