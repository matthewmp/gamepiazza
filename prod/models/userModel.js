'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = mongoose.Schema({

	email: String,
	name: String,
	stats: [{
		game: String,
		date: String,
		score: { type: Number, default: 0 }
	}]

});

var Users = mongoose.model('users', usersSchema);
module.exports = { Users: Users };