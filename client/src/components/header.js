import React from 'react';
import {Link} from 'react-router-dom';
import '../css/header.css';
import pisa from '../assets/pisa.png';

export default class Header extends React.Component{
	constructor(props){
		super(props);
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
			        <Link to="/"><li className="nav-item">Home</li></Link>
			        <Link to="/game-gallery"><li className="nav-item">Game Gallery</li></Link>
			        <Link to="/scoreboard"><li className="nav-item">My Scoreboard</li></Link>
			      </ul>
			    </div>
			  </nav>
			</header>
		);
	}
}