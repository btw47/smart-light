var fs = require('fs');
var app = require('http').createServer(initApp);
var io = require('socket.io')(app);

var initApp = () => {
	console.log("INITIALIZING APP");
}

//constants
const TOGGLE_LIGHT = 'TOGGLE_LIGHT';
const TOGGLE_LIGHT_RESPONSE = 'TOGGLE_LIGHT_RESPONSE';

//listen @ port 5000
app.listen(5000);

//initialize the light as OFF
let lightIsOn = false;

let toggleLight = () => {
	return new Promise((resolve, reject) => {
		lightIsOn = !lightIsOn;
		console.log("LIGHT IS ON?: ", lightIsOn);
	
		//call python script to execute GPIO manipulation here
		
		let error = false;
		if (error) {
			reject('An error occuring while toggling the light.');
		} 
		else {
			resolve(lightIsOn);
		}
	});
}

//declare actions to perform on websocket connection
io.sockets.on('connection', socket => {
	console.log('Connection made.');

	socket.on(TOGGLE_LIGHT, data => {
		toggleLight()
			.then(res => {
				socket.emit(TOGGLE_LIGHT_RESPONSE, { isSuccess: true, lightIsOn: res });
			})
			.catch(err => {
				socket.emit(TOGGLE_LIGHT_RESPONSE, { isSuccess: false, error: err });
			})
	})

})
