var net = require('net');
var gui = require('nw.gui');
Game = require('./Game.js');
global.BABYLON = BABYLON;

process.on('uncaughtException', function(e) {
	console.log(e);

	if (e.code == "ECONNREFUSED") {
		console.log("Cannot reach the server");
		displayConnectionForm();
	}
});

var win = gui.Window.get();
win.title = "Zappy";
win.width = 1300;
win.height = 900;

function displayConnectionForm() {
	$("#loginForm").show();
	$("#renderCanvas").hide();
}

function displayGame() {
	$("#loginForm").hide();
	$("#renderCanvas").show();
}

function destroySession(client, game) {
	client.destroy();
	game.destroy();
	// Remove event from Back button
	displayConnectionForm();
}

function connectToServer(host, port) {

	displayGame();

	var client = new net.Socket();
	var game = new Game();
	global.game = game;

	// Attach event to Back button
	document.getElementById('btn_back').addEventListener('click', function _func() {
		destroySession(client, game);
		document.getElementById('btn_back').removeEventListener('click', _func);
	});

	client.connect(port, host,
		function() {
			client.write('msz\n');
	});

	client.on('close', function() {
		destroySession(client, game);
		game.clear();
		game = null;
	});

	client.on('data', function(data) {
		// Think about splitted sockets!
		// Should split sockets at carriage return and keep the last part to be completed by next socket.
		var responses = data.toString().split('\n');
		for (var i in responses) {
			var args = responses[i].split(' ');

			/*
			**	Responses parsing, will be bettered and put in another file
			*/
			if (args[0] == 'msz') {
				game.createMap(args[1], args[2]);
				game.run();
				client.write('mct\n');
			}
			else if (args[0] == 'bct') {
				for (var i = 3; i < 10; i++)
					game.map.blocks[parseInt(args[1])][parseInt(args[2])].ressources[i - 3].update(parseInt(args[i]));
			}
		}
	});

	client.on('end', function() {
		console.log('Client disconnected');
		destroySession(client, game);
	});
}

function validateConnectionForm() {

	connectToServer(
		document.getElementById('hostField').value,
		document.getElementById('portField').value);
}
