import React from 'react';
import Fb from './fb';

import mario from '../assets/mario.png'
import pisa from '../assets/pisa.png'
import Highscore from './highscore';
import gameGallery from './gameGallery';

export default class Login extends React.Component{
	constructor(props){
		super(props);
		this.test = this.test.bind(this);
	}

	test(){
		console.log('test');
		this.props.history.push('/game-gallery');
	}
	

	render(){
		return(
			<section className="main-container">
			  <div className="left-container">
			    <div className="title game">Game</div>
			    
			      <img src={pisa} id="piazza" alt="pisa"/>
			    
			    
			    <img src={mario} id="mario" alt="mario"/>
			  
			    
			    
			    
			    <div className="login">
			       <Fb />
			       <div><button onClick={this.test}>Go TO Games</button></div>
			    </div>
			   

			  </div>
			  <Highscore />
			</section>
		)
	}
}