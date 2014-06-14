var Bot = function(game, number, x, y, orientation, level, team) {
	var self = this;

	this.name = number;
	this.x;
	this.y;
	this.orientation = orientation;
	this.level = level;
	this.team = team;

	function createMesh() {
		self.mesh = BABYLON.Mesh.CreateBox("Box", 0.94, game.scene);
		self.mesh.position = new BABYLON.Vector3(self.position.x, -0.1, self.position.y);
		self.mesh.scaling.y = 0.2;

		self.mesh.onclick = function(e, pick) {
			var pickedMesh = pick.pickedMesh;
			console.log(self);
		}
	}
	createMesh();
}

module.exports = Bot;
