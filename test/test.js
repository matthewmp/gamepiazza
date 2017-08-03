'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const should = chai.should();
chai.use(chaiHttp);

const {app, runServer, closeServer} = require('../server');  // put close server in server.js
const {TEST_DATABASE_URL} = require('../config');



function statDetails(){
	return {
		email: '',
		name: '',
		game: faker.lorem.word(),
		score: faker.random.number()
	}
}

function makeUser(){
	return {
		email: faker.internet.email(),
		name: faker.name.findName()
	}
}

let user = makeUser();
let userGame;  // will hold stats after written to DB.



function tearDown(){
	console.warn('Deleting DB');
	return mongoose.connection.dropDatabase();
}

describe('Forum API Resource', function(){
	before(function(){
		return runServer(TEST_DATABASE_URL);
	});

	after(function(){
		return tearDown();
		return closeServer();
	});


	describe('/validate', function(){
		it('Searches for existing user, if not found, creates user', function(){			

			return chai.request(app)
			.put('/validate')
			.send(user)
			.then(function(res){
				res.should.be.json;
				res.body.should.contain.keys('name', 'email');
				res.body.name.should.equal(user.name)
				res.body.email.should.equal(user.email);
			});
		});
	});

	describe('/validate', function(){
		it('Confirms a user exists and is logged in', function(){			
			return chai.request(app)
			.put('/validate')
			.send(user)
			.then(function(res){
				res.should.be.json;
				res.body.message.should.equal('User Logged In');
			});
		});
	});

	describe('/score', function(){
		it('Sets new score & game info', function(){
			let info = statDetails();
			let obj = {};
			obj.score_info = {
				name: user.name,
				email: user.email,
				game: info.game,
				score: info.score
			}

			return chai.request(app)
			.post('/score')
			.send(obj)
			.then(function(res){
				console.log('RES: ', res.body);
				res.should.be.json;
				res.body.should.contain.keys('game');
				res.body.game.should.contain.keys('_id', 'email', 'name', 'stats');
				userGame = res.body.game;
				console.log('userGame: ', userGame)
			});	
		});
	});

	// describe('/:email', function(){
	// 	it('returns all users games and stats', function(){
	// 		return chai.request(app)
	// 		.get(`/score/${user.email}`)
	// 		.then(function(res){
	// 			console.log(`\n\n GET USER STATS: `);
	// 			console.log(JSON.stringify(res.body.users_stats[0], null, 4));
	// 			let stats = res.body.users_stats[0];
	// 			stats._id.should.equal(userGame._id);
	// 			stats.email.should.equal(userGame.email);
	// 			stats.name.should.equal(userGame.name);
	// 			stats.stats[0].date.should.equal(userGame.stats[0].date);
	// 			stats.stats[0].game.should.equal(userGame.stats[0].game);
	// 			stats.stats[0]._id.should.equal(userGame.stats[0]._id);
	// 			stats.stats[0].score.should.equal(userGame.stats[0].score);
	// 		});
	// 	});
	// });


});

