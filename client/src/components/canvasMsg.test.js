import React from 'react';
import {shallow, mount} from 'enzyme';

import CanvasMsg from './CanvasMsg';

describe('<CanvasMsg />', () => {
	it('Renders without crashing', () => {
		shallow(<CanvasMsg />);
	});

	it('Has correct class name', () => {
		expect(shallow(<CanvasMsg />).hasClass('canvas-msg')).toEqual(true);
	})
});
