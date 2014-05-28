
var Block = function(x, y) {

	this.x = x;
	this.y = y;

}

var Map = function(width, height) {

	var self = this;

	this.blocks = [];

	function initBlocks(){

		var i = 0;
		while (i < width) {
			var j = 0;
			while (j < height) {

				self.blocks.push(new Block(i, j));

				j++;
			}
			i++;
		}
	}

	initBlocks();

}


var Game = function(options) {

	this.width = options.width | 42;
	this.height = options.width | 42;

	this.map = new Map(this.width, this.height);

}


module.exports = Game;
