const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = mongoose.Schema({
	
		email: String,
		name: String,
		stats: [{
			game: String,
			date: String,
			score: {type: Number, default: 0}
		}]
	
})

const Users = mongoose.model('users', usersSchema);
module.exports = {Users};