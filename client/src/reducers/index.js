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
		console.log('REDUCER STATE: ', state)	;
	}
		
	else {
		return state;
	}
};
