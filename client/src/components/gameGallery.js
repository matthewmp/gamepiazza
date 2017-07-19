import React from 'react';
import '../css/game-gallery.css';
import {Link} from 'react-router-dom';

export default class gameGallery extends React.Component{

	render(){
		return(
			<section className="game-gallery">
				<div><Link to="pong">PONG</Link></div>
			</section>
		)
	}
}

