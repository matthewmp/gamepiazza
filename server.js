
const express = require('express');
console.log('SERVER')
const app = express();
const server = app.listen(3001);

app.use(express.static('static'));

const socket = require('socket.io');
const io = socket(server);

io.sockets.on('connection', newConnection);

let playersList = [];

function newConnection(socket){
	console.log('New socker id: ' + socket.id);

	socket.on('mouse', function(coor){
		//console.log(coor)
		socket.broadcast.emit('mouse', coor)
	});

	socket.on('state', function(data){
		console.log(data);
		playersList.push(data.name);
		console.log(playersList);
		socket.emit('list', playersList)
	})

	socket.on('mousePos', function(data){
		socket.broadcast.emit('mousePos', data);
	})

	socket.on('ball', function(data){

		socket.broadcast.emit('ball', data);
	})
}













