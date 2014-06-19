var	net = require('net'),
	gui = require('nw.gui'),
	Game = require('./Game.js');
	ResponseParser = require('./ResponseParser.js');

global.THREE = THREE;

process.on('uncaughtException', function(e) {
	// console.log(e);
	// console.log(e.message);

	if (e.code == "ECONNREFUSED") {
		// console.log("Cannot reach the server");
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

	var	client = new net.Socket(),
		game = new Game(),
		responseParser = new ResponseParser(client, game);

	// Attach event to Back button
	document.getElementById('btnBack').addEventListener('click', function _func() {
		destroySession(client, game);
		document.getElementById('btnBack').removeEventListener('click', _func);
	});

	client.connect(port, host, function() {

	});

	client.on('close', function() {
		destroySession(client, game);
		game.clear();
		game = null;
	});

	client.on('data', function(data) {
		var responses = data.toString().split('\n');
		for (var i in responses)
			responseParser.push(responses[i]);
	});

	client.on('end', function() {
		// console.log('Client disconnected');
		destroySession(client, game);
	});
}

function validateConnectionForm() {

	// console.log('Conneting to '
		// + document.getElementById('hostField').value
		// + ' '
		// + document.getElementById('portField').value);

	connectToServer(
		document.getElementById('hostField').value,
		document.getElementById('portField').value);
}
