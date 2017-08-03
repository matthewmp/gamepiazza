import React from 'react';
import {shallow, mount} from 'enzyme';
import * as actions from '../actions';
import {gameReducer, initialState} from './index';

let testAction = {
	  type: actions.LOGIN,
	  name: 'user_info.name',
	  email: 'user_info.email',
	  id: 'user_info.id',
	  inplay: false
}

	describe('Test Reducer', () => {
		it('tests', () => {
			expect(gameReducer(initialState, testAction)).toEqual(
			{
				name: 'user_info.name',
			    email: 'user_info.email',
			    id: 'user_info.id',
			    inplay: false
			}
			);
		})
	})