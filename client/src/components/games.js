import React from 'react';
import '../css/games.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

export class Games extends React.Component{

	render(){
		return(
			<section className="games-wrapper">
				<Link to="pong1"><div className="game">Pong Single Player</div></Link>
				<Link to="pong"><div className="game">Pong Multi Player <p className="beta">Beta Version</p></div></Link>
				<div className="game">Coming Soon</div>
			</section>
		);
	}
}



export default connect()(Games);