import React from 'react';
import '../css/pong.css';
import * as actions from '../actions';
import {connect} from 'react-redux';
import CanvasMsg from './canvasMsg';
import '../css/pong.css';
import Header from './header';
import Footer from './footer';

export class Pong1 extends React.Component{
	constructor(props){
		super(props);
		
		this.state = {
			name: this.props.state.name,
			inplay: false,
			player: '',
			msg: '',
			showMsg: false,
			right_Score: 0,
			left_Score: 0,
			leftMisses: 0,
			rightMisses: 0,
			id: ''		
		}		
		this.setInPlay	= this.setInPlay.bind(this);
		this.setPlayer = this.setPlayer.bind(this);		
		this.setMsg = this.setMsg.bind(this);
		this.rightScore = this.rightScore.bind(this);
		this.leftScore = this.leftScore.bind(this);
		this.resetScore = this.resetScore.bind(this);
		this.back = this.back.bind(this);
		this.resetMisses = this.resetMisses.bind(this);
		this.rightMiss = this.rightMiss.bind(this);
		this.leftMiss = this.leftMiss.bind(this);
	}

	back(){
		this.props.history.push('/game-gallery');
	}

	setUserState(user){
		this.setState({
			name: user.name
		})
	}

	setInPlay(){
		this.setState({
			inplay: !this.state.inplay
		})		
	}

	stopInplay(){
		this.setState({
			inplay: false
		})
	}

	setPlayer(player){
		this.setState({
			player
		})
	}

	setLeftPlayer(player){
		this.setState({
			leftPlayer: player
		})
	}

	setRightPlayer(player){
		this.setState({
			rightPlayer: player
		})
	}

	rightScore(){		
		this.setState({
			right_Score: this.state.right_Score + 100
		})			
	}

	leftScore(){		
		this.setState({
			left_Score: this.state.left_Score + 100
		})			
	}

	resetScore(){
		this.setState({
			left_Score: 0,
			right_Score: 0
		})
	}

	resetMisses(){
		this.setState({
			rightMisses: 0,
			leftMisses: 0
		})
	}

	rightMiss(){
		this.setState({
			rightMisses: this.state.rightMisses + 1
		})
	}

	leftMiss(){
		this.setState({
			leftMisses: this.state.leftMisses + 1
		})
	}

	setMsg(msg){
		this.setState({
			msg			
		})
	}

	setShowMsg(){
		this.setState({
			showMsg: !this.state.showMsg
		})
	}

	componentDidMount(){
	if(!localStorage.user_info){
			this.props.history.push('/');
			alert('You Must Be Logged In To Use Site	')
	}
	else {

		var hist;
	    var histFlag;
	      
	    histFlag = false;
	    hist = setInterval(function(){
	    if(window.location.href.indexOf('pong') >= 0){
	        histFlag = true;
	    }
	    else {
	      if(histFlag){
	        console.log("RUN CODE");
	        console.log(window.location.href)
	        window.location.replace(window.location.href);
	      }
	    }
	   }, 500)

		if(localStorage.user_info && !this.props.state.name){
			console.log(this.props.state.name)
				console.log('NO NAME');
				console.log(JSON.parse(localStorage.user_info));
				this.setUserState(JSON.parse(localStorage.user_info));
				console.log(this.state)
				console.log(JSON.parse(localStorage.user_info))
		}
		this.props.dispatch(actions.login(JSON.parse(localStorage.user_info)));

		let timeOutArr = []; // hold all timeout values
		let that = this;

		window.history.pushState({page: 1}, "title 1", "");
		window.onpopstate = function(event) {  			
			window.location.replace('game-gallery');
		};	






		// Pong Game Code
		let frames = 30;  // To set frame rate of animation	

		let canvas = document.getElementById('canvas');
		let ctx = canvas.getContext('2d');

		const PADDLE_HEIGHT = 150;
		const PADDLE_WIDTH = 25;
		const WIN_SCORE = 500;
		const MISSES = 3;
		let compSpeed = 10;
		let vsComp = false;		// Toggle if user needs to play against computer
		let ballC = {}; 	// Ball coordinates to send over network
		
		// Create Ball
		let ball = {
			x: canvas.width / 2,
			y: canvas.height / 2,		
			r: 10,	// Radius
			xs: 0,	// X Speed
			ys: 0,  // Y Speed
			c: '#fff',
			score: 0,		
			move: function(){
				this.x += this.xs;
				this.y += this.ys;
				
				
				if(this.x - this.r < lpaddle.w){
					if(this.y > lpaddle.y && this.y  < lpaddle.y + lpaddle.h){
						if(Math.abs(this.xs) >= 15 || Math.abs(this.ys) >= 15){
							rpaddle.h -= 3;
						} 
						
						this.xs = this.xs < 0 ? this.xs - .4 : this.xs + .4; 
						this.ys = this.ys < 0 ? this.ys - .4 : this.ys + .4;
						
						that.leftScore(lpaddle.score);
						this.xs *= -1;
						this.ys *= -1;
	                   
	                    let deltaY = this.y; 
	                    -(lpaddle.y + PADDLE_HEIGHT / 2);
	                    this.ys = deltaY * 0.025;                                        
					}
					else {
						that.leftMiss();
						that.rightScore(rpaddle.score);
						this.reset();                 
						setTimeout(checkWin, 200)
					}
				}
				else if(this.x + this.r > canvas.width - rpaddle.w){
					if(this.y > rpaddle.y && this.y < rpaddle.y + rpaddle.h){
						if(Math.abs(this.xs) >= 15 || Math.abs(this.ys) >= 15){
							lpaddle.h -= 3;
						} 
						
						this.xs = this.xs < 0 ? this.xs - .4 : this.xs + .4; 
						this.ys = this.ys < 0 ? this.ys - .4 : this.ys + .4;
						
						
						that.rightScore(rpaddle.score); 
						this.xs *= -1;
						this.ys *= -1;
	                    
	                    let deltaY = this.y; 
	                    -(rpaddle.y + PADDLE_HEIGHT / 2);
	                    this.ys = deltaY * 0.025;                    
					}
					else {
						that.rightMiss();
						that.leftScore(lpaddle.score);
	                    this.reset();                
	                    setTimeout(checkWin, 200)
					}
				}//
				(this.y + this.r >= canvas.height || this.y - this.r <= 0) ? this.ys *= -1 : this.y = this.y;
				ballC.x = this.x;
				ballC.y = this.y;
			},
			draw: function(){
				console.log(`PH: ${PADDLE_HEIGHT}, BS: ${ball.xs}, ${ball.ys}, CS: ${compSpeed}`)
				ctx.fillStyle = this.c;
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
				ctx.fill();	
			},
			reset: function(){
				this.x = canvas.width / 2;
				this.y = canvas.height / 2;
			}
		}

		// Create Left / Right Paddles
		let lpaddle = {		
			x: 1,
			y: canvas.height / 2 - PADDLE_HEIGHT / 2,
			h: PADDLE_HEIGHT,
			w: PADDLE_WIDTH,
			score: 0,
			move: function(x, y){
				this.x = x;
				this.y = y;
			},
			draw: function(){
				ctx.fillStyle = '#fff';
				ctx.fillRect(this.x, this.y, this.w, this.h);
			}		
		}

		let rpaddle = {		
			x: canvas.width - PADDLE_WIDTH - 1,
			y: canvas.height / 2 - PADDLE_HEIGHT / 2,
			h: PADDLE_HEIGHT,
			w: PADDLE_WIDTH,
			score: 0,
			move: function(x, y){
				this.x = x;
				this.y = y;
			},
			draw: function(){
				ctx.fillStyle = '#fff';
				ctx.fillRect(this.x, this.y, this.w, this.h);
			}		
		}

		// Align mouse movements with paddle
		function calcMousePos(e){
			let rect = canvas.getBoundingClientRect();
			let root = document.documentElement;
			let mouseX = e.clientX - rect.left - root.scrollLeft;
			let mouseY = e.clientY - rect.top - root.scrollTop;
			return {
				x: mouseX,
				y: mouseY
			}
		}


		// Update Game State
		function update(){		
			if(vsComp){
				computerMovement();
				ball.move();
			}
			if(that.state.player){
				ball.move();			
			}		
		}

		// Render Functions
		function draw(){	
			clr();		
			ctx.fillStyle = '#45CDFF';
			ctx.fillRect(0, 0, canvas.width, canvas.height);		
			ball.draw();
			lpaddle.draw();
			rpaddle.draw();	
			
		}

		// Clear Screen
		function clr(){
			ctx.fillStyle = '#45CDFF';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}

		// Start Game Animation
		function start() {						
				setInterval(function(){			
					update();			
					draw();
				}, 1000/frames);
		}

		// Set Initial Ball Speed
		function beginBall(){
			ball.xs = 7;
			ball.ys = Math.floor(Math.random(2) * 8);
		}	

		// Reset Game & Scores
		function resetBall(){
			ball.xs = 0;
			ball.ys = 0;
			ball.reset();
			rpaddle.h = PADDLE_HEIGHT;
			lpaddle.h = PADDLE_HEIGHT;
		}

		// Reset Game
		const resetVsComp = () => {	
			let obj = saveScore();	
			that.props.dispatch(actions.saveScore(obj));	
			resetBall();				
			let playerList = document.getElementsByClassName('player-list')[0];
			let leftPlayer = playerList.children[0].innerHTML;
			if(playerList.children[1]){
				var rightPlayer = playerList.children[1].innerHTML;
			} else {
				rightPlayer = 'Computer';
			}
			
			timeMsg(`${this.props.state.name}: 
			${that.state.left_Score}, ${rightPlayer}: ${that.state.right_Score}`, 5000, ['begin']);
			that.resetScore();	
			that.resetMisses();
			initializeGame();			
		}

		const initializeGame = () => {		
			resetBall();
			that.resetScore();		
		}

		const findLoser = () => {
			let loser = (that.state.right_Score > that.state.left_Score) ? 1 : 0;
			return loser;
		}

		// Check for win
		function checkWin(){		
			if(that.state.rightMisses >= MISSES || that.state.leftMisses >= MISSES){			
				if(vsComp){
					resetVsComp();				
				}
				else {
					//
				}
			}
		}

		function saveScore(){

			let score = (that.state.player) ? that.state.right_Score : that.state.left_Score;
			
			let local = JSON.parse(localStorage.user_info);
			let obj = {
				email: local.email,
				name: local.name,
				game: 'pong',
				score: score
			}
			return obj;
		}

		// Game AI			
		function computerMovement(){        
		    if(rpaddle.y + PADDLE_HEIGHT / 2 < ball.y - 35){            
		        rpaddle.y += compSpeed;    
		    } else if(rpaddle.y + PADDLE_HEIGHT / 2 > ball.y + 35){
		        rpaddle.y += -compSpeed;
		    }	    
		}

		//  Set & Show Messages On All Players Screens
		const timeMsg = (msg, mili, funcs)=>{
				if(that.state.showMsg){
					that.setShowMsg();
				}
				this.setMsg(msg);
				this.setShowMsg();			
				timeOutArr.push(setTimeout(function(){
					this.setShowMsg();				
					if(funcs){
						funcs.forEach(function(val){
							switch(val){
								case 'begin':
								
								beginBall();
								break;

								case 'announce':
								announceState(that.state);
								break;

								case 'findLoser':
								let loser = findLoser();
								that.resetScore();
								if(loser === that.state.player){			
									announceState(that.state);
								}
								break;

								default:
								console.log("DEFAULT");
								
							}
						})
					}
				}.bind(this), mili));
		}

		function announceState(){
			console.log(that.state);

		}

		function getLeftMouse(e){
				let mousePos = calcMousePos(e);			
				lpaddle.y = mousePos.y - PADDLE_HEIGHT / 2;
		}

		function initialize(){
			let playerList = document.getElementsByClassName('player-list')[0];
			let p = document.createElement('p');
			p.innerHTML  = that.state.name;
			playerList.appendChild(p)

			canvas.removeEventListener('mousemove', getLeftMouse);
			canvas.addEventListener('mousemove', getLeftMouse);
			
			that.setPlayer(0);
			vsComp = true;
			start();	
			
			timeMsg('Begining Game in 5 Seconds', 5000, ['begin']);
		}

		initialize();
	}
}









render(){

		if(document.getElementsByClassName('player-list')[0]){
			let list = document.getElementsByClassName('player-list')[0];
			if(list.children.length === 1){
				var left_Player = list.children[0].innerHTML;
				var right_Player = 'Computer'
			}
			else if(list.children.length >= 2){
				left_Player = list.children[0].innerHTML;
				right_Player = list.children[1].innerHTML;
			}			
		}

		
		let msg = (this.state.showMsg) ? <CanvasMsg msg={this.state.msg}/> : undefined;		
		return(	
			<div>
				<Header />
				<div className="canvas-container">
					{msg}

					<canvas 
						width="600" 
						height="400" 
						id="canvas"  
						ref={(canvas) => { this.canvasRef = canvas; }}>
					</canvas>
					<div className="score-board">
						<div className="left-score">
							<p id="score">{this.props.state.name} <span className="left num">{this.state.left_Score}</span></p>
						</div>
						<div className="right-score">
							<p id="score">{right_Player} <span className="right num">{this.state.right_Score}</span></p>
						</div>
					</div>	
					<div className="player-list"></div>
					
					
					
				</div>
				<Footer />
			</div>
		)						
	}
}



const mapToState = (state, props) => ({
	state: state
})

export default connect(mapToState)(Pong1);