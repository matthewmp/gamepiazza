'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pongStats = mongoose.Schema({
	games: [{
		email: String,
		name: String,
		game: String,
		date: String,
		score: Number
	}]
});

var PongStats = mongoose.model('pongs', pongStats);
module.exports = { PongStats: PongStats };