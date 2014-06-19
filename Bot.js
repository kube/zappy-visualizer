var Bot = function(game, number, x, y, orientation, level, team) {
	var self = this;

	this.name = number;
	this.x;
	this.y;
	this.orientation = orientation;
	this.level = level;
	this.team = team;

	var block = game.map.blocks[x][y];

	this.position = {
		x: block.position.x,
		y: block.position.y
	};

	this.setPosition = function(x, y, o) {

		console.log(x + ' ' + y + ' ' + o);

		self.x = x;
		self.y = y;
		self.orientation = o;
		block = game.map.blocks[x][y];

		// Mesh position update
		self.mesh.position.set(block.position.x, 0.3, block.position.y);
		self.mesh.updateMatrix();
	}

	function createMesh() {

		self.mesh = new THREE.Mesh(
			new THREE.CylinderGeometry(0, 0.5, 0.5, 4),
			game.materials.basic);

		self.mesh.position.set(self.position.x, 0.3, self.position.y);
		self.mesh.updateMatrix();
		// self.mesh.matrixAutoUpdate = false;

		// self.mesh = BABYLON.Mesh.CreateBox("Box", 0.94, game.scene);
		// self.mesh.position = new BABYLON.Vector3(self.position.x, -0.1, self.position.y);
		// self.mesh.scaling.y = 0.2;
		game.scene.add(self.mesh);

		self.mesh.onclick = function(e, pick) {
			// var pickedMesh = pick.pickedMesh;
			console.log(self);
		}
	}
	createMesh();
}

module.exports = Bot;
