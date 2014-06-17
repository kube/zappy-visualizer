var	net = require('net'),
	gui = require('nw.gui'),
	Game = require('./Game.js');

global.THREE = THREE;

process.on('uncaughtException', function(e) {
	console.log(e);
	console.log(e.message);

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

	// Attach event to Back button
	document.getElementById('btnBack').addEventListener('click', function _func() {
		destroySession(client, game);
		document.getElementById('btnBack').removeEventListener('click', _func);
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
		console.log(responses);

		for (var i in responses) {
			var args = responses[i].split(' ');
			args.int = function(i) {
				return parseInt(this[i]);
			}

			/*
			**	Responses parsing, will be bettered and put in another file
			*/
			switch (args[0]) {

				case 'msz':
					game.createMap(args.int(1), args.int(2));
					game.run();
					client.write('mct\n');
					break;

				case 'bct':
					for (var i = 3; i < 10; i++)
						game.map.blocks[args.int(1)][args.int(2)].ressources[i - 3].update(args.int(i));
					break;

				//pnw #n X Y O L N
				case 'pnw':
					game.createBot(args.int(1), args.int(2), args.int(3), args.int(3), args.int(4), args[5]);
					break;

				//ppo #n X Y O
				case 'ppo':
					console.log(game.bots);
					game.bots[args.int(1)].setPosition(args.int(2), args.int(3), args.int(4));
					break;

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
