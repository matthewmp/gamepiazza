import React from 'react';
import Fb from './fb';
import BottomBanner from './bottom-banner';
import Header from './header';
import Footer from './footer';
import '../css/login.css';

export default class Login extends React.Component{

	componentDidMount(){
		let can = document.getElementById('can');
		let ctx = can.getContext('2d');

		function ballMaker(){
		  return {
		    x: Math.floor(Math.random(0) * can.width),
		    y: Math.floor(Math.random(0) * can.height),
		    r: 5,
		    xSpeed: 3,
		    ySpeed: 3,
		    draw: function(){
		      ctx.beginPath();
		      ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
		      ctx.fill();
		    },
		    update: function(){
		      this.x += this.xSpeed;
		      this.y += this.ySpeed;
		      if(this.x >= can.width || this.x <= 0 || this.y >= can.height || this.y <= 0){
		        this.xSpeed = -this.xSpeed + Math.floor(Math.random(2) * 5);
		        this.ySpeed = -this.ySpeed + Math.floor(Math.random(2) * 5);
		        if(this.xSpeed > 10 || this.ySpeed > 10){
		          this.x = Math.floor(Math.random(0) * can.width);
		          this.y = Math.floor(Math.random(0) * can.height);
		          this.xSpeed = 5;
		          this.ySpeed = 2;
		        }
		      }
		    }
		  }
		}

		let ballArr = [];

		for(let i = 0; i < 20; i++){
		  let ball = ballMaker();
		  ballArr.push(ball);
		}




		setInterval(function(){
		  ctx.fillStyle = '#fff';
		  ctx.fillRect(0, 0, can.width, can.height);
		  ctx.fillStyle = '#5ED4FF';
		  ballArr.forEach(function(val){
		    val.update();
		    val.draw();
		  })
		}, 30)
	}
	
	render(){
		return(
			<section>
				<Header />
				<section className="main-container">
				  <div className="left-container">
				    <div className="outer-console">
				       <div className="outer-tv">
				         <canvas id="can"></canvas>
				      </div>
				    </div>
				  </div>
				  <div className="right-container">
				    <div className="slogan-wrapper">
				        <p className="slogan-title">GAME PIAZZA</p>
				        <p className="slogan">Simple</p>
				        <p className="slogan">Retro</p>
				        <p className="slogan">Gaming</p>
				        <p className="description">
				          Play single / multiplayer games.  Keep track of games played, scores, and stats.  Message other players while in multiplayer games.  Have fun!
				        </p>
				      <div className="button-wrapper">
				        <Fb />
				      </div>
				    </div>
				  </div>
				</section>
				<Footer />	 
			</section>
		)
	}
}