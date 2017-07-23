import React from 'react';
import '../css/game-gallery.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

export class gameGallery extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		console.log('Game Galler State: ', this.props.state)
		return(
			<section className="game-gallery">
				<Link to="pong">PONG</Link>
			</section>
		)
	}
}

const mapToState = (state, props) => ({
	state: state
})

export default connect(mapToState)(gameGallery);