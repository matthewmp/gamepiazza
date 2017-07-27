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
	// type: SAVE_SCORE,
	// score: score_info.score,
	// name: score_info.name,
	// game: score_info.game
	// 
	//alert('Writing to DB: ' + score_info.name + ' ' + score_info.score + ' ' + score_info.game);
	console.error("ACTIONS");
}