import React from 'react';
import '../css/footer.css';
import BottomBanner from  './bottom-banner';

export default class Footer extends React.Component{
	constructor(props){
		super(props);
	}

	footerBottom(){
		document.querySelector('footer').style.top = document.body.scrollHeight - 50  + 'px';
		document.getElementsByClassName('bottom-banner')[0].style.top = document.body.scrollHeight - 100  + 'px';
	}

	componentDidMount(){
		let that = this;
		window.addEventListener('scroll', function(){
			that.footerBottom();
		})

		window.addEventListener('resize', function(){
			that.footerBottom();
		})
	}

	render(){
		return (
			<section>
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