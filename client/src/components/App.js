import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from './login';

import Pong from './pong';
import gameGallery from './gameGallery';


export default class App extends React.Component{
	constructor(props){
		super(props);
		this.loggedIn = this.loggedIn.bind(this);
	}	

	render(){
	    return (
	    	<div></div>
	    )
	}
}
 
