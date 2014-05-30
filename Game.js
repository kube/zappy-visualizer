
var Block = function(x, y) {

	this.x = x;
	this.y = y;
	this.mesh = null;

}

var Map = function(width, height) {

	var self = this;

	this.width = width | 42;
	this.height = height | 42;
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

	window.onresize = function(){
		engine.resize();
	}

	this.updateMap = function(width, height) {	
		self.map = new Map(width, height);
	
		for (var i in self.map.blocks) {

			var block = self.map.blocks[i];

			var x = block.x - (width / 2);
			var y = block.y - (height / 2);

			var sphere = BABYLON.Mesh.CreateSphere("Sphere", 10, 1, scene);
			
			sphere.position = new BABYLON.Vector3(x, 11, y);
			sphere.setPhysicsState({
				impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 1000
			});


			sphere.onclick = function(e, pick){
				pick.pickedMesh.position.y += 0.5;
			}

			var box = BABYLON.Mesh.CreateBox("Box", 0.94, scene);
			box.position = new BABYLON.Vector3(x, 0, y);
			box.onclick = function(e, pick){
				pick.pickedMesh.position.y += 0.5;
			}
			box.scaling.y = 0.2;



			self.map.blocks[i].mesh = sphere;
		}
	}
	scene.setGravity(new BABYLON.Vector3(0, -10, 0));
	scene.enablePhysics();

	var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
	light.position = new BABYLON.Vector3(20, 40, 20);



	canvas.addEventListener('click', function(e) {
		var pick = scene.pick(e.x, e.y);
		pick.pickedMesh.onclick(e, pick);
	});


	this.run = function() {



		engine.runRenderLoop(function () {


			for (var i in self.map.blocks) {
				// console.log(self.map.blocks[i].mesh.position);
				self.map.blocks[i].mesh.position.y += 0.01;
			}
			scene.render();
		});
	}


}


module.exports = Game;
