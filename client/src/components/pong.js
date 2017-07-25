import React from 'react';
import './pong.css'
import * as actions from '../actions';
import {connect} from 'react-redux';
import CanvasMsg from './canvasMsg';

import MessageBoard from './messageBoard';

const io = require('socket.io-client');

export class Pong extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: this.props.state.name,
			inplay: false,
			player: '',
			msg: '',
			showMsg: false,
			rightScore: 0,
			leftScore: 0
		}		
		this.setInPlay	= this.setInPlay.bind(this);
		this.setPlayer = this.setPlayer.bind(this);		
		this.setMsg = this.setMsg.bind(this);
		this.rightScore = this.rightScore.bind(this);
		this.leftScore = this.leftScore.bind(this);
	}

	setInPlay(){
		this.setState({
			inplay: !this.state.inplay
		})
		console.log('Inplay State: ', this.state);
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

	rightScore(score){
		this.setState({
			rightScore: score
		})		
	}

	leftScore(score){
		this.setState({
			leftScore: score
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

	// postMessage = () => {			
	// 	let msg = document.getElementById('message-inp').value;	
	// 	alert(msg);		
	// 	//document.getElementsByClassName('group-messages')[0].innerHTML += msg;
	// 	//socket.emit('message', msg);
	// }

	componentDidMount(){
	let socket = io.connect('http://localhost:3000');	

	// Pong Game Code
	let int;	// setInterval Variable for animation.
	let frames = 60;  // To set frame rate of animation	

	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');

	const PADDLE_HEIGHT = 150;
	const PADDLE_WIDTH = 25;
	const WIN_SCORE = 200;

	let vsComp = false;		// Toggle if user needs to play against computer
	let ballC = {}; 	// Ball coordinates to send over network
	let that = this;
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
					rpaddle.score++;
					that.rightScore(rpaddle.score);	
					checkWin();
					this.reset();                                        
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
					lpaddle.score++;					
					that.leftScore(lpaddle.score);
					checkWin();					
                    this.reset();                                       
				}
			}//
			(this.y + this.r >= canvas.height || this.y - this.r <= 0) ? this.ys *= -1 : this.y = this.y;
			ballC.x = this.x;
			ballC.y = this.y;
			socket.emit('ball', ballC);
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
		if(ball.player){
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
		ball.xs = 5;
		ball.ys = 4;
	}	

	// Stop Game Animation
	function stop(){
		clearInterval(int);
	}

	// Reset Game & Scores
	function resetGame(){
		vsComp = false;
		ball.xs = 0;
		ball.ys = 0
		ball.reset();
		rpaddle.score = 0;
		lpaddle.score = 0;	
	}

	// Check for win
	function checkWin(){
		if(rpaddle.score >= WIN_SCORE || lpaddle.score >= WIN_SCORE){
			resetGame()
			alert('Game Over')
			socket.disconnect();
			console.clear();
		}
	}

	// Game AI			
	function computerMovement(){        
	    if(rpaddle.y + PADDLE_HEIGHT / 2 < ball.y - 35){            
	        rpaddle.y += 1;    
	    } else if(rpaddle.y + PADDLE_HEIGHT / 2 > ball.y + 35){
	        rpaddle.y += -5;
	    }
	    
	}	

	// Begin Animation
	start() 

	function announceState(state){	
		socket.emit('state', state);
	}
	
	// Receiv PlayersList from Server
	socket.on('list', (list) => {	
		this.setLeftPlayer(list[0])
		this.setRightPlayer(list[1])

		let playerList = document.getElementsByClassName('player-list')[0];
		playerList.innerHTML = '';

		// Append Players List on Clients
		list.forEach(function(val, ind){
			let p = document.createElement('p');
			p.innerHTML  = val;
			playerList.appendChild(p)
		});

		// Set First 2 Players in List as Opponents
		if(this.state.inplay === false && playerList.querySelectorAll('p')[0].innerHTML === this.state.name){			
			console.log('player1')					
			choosePlayerSide(0);					
		}
		else if(this.state.inplay === false && playerList.querySelectorAll('p')[1].innerHTML === this.state.name){
			console.log('player2')
			// vsComp = false;
			// resetGame();
			choosePlayerSide(1);						
		}	

		if(document.getElementsByClassName('player-list').length === 1 && this.state.inplay){
				timeMsg('Playing Computer in 3 Seconds', 3000, ['begin']);
				vsComp = true;
		} 
						
})
	
	//  Assign Right / Left Paddle to players and track mouse movements
	const choosePlayerSide = (player) =>{	 	
	 	if(player === 0){	 		
	 		console.log('choosing player 0')
	 		this.setPlayer(0);
	 		ball.player = 0;
	 		
			canvas.addEventListener('mousemove', function(e){
				let mousePos = calcMousePos(e);			
				lpaddle.y = mousePos.y - PADDLE_HEIGHT / 2;
				socket.emit('mousePos', mousePos);				
			});
			this.setInPlay();
			console.log('Pong State: ', this.state)	 			 		
	  	}
	  	else if(player === 1){
	  		console.log('choosing player 1')
	 		this.setPlayer(1);
	 		ball.player = 1;	 	
	 			 	
			canvas.addEventListener('mousemove', function(e){
				let mousePos = calcMousePos(e);			
				rpaddle.y = mousePos.y - PADDLE_HEIGHT / 2;
				socket.emit('mousePos', mousePos);					
			})	 		
	 		this.setInPlay();
	 		console.log('Pong State: ', this.state)	

	 		// Reset Game
	 		this.setMsg('ALOHA')
	 			 		
	 		socket.emit('newplayer')	 			 		
		}		
	}


//  Set & Show Messages On All Players Screens
	const timeMsg = (msg, mili, funcs)=>{
			this.setMsg(msg);
			this.setShowMsg();
			setTimeout(function(){
				this.setShowMsg();
				if(funcs){
					funcs.forEach(function(val){
						switch(val){
							case 'begin':
							beginBall();
							break;

							case 'reset':
							resetGame();
							break;
						}
					})
				}
			}.bind(this), mili)
	}



	socket.on('mousePos', (data)=>{	
		if(this.state.player === 0){
			rpaddle.y = data.y - PADDLE_HEIGHT / 2;
		}
		else if(this.state.player === 1){
			lpaddle.y = data.y - PADDLE_HEIGHT / 2;
		}
	})

	socket.on('ball', function(data){	
		ball.x = data.x;
		ball.y = data.y;
	})

	socket.on('test', (data)=>{
		console.log('SOCKET TEST DATA: ', data)
		timeMsg(data.msg, data.mili, data.func)		
	})

	socket.on('newplayer', () => {
		resetGame();
		socket.emit('test', {msg: 'Reseting', mili: 4000, func: ['begin']})	
	})

	socket.on('message', (msg) => {	
		document.getElementById('message-inp').value = '';
		let messages = document.getElementsByClassName('message');	
		if(messages.length >= 10){
			messages[0].remove();
		}	
		let name = this.state.name;			
		document.getElementById('msg').innerHTML += `<p class="message">${name}: ${msg}</p>`;
	})

	announceState(this.state);	// Declare Component State to Server and que player list
	this.socket = socket;


	postMessage = () => {			
		let msg = document.getElementById('message-inp').value;						
		socket.emit('message', msg);	
	}
}
	
	render(){

		let playerScoreClass = (this.state.player) ? 'right-score' : 'left-score';
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
				
				<p id="score">{this.state.leftScore}  {this.state.rightScore}</p>
				<input id='message-inp' />				
				<button id="btn" onClick={postMessage}>BUtton</button>
				<div id="msg"></div>
			</div>
		)						
	}
}



const mapToState = (state, props) => ({
	state: state
})

export default connect(mapToState)(Pong);