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

	function createMesh() {
		self.mesh = BABYLON.Mesh.CreateBox("Box", 0.94, game.scene);
		self.mesh.position = new BABYLON.Vector3(self.position.x, -0.1, self.position.y);
		self.mesh.scaling.y = 0.2;

		self.mesh.onclick = function(e, pick) {
			// pick.pickedMesh.position.y += 0.5;
			console.log(self);
		}
	}
	createMesh();
}

module.exports = Block;
