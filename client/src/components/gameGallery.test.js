import React from 'react';
import {shallow, mount} from 'enzyme';
import store from '../store';
import {Provider} from 'react-redux';

import GameGallery from './gameGallery';

describe('<GameGallery />', () => {
	it('Renders without crashing', () => {
		const wrapper = shallow(
				<Provider store={store}>
					<GameGallery />
				</Provider>
		);
	});

	it('Renders initially w/o class', () => {
		const wrapper = shallow(
				<Provider store={store}>
					<GameGallery />
				</Provider>
		)
		expect(wrapper.hasClass('game-gallery')).toEqual(false);
	})
});
