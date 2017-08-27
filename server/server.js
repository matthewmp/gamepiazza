
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {PORT, DATABASE_URL} = require('./config');
const socket = require('socket.io');
const scoreRouter = require('./routes/scoreRouter');
const validateRouter = require('./routes/validateRouter');
const path = require('path');


const app = express();

mongoose.Promise = global.Promise;
console.log('Server Running');

// Track players entering room
let playersList = [];
console.log(__dirname);
app.use('/', express.static(path.join(__dirname, '../client/build')));
app.use(morgan('common'));
app.use(bodyParser.json());

app.use('/score', scoreRouter.router);
app.use('/validate', validateRouter.router);

function startSocketIO(){
	const io = socket(server);
	let nsp = io.of('/pong');

	nsp.on('connection', function(socket){
		socket.on('mouse', function(coor){	
			socket.emit('mouse', coor)
		});

		socket.on('state', function(data){
			playersList.forEach(function(elem, ind){
				if(elem.name === data.name){
					playersList.splice(playersList[ind], 1);
				}
			})

			let user = {name: data.name, id: data.id};
			if(data.name){
				playersList.push(user);
			}
			
			nsp.emit('list', playersList)
		})

		socket.on('mousePos', function(data){
			socket.broadcast.emit('mousePos', data);
		})

		socket.on('ball', function(data){
			socket.broadcast.emit('ball', data);
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

		socket.on('shrink_paddle', () => {
			nsp.emit('shrink_paddle');
		})

		socket.on('disconnect', () => {
			playersList.forEach(function(elem, ind){
				if(elem.id === socket.id){
					playersList.splice(ind, 1);
				}
			})

			nsp.emit('list', playersList)
		})

		socket.on('leaving', () => {
			playersList.forEach(function(elem, ind){
				if(elem.id === socket.id){
					playersList.splice(ind, 1);
				}
			})

			nsp.emit('list', playersList)
		})
	})
}
let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        startSocketIO();
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}


if (require.main === module) {
  runServer().catch(err => console.error(err));
};



module.exports = {runServer, closeServer, app};