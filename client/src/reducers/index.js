import * as actions from '../actions';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


const initialState = {
	id: '',
	email: '',
	name: '',
	inplay: false
}

export const gameReducer = (state=initialState, action) => {	
	if(action.type === actions.LOGIN){		
		return Object.assign({}, state, {
			id: action.id,
			email: action.email,
			name: action.name
		});		
	}
	else if(action.type === actions.INPLAY){
		return Object.assign({}, state, {
			inplay: action.bool
		})
	}
	else if(action.type === actions.SET_PLAYER){
		Object.assign({}, state, {
			player: action.player
		})
	}
	else {
		return state;
	}
};