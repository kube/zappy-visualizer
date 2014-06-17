var Map = require('./Map.js');
var Bot = require('./Bot.js');

var Game = function(options) {
	var self = this;
	var window = GLOBAL.window;
	var document = window.document;
	global.game = this;

	var canvas = document.getElementById("renderCanvas");
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 5;
	var controls = new THREE.OrbitControls(camera);
	var renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);

	var ambientLight = new THREE.AmbientLight(0x111111);
	var directionalLight = new THREE.DirectionalLight(0x666666);
	directionalLight.position.set(1, 10, 1).normalize();
	scene.add(ambientLight);
	scene.add(directionalLight);

	this.scene = scene;
	this.renderer = renderer;
	this.materials = {

		basic: new THREE.MeshBasicMaterial({
			color: 0x37363f
		}),
		block: new THREE.MeshPhongMaterial({
			color: 0x04020a
		}),

		ressources: [
			new THREE.MeshBasicMaterial({
				color: 0xdacd60
			}),
			new THREE.MeshBasicMaterial({
				color: 0xda428c
			}),
			new THREE.MeshBasicMaterial({
				color: 0x8046db
			}),
			new THREE.MeshBasicMaterial({
				color: 0x40abdb
			}),
			new THREE.MeshBasicMaterial({
				color: 0x47dc37
			}),
			new THREE.MeshBasicMaterial({
				color: 0xdc6a28
			}),
			new THREE.MeshBasicMaterial({
				color: 0xb1dc41
			})]
	};


	this.bots = [];


	pickMesh = function(x, y) {
		var projector = new THREE.Projector();
		var vector = new THREE.Vector3(( x / window.innerWidth ) * 2 - 1, -( y / window.innerHeight ) * 2 + 1, 0.5);
		projector.unprojectVector(vector, camera);
		var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
		var intersects = raycaster.intersectObjects(scene.children);
		return intersects[0];
	}

	canvas.addEventListener('click', function(e) {
		var pick = pickMesh(e.x, e.y);
		if (pick.object && typeof pick.object.onclick == 'function')
			pick.object.onclick(e);
	});


	var currentDisplayedRessource = -1;

	window.addEventListener('keydown', function(e) {

		currentDisplayedRessource = (currentDisplayedRessource + 2) % 8 - 1;
		self.map.displayRessource(currentDisplayedRessource);
	});

	function runRenderLoop() {
		window.requestAnimationFrame(runRenderLoop);
		renderer.render(scene, camera);
	};

	window.onresize = function() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
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
		runRenderLoop();
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
