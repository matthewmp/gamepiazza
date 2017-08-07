import * as actions from '../actions';



export const initialState = {
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
		
	else {
		return state;
	}
};
