import * as actions from '../actions';



export const initialState = {
	id: '',
	email: '',
	name: '',
	inplay: false
}

export const gameReducer = (state=initialState, action) => {
	console.log(action.type);
	if(action.type === actions.LOGIN){		
		return Object.assign({}, state, {
			id: action.id,
			email: action.email,
			name: action.name
		});	
	}

	else if(action.type === actions.GET_SCORES_SUCCESS){
		console.log('GET_SCORES_SUCCESS: ', action.data)
		return Object.assign({}, state, {
			user_scores: action.data
		})
	}
		
	else {
		return state;
	}
};
