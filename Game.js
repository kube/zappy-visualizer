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
		canvas: canvas
	});
	renderer.setSize(window.innerWidth, window.innerHeight);

	var light = new THREE.PointLight(0xFFFFFF, 100, 100);
	light.position.set(30, -30, 10);
	scene.add(light);


	this.scene = scene;
	this.renderer = renderer;
	this.materials = {

		basic: new THREE.MeshBasicMaterial({
			color: 0x37363f
		}),
		block: new THREE.MeshLambertMaterial({
			color: 0x37363f,
			shading: THREE.FlatShading
		}),

		ressources: [
			new THREE.MeshLambertMaterial({
				color: 0xdacd60,
				shading: THREE.FlatShading
			}),
			new THREE.MeshLambertMaterial({
				color: 0xda428c,
				shading: THREE.FlatShading
			}),
			new THREE.MeshLambertMaterial({
				color: 0x8046db,
				shading: THREE.FlatShading
			}),
			new THREE.MeshLambertMaterial({
				color: 0x40abdb,
				shading: THREE.FlatShading
			}),
			new THREE.MeshLambertMaterial({
				color: 0x47dc37,
				shading: THREE.FlatShading
			}),
			new THREE.MeshLambertMaterial({
				color: 0xdc6a28,
				shading: THREE.FlatShading
			}),
			new THREE.MeshLambertMaterial({
				color: 0xb1dc41,
				shading: THREE.FlatShading
			})
		]
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
