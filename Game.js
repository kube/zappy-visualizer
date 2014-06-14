var Map = require('./Map.js');
var Bot = require('./Bot.js');

var Game = function(options) {
	var self = this;
	var window = GLOBAL.window;
	var document = window.document;
	global.game = this;

	var canvas = document.getElementById("renderCanvas");
	// var engine = new BABYLON.Engine(canvas, true);
	// var scene = new BABYLON.Scene(engine);
	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	// var cameras = [];

	this.scene = scene;
	// this.engine = engine;
	this.bots = [];

	var renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		antialiasing: true
	});
	renderer.setSize( window.innerWidth, window.innerHeight );


	var geometry = new THREE.BoxGeometry(1,1,1);
	var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
	var cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	camera.position.z = 5;

	// scene.clearColor = new BABYLON.Color3(0, 0, 0);
	// cameras.push(new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene));
	// cameras.push(new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 1, -15), scene));
	// scene.activeCamera.attachControl(canvas);
	// scene.fogMode = BABYLON.Scene.FOGMODE_EXP;

	// var light = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(1, 10, 1), scene);
	// light.position = new BABYLON.Vector3(20, 40, 20);

	// canvas.addEventListener('click', function(e) {
	// 	var pick = scene.pick(e.x, e.y);
	// 	if (pick.pickedMesh && typeof pick.pickedMesh.onclick == 'function')
	// 		pick.pickedMesh.onclick(e, pick);
	// });

	// document.addEventListener('keydown', function(e) {
	// 	if (e.keyCode == 32) {
	// 		// scene.activeCamera = cameras[(cameras.indexOf(scene.activeCamera) + 1) % cameras.length];
	// 		// scene.activeCamera.attachControl(canvas);
	// 	}
	// });


	var render = function () {

		// requestAnimationFrame(this);

		cube.rotation.x += 0.02;
		cube.rotation.y += 0.02;

		renderer.render(scene, camera);
	};

	window.onresize = function() {
		engine.resize();
	}

	this.createMap = function(width, height) {
		self.map = new Map(self, width, height);
	}

	this.createBot = function(number, x, y, orientation, level, team) {
		var bot = new Bot(self, number, x, y, orientation, level, team);
		this.bots[number] = bot;
		return bot;
	}

	this.run = function() {

		// render();

		setInterval(render, 13);

		// engine.runRenderLoop(function () {
		// 	scene.render();
		// });
	}

	this.clear = function() {
		// engine.stopRenderLoop();
		// engine.clear(new BABYLON.Color3(0, 0, 0), true, true);
	}

	this.destroy = function() {
		// scene.dispose();
		// engine.clear(new BABYLON.Color3(0, 0, 0), true, true);
	}
}

module.exports = Game;
