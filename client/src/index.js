import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';


import store from './store';
import App from './components/App';

store.subscribe(() => {
	const state = store.getState();
	console.log(`Store_State: ${JSON.stringify(state, null, 4)}`);
})

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'));