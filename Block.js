var Ressource = require('./Ressource.js');

var Block = function(map, x, y) {
	var self = this;
	var game = map.game;

	this.x = x;
	this.y = y;
	this.map = map;
	this.mesh = null;
	this.position = {
		x: self.x - map.width / 2,
		y: self.y - map.height / 2
	};

	this.ressources = [];
	for (var i = 0; i < 7; i++)
		this.ressources[i] = new Ressource(this, x, y, i);

	this.mesh = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.2, 0.9), game.materials.block);
	this.mesh.position.set(this.position.x, -0.1, this.position.y);
	this.mesh.onclick = function(e, pick) {
		// self.mesh.position.y += 0.5;
	}
	game.scene.add(this.mesh);
}

module.exports = Block;
