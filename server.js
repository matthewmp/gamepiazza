
const express = require('express');
console.log('SERVER')
const app = express();
const server = app.listen(3001);

app.use(express.static('static'));

const socket = require('socket.io');
const io = socket(server);

io.sockets.on('connection', newConnection);
io.sockets.on('disconnect', disconnect);

let playersList = [];

function newConnection(socket){
	console.log('New socker id: ' + socket.id);

	socket.on('mouse', function(coor){		
		socket.broadcast.emit('mouse', coor)
	});

	socket.on('state', function(data){
		let index = playersList.indexOf(data.name);
		if(index >= 0){
			playersList.splice(index, 1);
		}
		playersList.push(data.name);
		console.log('New PlayersList: ', playersList);
		socket.emit('list', playersList)
	})

	socket.on('mousePos', function(data){
		socket.broadcast.emit('mousePos', data);
	})

	socket.on('ball', function(data){
		socket.broadcast.emit('ball', data);
	})

	socket.on('challenge', function(){
		socket.emit('challenge');
	})
}

function disconnect(){
	console.log(disconnect);
}












