import 'isomorphic-fetch';
require('babel-polyfill');



// Set initial state after login
export const LOGIN = 'LOGIN';
export const login = (user_info) => ({
  type: LOGIN,
  name: user_info.name,
  email: user_info.email,
  id: user_info.id
})


export const saveScore = score_info => dispatch => {	
alert('savescore')
	const url = '/score';
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({score_info})
	})
	.then(response => response.json())
	.then(function(data){
		console.log(`Data From Server: ${JSON.stringify(data, null, 4)}`)
	}).catch(err => console.error(err))
}

export const saveToScoreBoard = score_info => dispatch => {	

	const url = '/score/pong';
	console.warn(url);
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({score_info})
	})
	.then(response => response.json())
	.then(function(data){
		console.log(`Data From Server: ${JSON.stringify(data, null, 4)}`)
	}).catch(err => console.error(err))
}

export const validateUser = user_info => dispatch => {
	const url = '/validate';
	fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user_info)
	})
	.then(response => response.json())
	.then(function(data){
		console.log(data);
	}).catch(err => console.error(err));
}
