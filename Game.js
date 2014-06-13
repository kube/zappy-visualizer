var	BABYLON,
	scene,
	engine;


var Ressource = function(x, y, type, block) {
	var self = this;

	this.quantity = 0;
	this.position = {
		x: block.position.x + Math.cos(type / 7 * Math.PI * 2) / 3,
		y: block.position.y + Math.sin(type / 7 * Math.PI * 2) / 3
	};

	this.mesh = BABYLON.Mesh.CreateCylinder("cylinder", 1, 0.1, 0.1, 5, scene, false);
	this.mesh.position = new BABYLON.Vector3(this.position.x, 0, this.position.y);
	this.mesh.scaling.y = this.quantity / 30;

	this.update = function(quantity) {
		console.log('Updating ressource quantity');
		self.quantity = quantity;
		self.mesh.scaling.y = self.quantity / 30;
		self.mesh.position.y = self.quantity / 60;
	}
}

var Block = function(x, y, map) {
	var self = this;

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
		this.ressources[i] = new Ressource(x, y, i, this);

	function createMesh() {
		self.mesh = BABYLON.Mesh.CreateBox("Box", 0.94, scene);
		self.mesh.position = new BABYLON.Vector3(self.position.x, 0, self.position.y);
		self.mesh.scaling.y = 0.2;

		self.mesh.onclick = function(e, pick) {
			// pick.pickedMesh.position.y += 0.5;
			console.log(self);
		}
	}
	createMesh();
}

var Bot = function(number, x, y, orientation, level, team) {
	this.name = number;
	this.x;
	this.y;
	this.orientation = orientation;
	this.level = level;
	this.team = team;
}

var Map = function(width, height, game) {
	var self = this;

	if (height <= 0 || width <= 0)
		throw new Error("Invalid Map size");

	this.width = width;
	this.height = height;
	this.game = game;
	this.blocks = [];

	function initBlocks(){
		for (var i = 0; i < width; i++) {
			self.blocks[i] = [];
			for (var j = 0; j < height; j++) {
				self.blocks[i][j] = new Block(i, j, self);
			}
		}
	}
	initBlocks();
}

var Game = function(_BABYLON, window, document, options) {
	var self = this;

	BABYLON = _BABYLON;
	var canvas = document.getElementById("renderCanvas");
	engine = new BABYLON.Engine(canvas, true);
	scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3(0, 0, 0);

	this.bots = [];

	var cameras = []
	cameras.push(new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene));
	cameras.push(new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 1, -15), scene));
	scene.activeCamera.attachControl(canvas);

	document.addEventListener('keydown', function(e) {
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

	this.createMap = function(width, height) {
		self.map = new Map(width, height, self);

		// for (var i in self.map.bots) {

		// 	var x = self.map.bots[i].x - (width / 2);
		// 	var y = self.map.bots[i].y - (height / 2);

		// 	var sphere = BABYLON.Mesh.CreateSphere("Sphere", 10, 1, scene);

		// 	sphere.position = new BABYLON.Vector3(x, 11, y);
		// 	sphere.setPhysicsState({
		// 		impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 1000
		// 	});
		// 	sphere.onclick = function(e, pick){
		// 		pick.pickedMesh.position.y += 0.5;
		// 	}
		// }
	}


	// var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
	var light = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(1, 10, 1), scene);
	light.position = new BABYLON.Vector3(20, 40, 20);

	// this.createBot = function(number, x, y, orientation, level, team) {
	// 	var bot = new Bot(number, x, y, orientation, level, team);
	// 	this.bots[number] = bot;
	// 	return bot;
	// }




	canvas.addEventListener('click', function(e) {
		var pick = scene.pick(e.x, e.y);
		if (pick.pickedMesh && typeof pick.pickedMesh.onclick == 'function')
			pick.pickedMesh.onclick(e, pick);
	});


	this.run = function() {
		engine.runRenderLoop(function () {
			scene.render();
		});
	}

	this.destroy = function() {
		scene.dispose();
		engine.clear(new BABYLON.Color3(0, 0, 0), true, true);
	}

}

module.exports = Game;
