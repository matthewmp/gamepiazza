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
			email: action.email || action.id,
			name: action.name
		});	
	}

	else if(action.type === actions.GET_SCORES_SUCCESS){
		return Object.assign({}, state, {
			user_scores: action.data
		})
	}
		
	else {
		return state;
	}
};
