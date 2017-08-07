import React from 'react';
import '../css/header.css';
import pisa from '../assets/pisa.png';

export default class Header extends React.Component{
	constructor(props){
		super(props);
		this.gameGallery = this.gameGallery.bind(this);
	}
	
	gameGallery(){
		console.log('test');
		this.props.history.push('/game-gallery');
	}

	render(){
		return(
			<header>
			  <nav>
			    <div className="mobile"></div>
			    <div className="nav-item-wrapper">
			      <div className="logo-wrapper">
			        <div className="title"> GAME PIAZZA</div>
			        <div className="logo"></div>
			      </div>
			      <img className="pisa" src={pisa} alt="Game Piazza" />
			      
			      <ul>
			        <li className="nav-item">Home</li>
			        <li className="nav-item" onClick={this.gameGallery}>Game Gallery</li>
			        <li className="nav-item">My Scoreboard</li>
			      </ul>
			    </div>
			  </nav>
			</header>
		);
	}
}