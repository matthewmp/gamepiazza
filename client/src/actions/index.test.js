import React from 'react';
import {shallow, mount} from 'enzyme';
import * as actions from './index';

	describe('Tests All Action Creators', () => {
		it('Tests login action creator', () => {
			const user_info = {
				type: 'LOGIN'
			}
			expect(actions.login({user_info})).toEqual(user_info);			
		});
	})
