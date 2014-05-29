var net = require('net');

var config = URL.parse(window.location).params;

var client = new net.Socket();
client.connect(config.port, config.host,
	function() {
		client.write('msz\n');
		client.write('sst\n');
		client.write('sgt\n');
});





client.on('data', function(data) {
	console.log(data.toString());

	var responses = data.toString().split('\n');

	for (var i in responses) {
		var args = responses[i].split(' ');

		if (args[0] == 'msz') {
			game.updateMap(args[1], args[2]);
			game.run();
		}
	}




});

client.on('end', function() {
	console.log('Client disconnected');
});
