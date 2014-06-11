net = require('net');
var gui = require('nw.gui');
Game = require('./Game.js');


process.on('uncaughtException', function(e) {
	console.log(e);

	if (e.code == "ECONNREFUSED") {
		console.log("Cannot reach the server");
		displayConnectionForm();
	}
});



var win = gui.Window.get();
win.title = "Zappy";
win.width = 900;
win.height = 600;



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

	console.log('Trying to connect to ' + host + ':' + port);
	displayGame();

	// Catch connection error (later)
	try {
		var client = new net.Socket();
		var game = new Game(BABYLON, window, document);

		// Attach event to Back button
		document.getElementById('btn_back').addEventListener('click', function _func() {
			console.log('OK');
			destroySession(client, game);
			document.getElementById('btn_back').removeEventListener('click', _func);
		});

		client.connect(port, host,
			function() {
				client.write('msz\n');
				client.write('sgt\n');
		});

		client.on('close', function() {
			console.log(game);

			// Destroy Game instance
			// Destroy current Babylon instance!
			// Clean Canvas
			console.log(game.getScene());
			console.log(game.getEngine());
			displayConnectionForm();
			game.clear();
			game = null;

		});

		client.on('data', function(data) {
			console.log(data.toString());

			// Think about splitted sockets!
			// Should split sockets at carriage return and keep the last part to be completed by next socket.
			var responses = data.toString().split('\n');

			for (var i in responses) {
				var args = responses[i].split(' ');

				/*
				**	Responses parsing, will be bettered and put in another file
				*/
				if (args[0] == 'msz') {
					game.updateMap(args[1], args[2]);
					// game.map.createBot();
					game.run();
				}
				else if (args[0] == 'pnw') {
					game.createBot(args[1], args[2], args[3], args[4]);
					// game.map.createBot();
					game.run();
				}
			}
		});

		client.on('end', function() {
			console.log('Client disconnected');
		});
	}
	catch(e) {


		console.error("Cannot connect to specified server.");
		console.error(e);
	}
}

function validateConnectionForm() {

	connectToServer(
		document.getElementById('hostField').value,
		document.getElementById('portField').value);
}
