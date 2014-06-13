var Ressource = function(x, y, type, block) {
	var self = this;

	this.quantity = 0;
	this.position = {
		x: block.position.x + Math.cos(type / 7 * Math.PI * 2) / 3,
		y: block.position.y + Math.sin(type / 7 * Math.PI * 2) / 3
	};
	this.mesh = BABYLON.Mesh.CreateCylinder("cylinder", 1, 0.1, 0.1, 6, game.scene, false);
	this.mesh.position = new BABYLON.Vector3(this.position.x, 0, this.position.y);
	this.mesh.scaling.y = 0;
	this.mesh.onclick = function() {
		self.add(1);
	}

	function refresh() {
		self.mesh.scaling.y = self.quantity / 60;
		self.mesh.scaling.x = 0.8 + self.quantity / 10;
		self.mesh.scaling.z = 0.8 + self.quantity / 10;
		self.mesh.position.y = self.quantity / 120;
	}

	this.update = function(quantity) {
		self.quantity = quantity;
		refresh();
	}

	this.add = function(quantity) {
		self.quantity += quantity;
		refresh();
	}

	this.remove = function(quantity) {
		self.quantity -= quantity;
		refresh();
	}
}

module.exports = Ressource;
