'use strict';

var express = require('express');
var router = express.Router();

var _require = require('../models/userModel'),
    Users = _require.Users;

router.put('/', function (req, res) {
	var email = void 0;

	if (req.body.email === undefined) {
		email = req.body.id;
	} else {
		email = req.body.email;
	}
	console.log('VALIDATE: ' + email);
	var name = req.body.name;

	console.log('BODY: ', req.body);

	var user = Users.count({ email: email }, function (err, count) {

		if (count <= 0) {
			Users.create({
				email: email,
				name: name
			}).then(function (response) {
				console.log('Create Response: ', response);
				res.status(201).json({ name: response.name, email: response.email });
			});
		} else {
			Users.find({ email: email }).exec().then(function (resp) {
				res.json({ message: 'User Logged In' });
			});
		}
	});
});

module.exports = {
	router: router
};