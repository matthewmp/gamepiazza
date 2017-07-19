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

export const INPLAY = 'INPLAY';
export const inplay = (bool) => ({
	type: INPLAY,
	bool
})

export const SET_PLAYER = 'SET_PLAYER';
export const setPlayer = (player) => ({
	type: SET_PLAYER,
	player
})