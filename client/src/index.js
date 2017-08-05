import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import store from './store';
import App from './components/App';
import Login from './components/login';
import gameGallery from './components/gameGallery';
import Pong from './components/pong';
import PongSinglePlayer from './components/pong-single-player';
store.subscribe(() => {
	const state = store.getState();
	console.log('Store_State: ',  state);
})

ReactDOM.render(
	<Provider store={store}>
	 <Router>	
	      	<div>	
		      <Route exact path = '/' component={Login} />
		      <Route exact path = '/game-gallery' component={gameGallery} />
		      <Route exact path = '/pong' component={Pong} />
		      <Route exact path = '/pong' component={PongSinglePlayer} />
		      
		    </div>  

	</Router>
		
	</Provider>, document.getElementById('root'));