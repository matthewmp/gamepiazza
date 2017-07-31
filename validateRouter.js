const express = require('express');
const router = express.Router();

const {Users} = require('./models/userModel');

router.put('/', (req, res) => {
	console.log(req.body);
	let email = req.body.email;
	let name = req.body.name;

	let user = Users.count({email: email}, function(err, count){
		console.log('count: ', count);	
		if(count <= 0){
			Users.create({
				email: email,
				name: name
			})
			.then(response => {
				console.log('Create Response: ', response);
				res.json({response: response.name});
			})
		} else {
			Users.find({email: email})
			.exec()
			.then(resp => {
				console.log('USER EXISTS: ', resp);
				res.json({message: 'User Logged In'});
			})
			
			//res.json({response: user});
		}
	})
	
})

module.exports = {
	router
};