'use strict';

var _actions = require('../client/src/actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var faker = require('faker');


var should = chai.should();
chai.use(chaiHttp);

var _require = require('../server'),
    app = _require.app,
    runServer = _require.runServer,
    closeServer = _require.closeServer; // put close server in server.js


var _require2 = require('../config'),
    TEST_DATABASE_URL = _require2.TEST_DATABASE_URL;

function statDetails() {
	return {
		email: '',
			name: '',
			game: faker.lorem.word(),
			score: faker.random.number()
		};
	}

	function makeUser() {
		return {
			email: faker.internet.email(),
			name: faker.name.findName()
		};
	}

	var user = makeUser();
	var userGame = void 0; // will hold stats after written to DB.


	function tearDown() {
		console.warn('Deleting DB');
		return mongoose.connection.dropDatabase();
	}

	describe('Forum API Resource', function () {
		before(function () {
			return runServer(TEST_DATABASE_URL);
		});

		after(function () {
			return tearDown();
			return closeServer();
		});

		describe('/validate', function () {
			it('Searches for existing user, if not found, creates user', function () {

				return chai.request(app).put('/validate').send(user).then(function (res) {
					res.should.be.json;
					res.body.should.contain.keys('name', 'email');
					res.body.name.should.equal(user.name);
					res.body.email.should.equal(user.email);
				});
			});
		});

		describe('/validate', function () {
			it('Confirms a user exists and is logged in', function () {
				return chai.request(app).put('/validate').send(user).then(function (res) {
					res.should.be.json;
					res.body.message.should.equal('User Logged In');
				});
			});
		});

		describe('/score', function () {
			it('Sets new score & game info', function () {
				var info = statDetails();
				var obj = {};
				obj.score_info = {
					name: user.name,
					email: user.email,
				game: info.game,
				score: info.score
			};

			return chai.request(app).post('/score').send(obj).then(function (res) {
				res.should.be.json;
				res.body.should.contain.keys('game');
				res.body.game.should.contain.keys('_id', 'email', 'name', 'stats');
				userGame = res.body.game;
			});
		});
	});

	// describe('actions.saveScore()', () => {
	// 	it('tests action fetch function for saving users score', () => {
	// 		let obj = {
	// 			name: user.name,
	// 			email: user.email,
	// 			game: 'pong',
	// 			score: faker.random.number()
	// 		}

	// 		var test = actions.validateUser();
	// 		var x = test(obj);
	// 		console.log('TESTTTTTTT: ', x)
	// 	})
	// })

});