'use strict';

var express = require('express');
var router = express.Router();

var _require = require('../models/userModel'),
    Users = _require.Users;

var _require2 = require('../models/pongStatsModel'),
    PongStats = _require2.PongStats;

router.get('/:email', function (req, res) {
	var email = req.params.email;
	Users.find({ "email": email }).then(function (resp) {
		res.status(200).json({ resp: resp });
	});
});

router.post('/', function (req, res) {
	var info = req.body.score_info;
	var statDetails = {
		email: info.email,
		name: info.name,
		stats: [{
			game: info.game,
			date: new Date().toDateString(),
			score: info.score
		}]

	};
	console.log(statDetails);

	Users.findOneAndUpdate({ email: statDetails.email }, { $push: { stats: statDetails.stats[0] } }, { new: true }).exec().then(function (resp) {
		res.status(201).json({ game: resp });
	}).catch(function (err) {
		return console.log(err);
	});
});

router.post('/pong', function (req, res) {
	var info = req.body;
	PongStats.create({
		email: info.email,
		name: info.name,
		game: info.game,
		date: new Date().toDateString(),
		score: info.score
	}).then(function (response) {
		console.log('Create Response: ', response);
		res.status(201).json({ result: response });
	}).catch(function (err) {
		return console.log(err);
	});
});

module.exports = {
	router: router
};