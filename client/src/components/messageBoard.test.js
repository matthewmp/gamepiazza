import React from 'react';
import {shallow, mount} from 'enzyme';

import MessageBoard from './CanvasMsg';

describe('<MessageBoard />', () => {
	it('Renders without crashing', () => {
		shallow(<MessageBoard />);
	});
});