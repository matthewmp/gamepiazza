const express = require('express');
const router = express.Router();

const {Users} = require('../models/userModel');
const {PongStats} = require('../models/pongStatsModel');

router.get('/:email', (req, res) => {
	let email = req.params.email;
	Users.find({"email": email})
	.then(resp => {
		res.status(200).json({resp})
	})
	
});

router.post('/', (req, res) => {
	let info = req.body.score_info;
	let statDetails = {
		email: info.email,
		name: info.name,
		stats: [{
			game: info.game,
			date: new Date().toDateString(),
			score: info.score
		}]
		
		
	}

	Users.findOneAndUpdate(
		{email: statDetails.email},
		{$push: {stats: statDetails.stats[0]}},
		{new: true}
	)
	.exec()
	.then(resp => {
		res.status(201).json({game: resp});
	})
	.catch(err => console.log(err));
})

router.post('/pong', (req, res) => {
	let info = req.body;
	PongStats.create({
		email: info.email,
		name: info.name,
		game: info.game,
		date: new Date().toDateString(),
		score: info.score
	})
	.then(response => {
		res.status(201).json({result: response});
	})
	.catch(err => console.log(err));
})

module.exports = {
	router
};