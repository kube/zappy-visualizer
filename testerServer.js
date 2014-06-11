var net = require('net');

var fakeGame = {};


var server = net.createServer(function (socket) {
	socket.write('Welcome to the server\r\n');

	socket.on('data', function(data) {
		var req = data.toString().split('\n');


		for (var i in req){
			req[i] = req[i].split(' ');

			switch (req[i][0]) {
				case 'msz':
					console.log(req[i]);
					socket.write('msz 5 5');
					break;
			}	
		}

	});
});

server.listen(1337, 'localhost');
