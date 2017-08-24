import React from 'react';
import '../css/footer.css';
import BottomBanner from  './bottom-banner';

export default class Footer extends React.Component{
	constructor(props){
		super(props);
	}

	footerResize(){
		var footer = document.getElementsByClassName('footer-wrapper')[0];
		var body = document.body, html = document.documentElement;
		var height = Math.max( body.scrollHeight, body.offsetHeight, 
			html.clientHeight, html.scrollHeight, html.offsetHeight );

		footer.style.top = height + 'px';
	}

	ComponentDidMount(){
		window.addEventListener('resize', function(){
			console.log('resize');
			this.footerResize();
		})

		window.addEventListener('scroll', function(){
			console.log('scroll');
			this.footerResize();
		})

		window.addEventListener("orientationchange", function() {
			console.log('orientation');
		    this.footerResize();
		})
	}

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