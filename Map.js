var Block = require('./Block.js');

var Map = function(width, height) {
	var self = this;

	if (height <= 0 || width <= 0)
		throw new Error("Invalid Map size");

	this.width = width;
	this.height = height;
	this.blocks = [];

	function initBlocks() {
		for (var i = 0; i < width; i++) {
			self.blocks[i] = [];
			for (var j = 0; j < height; j++)
				self.blocks[i][j] = new Block(i, j, self);
		}
	}
	initBlocks();
}

module.exports = Map;
