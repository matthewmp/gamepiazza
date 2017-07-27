
const express = require('express');
console.log('SERVER')
const app = express();
const server = app.listen(3001);

app.use(express.static('static'));

const socket = require('socket.io');
const io = socket(server);

//io.sockets.on('connection', newConnection);
let nsp = io.of('/pong');
nsp.on('connection', function(socket){
	newConnection(socket);
})


let playersList = [];

function newConnection(socket){
	console.log('New socker id: ' + socket.id);

	socket.on('mouse', function(coor){		
		socket.broadcast.to('/pong').emit('mouse', coor)
	});

	socket.on('state', function(data){
	
		let index = playersList.indexOf(data.name);
		console.log(`IndexOf: ${index}, Name: ${data.name}`);
		if(index >= 0){
			playersList.splice(index, 1);
			console.log(`Splicing: ${playersList[index]}`);
		}
		if(data.name){
			playersList.push(data.name);
			console.log('New PlayersList: ', playersList);	
		}
		
		
		nsp.emit('list', playersList)
	})

	socket.on('mousePos', function(data){
		socket.broadcast.to('/pong').emit('mousePos', data);
	})

	socket.on('ball', function(data){
		socket.broadcast.to('/pong').emit('ball', data);
	})

	socket.on('challenge', function(){
		nsp.emit('challenge');
	})

	socket.on('test', function(data){
		nsp.emit('test', data);
	})

	socket.on('newplayer', () => {
		nsp.emit('newplayer');
	})

	socket.on('message', function(msg, name){
		nsp.emit('message', msg, name);
	})

	socket.on('score', (side) => {
		nsp.emit('score', side);
	})

	socket.on('reset', () => {
		nsp.emit('reset');
	})

	socket.on('disconnect', disconnect);
}

function disconnect(){
	console.log('disconnect');
}












