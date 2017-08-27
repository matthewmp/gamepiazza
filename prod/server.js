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
var path = require('path');

var app = express();

mongoose.Promise = global.Promise;
console.log('Server Running');

// Track players entering room
var playersList = [];
console.log(__dirname);
app.use('/', express.static(path.join(__dirname, '../client/build')));
app.use(morgan('common'));
app.use(bodyParser.json());

app.use('/score', scoreRouter.router);
app.use('/validate', validateRouter.router);

function startSocketIO() {
	var io = socket(server);
	var nsp = io.of('/pong');

	nsp.on('connection', function (socket) {
		socket.on('mouse', function (coor) {
			socket.emit('mouse', coor);
		});

		socket.on('state', function (data) {
			playersList.forEach(function (elem, ind) {
				if (elem.name === data.name) {
					playersList.splice(playersList[ind], 1);
				}
			});

			var user = { name: data.name, id: data.id };
			if (data.name) {
				playersList.push(user);
			}

			nsp.emit('list', playersList);
		});

		socket.on('mousePos', function (data) {
			socket.broadcast.emit('mousePos', data);
		});

		socket.on('ball', function (data) {
			socket.broadcast.emit('ball', data);
		});

		socket.on('challenge', function () {
			nsp.emit('challenge');
		});

		socket.on('test', function (data) {
			nsp.emit('test', data);
		});

		socket.on('newplayer', function () {
			nsp.emit('newplayer');
		});

		socket.on('message', function (msg, name) {
			nsp.emit('message', msg, name);
		});

		socket.on('score', function (side) {
			nsp.emit('score', side);
		});

		socket.on('reset', function () {
			nsp.emit('reset');
		});

		socket.on('shrink_paddle', function () {
			nsp.emit('shrink_paddle');
		});

		socket.on('disconnect', function () {
			playersList.forEach(function (elem, ind) {
				if (elem.id === socket.id) {
					playersList.splice(ind, 1);
				}
			});

			nsp.emit('list', playersList);
		});

		socket.on('leaving', function () {
			playersList.forEach(function (elem, ind) {
				if (elem.id === socket.id) {
					playersList.splice(ind, 1);
				}
			});

			nsp.emit('list', playersList);
		});
	});
}
var server = void 0;

function runServer() {
	var databaseUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DATABASE_URL;
	var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PORT;

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