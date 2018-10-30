var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var url = require('url');
var fs = require('fs');

app.listen(5000);

function handler(req, res) {
	console.log("ITS RUNNING");
}

io.sockets.on('connection', function(socket) {

	socket.on('example-ping', data => {
		console.log("ping");

		var delay = data.duration;

		setTimeout(function() {
			socket.emit("example-pong");
		}, delay * 1000);
	})
})
