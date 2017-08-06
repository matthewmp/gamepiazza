import React from 'react';
import './pong.css';
import * as actions from '../actions';
import {connect} from 'react-redux';
import CanvasMsg from './canvasMsg';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import MessageBoard from './messageBoard';

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
			id: ''		
		}		
		this.setInPlay	= this.setInPlay.bind(this);
		this.setPlayer = this.setPlayer.bind(this);		
		this.setMsg = this.setMsg.bind(this);
		this.rightScore = this.rightScore.bind(this);
		this.leftScore = this.leftScore.bind(this);
		this.resetScore = this.resetScore.bind(this);
		this.back = this.back.bind(this);
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
			right_Score: this.state.right_Score + 1
		})			
	}

	leftScore(){		
		this.setState({
			left_Score: this.state.left_Score + 1
		})			
	}

	resetScore(){
		this.setState({
			left_Score: 0,
			right_Score: 0
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

	if(localStorage.user_info && !this.props.state.name){
		console.log(this.props.state.name)
			console.log('NO NAME');
			console.log(JSON.parse(localStorage.user_info));
			this.setUserState(JSON.parse(localStorage.user_info));
			console.log(this.state)
			console.log(JSON.parse(localStorage.user_info))
	}
	this.props.dispatch(actions.login(JSON.parse(localStorage.user_info)));

	let timeOut;  // for timeout values
	let timeOutArr = []; // hold all timeout values
	let that = this;

	window.history.pushState({page: 1}, "title 1", "");
	window.onpopstate = function(event) {  			
		window.location.replace('game-gallery');
	};	






	// Pong Game Code
	let int;	// setInterval Variable for animation.
	let frames = 30;  // To set frame rate of animation	

	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');

	const PADDLE_HEIGHT = 150;
	const PADDLE_WIDTH = 25;
	const WIN_SCORE = 3;

	let vsComp = false;		// Toggle if user needs to play against computer
	let ballC = {}; 	// Ball coordinates to send over network
	
	// Create Ball
	let ball = {
		x: canvas.width / 2,
		y: canvas.height / 2,		
		r: 10,	// Radius
		xs: 0,	// X Speed
		ys: 0,  // Y Speed
		c: '#ff0000',
		score: 0,		
		move: function(){
			this.x += this.xs;
			this.y += this.ys;
			
			
			if(this.x - this.r < lpaddle.w){
				if(this.y > lpaddle.y && this.y  < lpaddle.y + lpaddle.h){
					this.xs *= -1;
					this.ys *= -1;
                    
                    let deltaY = this.y; 
                    -(lpaddle.y + PADDLE_HEIGHT / 2);
                    this.ys = deltaY * 0.025;                                        
				}
				else {
					
					that.rightScore(rpaddle.score);
					this.reset();                 
					setTimeout(checkWin, 500)         
				}
			}
			else if(this.x + this.r > canvas.width - rpaddle.w){
				if(this.y > rpaddle.y && this.y < rpaddle.y + rpaddle.h){
					this.xs *= -1;
					this.ys *= -1;
                    
                    let deltaY = this.y; 
                    -(rpaddle.y + PADDLE_HEIGHT / 2);
                    this.ys = deltaY * 0.025;                    
				}
				else {
					that.leftScore(lpaddle.score);
                    this.reset();                
                    setTimeout(checkWin, 500)                       
				}
			}//
			(this.y + this.r >= canvas.height || this.y - this.r <= 0) ? this.ys *= -1 : this.y = this.y;
			ballC.x = this.x;
			ballC.y = this.y;
		},
		draw: function(){
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
		h: PADDLE_HEIGHT - 60,
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
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);		
		ball.draw();
		lpaddle.draw();
		rpaddle.draw();	
		
	}

	// Clear Screen
	function clr(){
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	// Start Game Animation
	function start() {						
			int = setInterval(function(){			
			update();			
			draw();
			}, 1000/frames);
	}

	// Set Initial Ball Speed
	function beginBall(){
		ball.xs = -10;
		ball.ys = 6;
	}	

	// Stop Game Animation
	function stop(){		
		clearInterval(int);
	}

	// Reset Game & Scores
	function resetBall(){
		ball.xs = 0;
		ball.ys = 0;
		ball.reset();
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
			var rightPlayer = 'Computer';
		}
		
		timeMsg(`FINAL SCORE: ${leftPlayer}: ${that.state.left_Score}, ${rightPlayer}: ${that.state.right_Score}`, 5000, ['begin']);
		that.resetScore();	
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
		if(that.state.right_Score >= WIN_SCORE || that.state.left_Score >= WIN_SCORE){			
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
	        rpaddle.y += 1;    
	    } else if(rpaddle.y + PADDLE_HEIGHT / 2 > ball.y + 35){
	        rpaddle.y += -1;
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
		beginBall();
	}

	initialize();
	

}









render(){

		let playerScoreClass = (this.state.player) ? 'right-score' : 'left-score';
		if(document.getElementsByClassName('player-list')[0]){
			let list = document.getElementsByClassName('player-list')[0];
			if(list.children.length === 1){
				var left_Player = list.children[0].innerHTML;
				var right_Player = 'Computer'
			}
			else if(list.children.length >= 2){
				var left_Player = list.children[0].innerHTML;
				var right_Player = list.children[1].innerHTML;
			}			
		}

		
		let msg = (this.state.showMsg) ? <CanvasMsg msg={this.state.msg}/> : undefined;		
		return(	

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
						{this.state.leftPlayer}
					</div>
					<div className="right-score">
						{this.state.rightPlayer}
					</div>
				</div>	
				<div className="player-list"></div>
				
				<p id="score">{left_Player} {this.state.left_Score}  {right_Player} {this.state.right_Score}</p>
				
			</div>
		)						
	}
}



const mapToState = (state, props) => ({
	state: state
})

export default connect(mapToState)(Pong1);