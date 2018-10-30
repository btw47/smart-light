var fs = require('fs');
var io = require('socket.io')(app);
var app = require('http').createServer(handler);

app.listen(5000);

//declare actions to perform on websocket connection
io.sockets.on('connection', socket => {
	console.log('Connection made.');

	socket.on('example-ping', data => {
		socket.emit('example-pong');
	})

})
