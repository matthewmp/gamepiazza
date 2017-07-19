import React from 'react';
import Fb from './fb';

import mario from '../assets/mario.png'
import pisa from '../assets/pisa.png'
import Highscore from './highscore';

export default class Login extends React.Component{
	

	render(){
		return(
			<section className="main-container">
			  <div className="left-container">
			    <div className="title game">Game</div>
			    
			      <img src={pisa} id="piazza" alt="pisa"/>
			    
			    
			    <img src={mario} id="mario" alt="mario"/>
			  
			    
			    
			    
			    <div className="login">
			       <Fb />
			    </div>
			  </div>
			  <Highscore />
			</section>
		)
	}
}