import React from 'react';
import '../css/game-gallery.css';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from './header';
import Footer from './footer';
import BottomBanner from './bottom-banner';
import {Games} from './games';

export class gameGallery extends React.Component{
	constructor(props){
		super(props);
		console.log('LOCAL: ', localStorage)
	}

	componentDidMount(){
		if(!localStorage.user_info){
			this.props.history.push('/');
			alert('You Must Be Logged In To Use Site	')
		}
		
		if(localStorage.user_info && !this.props.state.name){
			console.log('NO NAME');
			console.log(JSON.parse(localStorage.user_info));
			this.props.dispatch(actions.login(JSON.parse(localStorage.user_info)));
		}
		
		
		
		
	}

	render(){
		console.log('Game Gallery State: ', this.props.state)
		return(

			<section className="game-gallery">
				<Header />
				<Games />
				<BottomBanner />	
				<Footer />
			</section>
		)
	}
}

const mapToState = (state, props) => ({
	state: state
})

export default connect(mapToState)(gameGallery);