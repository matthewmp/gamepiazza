const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pongStats = mongoose.Schema({
		email: String,
		name: String,
		game: String,
		date: String,
		score: Number
})

const PongStats = mongoose.model('pongs', pongStats);
module.exports = {PongStats};