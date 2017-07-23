import React from 'react';
import './pong.css'
import * as actions from '../actions';
import {connect} from 'react-redux';
import CanvasMsg from './canvasMsg';

const io = require('socket.io-client');

//let count = 0;
export class Pong extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: this.props.state.name,
			inplay: false,
			player: '',
			msg: '',
			showMsg: false
		}		
		this.setInPlay	= this.setInPlay.bind(this);
		this.setPlayer = this.setPlayer.bind(this);
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


	timeMsg(msg, mili, func){
		this.setState({
			msg,
			showMsg: !this.state.showMsg
		})

		setTimeout(function(){
			this.setState({
				showMsg: !this.state.showMsg
			})
			if(func){
				func();	
			}
			
		}.bind(this), mili)
	}




	componentDidMount(){
	let socket = io.connect('http://localhost:3000');	

	// Pong Game Code
	let int;	// setInterval Variable for animation.
	let frames = 60;  // To set frame rate of animation

	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');

	const PADDLE_HEIGHT = 150;
	const PADDLE_WIDTH = 25;

	let vsComp = false;		// Toggle if user needs to play against computer
	
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
                    this.reset();                                       
				}
			}
			(this.y + this.r >= canvas.height || this.y - this.r <= 0) ? this.ys *= -1 : this.y = this.y;			
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
		}
		ball.move();
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
		rpaddle.score = 0;
		lpaddle.score = 0;	
	}

	// Game AI			
	function computerMovement(){        
	    if(rpaddle.y + PADDLE_HEIGHT / 2 < ball.y - 35){            
	        rpaddle.y += 15;    
	    } else if(rpaddle.y + PADDLE_HEIGHT / 2 > ball.y + 35){
	        rpaddle.y += -15;
	    }
	    
	}	

	// Begin Animation
	start() 




	function announceState(state){	
		socket.emit('state', state);
	}
	

	socket.on('list', (list) => {
	console.log('Receiving List From Server');
	let playerList = document.getElementsByClassName('player-list')[0];
	playerList.innerHTML = '';
	list.forEach(function(val, ind){
		let p = document.createElement('p');
		p.innerHTML  = val;
		playerList.appendChild(p)
	});

		if(this.state.inplay === false && playerList.querySelectorAll('p')[0].innerHTML === this.state.name){			
			console.log('player1')
			
			playerList.querySelectorAll('p');
			choosePlayerSide(0);
			if(playerList.querySelectorAll('p').length === 1){
				//vsComp = true;
				let msg = `Begin Playing Computer`
				
				this.timeMsg(msg, 3000, beginBall)
				
			}
		}
		else if(this.state.inplay === false && playerList.querySelectorAll('p')[1].innerHTML === this.state.name){
			console.log('player2')
			choosePlayerSide(1);
			socket.emit('challenge');
			//stop();
			//resetGame();
			//this.timeMsg('New Challenger.  BEGIN!', 3000, beginBall)
		}					
})
	
	const choosePlayerSide = (player) =>{	 	
	 	if(player === 0){	 		
	 		console.log('choosing player 0')
	 		this.setPlayer(0);
	 		//console.log(this.props);
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
	 		
			canvas.addEventListener('mousemove', function(e){
				let mousePos = calcMousePos(e);			
				rpaddle.y = mousePos.y - PADDLE_HEIGHT / 2;
				socket.emit('mousePos', mousePos);				
			})	 		
	 		this.setInPlay();
	 		console.log('Pong State: ', this.state)			
		}		
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

const newChallenger = ()=> {
	console.log('NEW CHALLENGER!!!!!!!!!!')
	console.log('NEW CHALLENGER!!!!!!!!!!')
	console.log('NEW CHALLENGER!!!!!!!!!!')
	stop();
	resetGame();
	vsComp = false;
	this.timeMsg('New Challenger.  BEGIN!', 3000, beginBall)
}

socket.on('challenge', function(){
	newChallenger();
})

announceState(this.state);	// Declare Component State to Server and que player list

}


	
	render(){
		
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
				<div className="player-list"></div>
			</div>
		)						
	}
}



const mapToState = (state, props) => ({
	state: state
})

export default connect(mapToState)(Pong);