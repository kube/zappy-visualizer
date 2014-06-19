var Ressource = function(block, x, y, type) {
	var self = this;
	var game = block.map.game;

	this.quantity = 0;
	this.position = {
		x: block.position.x + Math.cos(type / 7 * Math.PI * 2) / 3,
		y: block.position.y + Math.sin(type / 7 * Math.PI * 2) / 3
	};

	this.mesh = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.0, 0.05), game.materials.ressources[type]);
	this.mesh.position.set(this.position.x, -0.1, this.position.y);
	this.mesh.updateMatrix();
	this.mesh.matrixAutoUpdate = false;
	this.mesh.onclick = function(e, pick) {
		// if (e.metaKey)
		// 	self.remove(1);
		// else
		// 	self.add(1);
	}
	game.scene.add(this.mesh);


	function refresh() {
		self.mesh.scale.y = self.quantity / 5;
		// self.mesh.scale.x = 0.8 + self.quantity / 10;
		// self.mesh.scale.z = 0.8 + self.quantity / 10;
		self.mesh.position.y = self.quantity / 10;
		self.mesh.updateMatrix();

		if (self.quantity > 0)
			self.mesh.visible = true;
		else
			self.mesh.visible = false;
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
