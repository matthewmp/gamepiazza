const express = require('express');
const router = express.Router();

const {Users} = require('./models/userModel');

router.post('/', (req, res) => {
	console.log('INSIDE POST');
	let info = req.body.score_info;
	console.log(req.body)
	let statDetails = {
		email: info.email,
		name: info.name,
		stats: [{
			game: info.game,
			date: '',
			score: info.score
		}]
	}

	console.log(statDetails);
	Users.update(
		{email: statDetails.email},
		{$push: {stats: statDetails.stats[0]}}
	)
	.then(resp => {
		console.log('Response from push: ', resp)
	})
	.catch(err => console.log(err));
})

module.exports = {
	router
};