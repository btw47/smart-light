var app = require('http').createServer(initApp);
var io = require('socket.io')(app);
var exec = require('child_process').exec;

//init app method
var initApp = () => { console.log("INITIALIZING APP"); }

//constants
const ON = 'ON';
const OFF = 'OFF';
const TOGGLE_LIGHT = 'TOGGLE_LIGHT';
const TOGGLE_LIGHT_RESPONSE = 'TOGGLE_LIGHT_RESPONSE';

//listen @ port 5000
app.listen(5000);

//initialize the light as OFF
let lightIsOn = false;

let toggleLight = () => {
	return new Promise((resolve, reject) => {
		//update the status of the light
		lightIsOn = !lightIsOn;

		//call python script to execute GPIO manipulation
		dir = exec(`python toggleLight.py ${ lightIsOn ? ON : OFF }`, function(err) {
			if (err) {
				console.log("ERR: ", err)
				reject('An error occuring while toggling the light.');
			} 
			else {
				resolve(lightIsOn);
			}
		});
	});
}

//declare actions to perform on websocket connection
io.sockets.on('connection', socket => {
	console.log('Connection made.');

	socket.on(TOGGLE_LIGHT, data => {
		toggleLight()
			.then(lightIsOn => {
				socket.emit(TOGGLE_LIGHT_RESPONSE, { isSuccess: true, lightIsOn });
			})
			.catch(error => {
				socket.emit(TOGGLE_LIGHT_RESPONSE, { isSuccess: false, error });
			})
	})

})

//clear up GPIO pins in use at disconnect
io.sockets.on('disconnect', () => {
	console.log('Connection lost.');
	console.log('Cleaning up Raspberry Pi now.');

	exec('python cleanUp.py', function(err) {
		if (err) console.log('An error occured while attempting to clean up Raspberry Pi on disconnect.');
	})
})

