import React from 'react';
import '../css/footer.css';
import BottomBanner from  './bottom-banner';

export default class Footer extends React.Component{
	render(){
		return (
			<section className="footer-wrapper">
				<BottomBanner />
				<footer>
					<p className="footer">Made by <span className="f-white">Matthew Palumbo</span></p>
					<p className="footer"><a href="http://www.thinkful.com"><span className="f-white">Thinkful</span></a> React Capstone</p>
					<div className="gh footer">
						<a href="https://github.com/mmpal78/gamepiazza">
						<span className="f-white"><i className="fa fa-github fa-lg" aria-hidden="true"></i></span>
						</a>
					</div>	
					
				</footer>
			</section>	
		)
	}
	
}