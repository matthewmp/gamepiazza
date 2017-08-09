import React from 'react';
import '../css/bottom-banner.css';

export default class BottomBanner extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		// $(window).scroll(function(){
		// 	$('.bottom-banner').css('bottom', '4px')
		// });

		window.addEventListener('resize', function(){
			try{
				document.getElementsByClassName('bottom-banner')[0]
				.style.bottom = '0';
			} 
			catch(err){
				console.log(err);
			}
		})

		window.addEventListener('scroll', function(){
			try{
				document.getElementsByClassName('bottom-banner')[0]
				.style.display = 'none';
			}
			catch(err){
				console.log(err);
			}
		})
	}

	render() {
		return (
			<section className="bottom-banner"></section>
		)
	}
	
}