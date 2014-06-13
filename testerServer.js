var net = require('net');

var	minMapX = 4,
	maxMapX = 13,
	minMapY = 4,
	maxMapY = 13;

/////////

var Case = function(x, y) {

	var _x = x;
	var _y = y;

	var a = Math.floor(Math.random() * 10);
	var b = Math.floor(Math.random() * 10);
	var c = Math.floor(Math.random() * 10);
	var d = Math.floor(Math.random() * 10);
	var e = Math.floor(Math.random() * 10);
	var f = Math.floor(Math.random() * 10);
	var g = Math.floor(Math.random() * 10);

	this.toString = function() {
		return ('bct '+_x+' '+_y+' '+a+ ' '+b+ ' '+c+ ' '+d+' '+e+' '+f+' '+g+'\n');
	}
}

function generateRandomMap() {

	var map = [];

	var _width = Math.floor((Math.random() * (maxMapX - minMapX)) + minMapX);
	var _height = Math.floor((Math.random() * (maxMapY - minMapY)) + minMapY);

	for (var i = 0; i < _width; i++) {
		map[i] = [];
		for (var j = 0; j < _height; j++) {
			map[i][j] = new Case(i, j);
		}
	}

	map.getSize = function() {
		return ('msz '+_width+' '+_height+'\n');
	}

	map.getContent = function() {
		var content = '';
		for (var i = 0; i < _width; i++) {
			for (var j = 0; j < _height; j++) {
				content += map[i][j].toString();
			}
		}
		return content;
	}

	return (map);
}

/////////

var map = generateRandomMap();

var server = net.createServer(function (socket) {
	socket.write('Welcome to the server\r\n');

	socket.on('data', function(data) {
		var req = data.toString().split('\n');


		for (var i in req){
			req[i] = req[i].split(' ');

			switch (req[i][0]) {
				case 'msz':
					console.log(req[i]);
					socket.write(map.getSize());
					break;
				case 'bct':
					var x = parseInt(req[i][1]);
					var y = parseInt(req[i][2]);

					socket.write(map[x][y].toString());
					break;
				case 'mct':
					socket.write(map.getContent());
					break;
			}	
		}

	});
});

server.listen(1337, 'localhost');
