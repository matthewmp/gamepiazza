'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var _require = require('./config'),
    PORT = _require.PORT,
    DATABASE_URL = _require.DATABASE_URL;

var socket = require('socket.io');
var scoreRouter = require('./routes/scoreRouter');
var validateRouter = require('./routes/validateRouter');

var app = express();
//const server = app.listen(3001);

mongoose.Promise = global.Promise;
console.log('Server Running');

var playersList = [];

app.use(express.static('static'));
app.use(morgan('common'));
app.use(bodyParser.json());

app.use('/score', scoreRouter.router);
app.use('/validate', validateRouter.router);

function startSocketIO() {
	var io = socket(server);
	var nsp = io.of('/pong');

	nsp.on('connection', function (socket) {
		console.log('New socker id: ' + socket.id);

		socket.on('mouse', function (coor) {
			socket.emit('mouse', coor);
		});

		socket.on('state', function (data) {

			// let index = playersList.indexOf(data.name);
			// console.log(`IndexOf: ${index}, Name: ${data.name}`);
			// if(index >= 0){
			// 	playersList.splice(index, 1);
			// 	console.log(`Splicing: ${playersList[index]}`);
			// }

			playersList.forEach(function (elem, ind) {
				if (elem.name === data.name) {
					playersList.splice(playersList[ind], 1);
					console.log('Splicing: ', playersList[ind]);
				}
			});

			var user = { name: data.name, id: data.id };
			if (data.name) {
				playersList.push(user);
				console.log('New PlayersList: ', playersList);
			}

			nsp.emit('list', playersList);
			//io.sockets.emit('list', playersList)
		});

		socket.on('mousePos', function (data) {
			socket.broadcast.emit('mousePos', data);
		});

		socket.on('ball', function (data) {
			socket.broadcast.emit('ball', data);
		});

		socket.on('challenge', function () {
			nsp.emit('challenge');
			//socket.emit('challenge');
		});

		socket.on('test', function (data) {
			nsp.emit('test', data);
			//io.sockets.emit('test', data);
		});

		socket.on('newplayer', function () {
			nsp.emit('newplayer');
			//io.sockets.emit('newplayer');
		});

		socket.on('message', function (msg, name) {
			nsp.emit('message', msg, name);
			//io.sockets.emit('message', msg, name);
		});

		socket.on('score', function (side) {
			nsp.emit('score', side);
			//io.sockets.emit('score', side);
		});

		socket.on('reset', function () {
			nsp.emit('reset');
			//io.sockets.emit('reset');
		});

		socket.on('disconnect', function () {
			console.log('DISCONNECTING');
			console.log(socket.id);
			console.log('Player List before Disconnect: ', playersList);
			playersList.forEach(function (elem, ind) {
				if (elem.id === socket.id) {
					playersList.splice(ind, 1);
				}
			});

			nsp.emit('list', playersList);
			console.log('List after Disconnect: ', playersList);
		});

		socket.on('leaving', function () {
			console.log('LEAVING');
			console.log(socket.id);
			console.log('Player List before Disconnect: ', playersList);
			playersList.forEach(function (elem, ind) {
				if (elem.id === socket.id) {
					playersList.splice(ind, 1);
				}
			});

			nsp.emit('list', playersList);
			console.log('List after Disconnect: ', playersList);
		});
	});
}
var server = void 0;

function runServer() {
	var databaseUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DATABASE_URL;
	var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PORT;

	console.log('\n\n\n');
	console.log('DB URL: ' + databaseUrl + ' PORT: ' + port);
	console.log('\n\n\n');
	return new Promise(function (resolve, reject) {
		mongoose.connect(databaseUrl, function (err) {
			if (err) {
				return reject(err);
			}

			server = app.listen(port, function () {
				console.log('Your app is listening on port ' + port);
				startSocketIO();
				resolve();
			}).on('error', function (err) {
				mongoose.disconnect();
				reject(err);
			});
		});
	});
}

function closeServer() {
	return mongoose.disconnect().then(function () {
		return new Promise(function (resolve, reject) {
			console.log('Closing server');
			server.close(function (err) {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	});
}

if (require.main === module) {
	runServer().catch(function (err) {
		return console.error(err);
	});
};

module.exports = { runServer: runServer, closeServer: closeServer, app: app };