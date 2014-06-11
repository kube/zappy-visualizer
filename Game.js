var Block = function(x, y) {
	this.x = x;
	this.y = y;
	this.mesh = null;
}

var Ressource = function() {

}

var Bot = function(number, x, y, orientation, level, team) {
	this.name = number;
	this.x;
	this.y;
	this.orientation = orientation;
	this.level = level;
	this.team = team;
}

var Map = function(width, height) {
	var self = this;

	if (height <= 0 || width <= 0)
		throw new Error("Invalid Map size");

	this.width = width;
	this.height = height;
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

var Game = function(BABYLON, window, document, options) {
	var self = this;

	var canvas = document.getElementById("renderCanvas");
	var engine = new BABYLON.Engine(canvas, true);
	var scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3(0, 0, 0);

	this.bots = [];

	var cameras = []
	cameras.push(new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene));
	cameras.push(new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 1, -15), scene));
	scene.activeCamera.attachControl(canvas);

	document.addEventListener('keydown', function(e){
		console.log(e);
		if (e.keyCode == 32) {

			scene.activeCamera = cameras[(cameras.indexOf(scene.activeCamera) + 1) % cameras.length];
			scene.activeCamera.attachControl(canvas);
		}
	});

	this.clear = function() {
		engine.stopRenderLoop();
	}

	window.onresize = function(){
		engine.resize();
	}

	this.getScene = function() {return scene;}
	this.getEngine = function() {return engine;}

	this.updateMap = function(width, height) {
		self.map = new Map(width, height);

		for (var i in self.map.blocks) {

			var block = self.map.blocks[i];

			var x = block.x - (width / 2);
			var y = block.y - (height / 2);

			var box = BABYLON.Mesh.CreateBox("Box", 0.94, scene);
			box.position = new BABYLON.Vector3(x, 0, y);
			box.onclick = function(e, pick){
				pick.pickedMesh.position.y += 0.5;
			}
			box.scaling.y = 0.2;
			self.map.blocks[i].mesh = box;
		}

		for (var i in self.map.bots) {

			var x = self.map.bots[i].x - (width / 2);
			var y = self.map.bots[i].y - (height / 2);

			var sphere = BABYLON.Mesh.CreateSphere("Sphere", 10, 1, scene);

			sphere.position = new BABYLON.Vector3(x, 11, y);
			sphere.setPhysicsState({
				impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 1000
			});
			sphere.onclick = function(e, pick){
				pick.pickedMesh.position.y += 0.5;
			}
		}
	}
	scene.setGravity(new BABYLON.Vector3(0, -10, 0));
	scene.enablePhysics();

	var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
	light.position = new BABYLON.Vector3(20, 40, 20);

	canvas.addEventListener('click', function(e) {
		var pick = scene.pick(e.x, e.y);
		if (pick.pickedMesh && typeof pick.pickedMesh.onclick == 'function')
			pick.pickedMesh.onclick(e, pick);
	});

	this.createBot = function(number, x, y, orientation, level, team) {
		var bot = new Bot(number, x, y, orientation, level, team);
		this.bots[number] = bot;
		return bot;
	}

	this.run = function() {
		engine.runRenderLoop(function () {
			scene.render();
		});
	}

	this.destroy = function() {
		engine.clear(new BABYLON.Color3(0, 0, 0), true, true);
	}

}

module.exports = Game;
