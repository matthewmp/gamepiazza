import React from 'react';
import {shallow, mount} from 'enzyme';
import store from '../store';
import configureMockStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {Pong} from './pong';
import { initialState as featureComponent } from '../reducers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('<Pong />', () => {
	it('Renders w/o crashing', () => {
		const wrapper = shallow(
			<Provider store={store}>
				<Pong />
			</Provider>
		);
	});
});
