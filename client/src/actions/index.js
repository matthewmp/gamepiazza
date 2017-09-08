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
	}).catch(err => console.error(err))
}

export const getScores = email => dispatch => {
	const url = `/score/${email}`;
	fetch(url, {
		method: 'GET'
	})
	.then(response => response.json())
	.then(function(data){
		dispatch(getScoresSuccess(data));
	}).catch(err => console.error(err))
}

export const GET_SCORES_SUCCESS = 'GET_SCORES_SUCCESS';
export const getScoresSuccess = (data) => ({	
	type: GET_SCORES_SUCCESS,
	data
})

export const validateUser = user_info => dispatch => {
	const url = '/validate';
	console.log('USER: ', user_info)
	fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user_info)
	})
	.then(response => response.json())
	.then(function(data){
	}).catch(err => console.error(err));
}
