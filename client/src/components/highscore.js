import React from 'react';
import luigi from '../assets/luigi.png';

export default class Highscore extends React.Component{
	
	render(){
		return(
			<div className="right-container">
				<div className="title piaz">Piazza</div>
					<img src={luigi}  id="luigi" alt="luigi"/>
					<div className="high-scores">
					<p>Pong: 1000 Some Guy 7/10/2017</p>
					<p>Pong: 1000 Some Guy 7/10/2017</p>
					<p>Pong: 1000 Some Guy 7/10/2017</p>
					<p>Pong: 1000 Some Guy 7/10/2017</p>
					<p>Pong: 1000 Some Guy 7/10/2017</p>
					<p>Pong: 1000 Some Guy 7/10/2017</p>
					<p>Pong: 1000 Some Guy 7/10/2017</p>
				</div>
			</div>
		)
	}
}