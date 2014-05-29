var net = require('net');

var config = URL.parse(window.location).params;

var client = new net.Socket();
client.connect(config.port, config.host,
	function() {
		console.log('Connected to ' + config.host + ':' + config.port);
	client.write('msz\n');
	client.write('sst\n');
	client.write('sgt\n');
});

client.on('data', function(data) {
	console.log(data.toString());
});

client.on('end', function() {
	console.log('Client disconnected');
});




