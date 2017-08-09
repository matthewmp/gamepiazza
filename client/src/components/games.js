import React from 'react';
import '../css/games.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

export class Games extends React.Component{

	render(){
		return(
			<section className="games-gallery-wrapper">
				<div className="games-wrapper">
						<Link to="pong1"><div className="game pong-single">Pong Single Player</div></Link>
						<Link to="pong"><div className="game pong-mult">Pong Multi Player <span className="beta">Beta</span></div></Link>
						<div className="game coming-soon">Coming Soon</div>
				</div>	
			
			</section>
		);
	}
}



export default connect()(Games);