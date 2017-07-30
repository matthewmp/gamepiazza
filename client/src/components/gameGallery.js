import React from 'react';
import '../css/game-gallery.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

export class gameGallery extends React.Component{
	constructor(props){
		super(props);
		console.log('LOCAL: ', localStorage)
	}

	componentDidMount(){
		console.log('Cmp Did Mount');
		if(localStorage.user_info && !this.props.state.name){
			console.log('NO NAME');
			console.log(JSON.parse(localStorage.user_info));
			this.props.dispatch(actions.login(JSON.parse(localStorage.user_info)));
		}
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