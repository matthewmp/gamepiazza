var socket = io.connect('http://localhost:3000');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let int;
let frames = 60;


	const PADDLE_HEIGHT = 150;
	const PADDLE_WIDTH = 25;
	let ballC = {};
	// Create Ball
	let ball = {
		x: canvas.width / 2,
		y: canvas.height / 2,		
		r: 10,	// Radius
		xs: 0,	// X Speed
		ys: 0,  // Y Speed
		c: '#ff0000',
		move: function(){
			this.x += this.xs;
			this.y += this.ys;
			
			

			if(this.x - this.r < lpaddle.w){
				if(this.y > lpaddle.y && this.y  < lpaddle.y + lpaddle.h){
					this.xs *= -1;
					this.ys *= -1;					
				}
				else {
					this.reset();
				}
			}
			else if(this.x + this.r > canvas.width - rpaddle.w){
				if(this.y > rpaddle.y && this.y < rpaddle.y + rpaddle.h){
					this.xs *= -1;
					this.ys *= -1;					
				}
				else {
					this.reset();
				}
			}
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

	// Create new Paddles
	let  lpaddle = {
		
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

	let  rpaddle = {
		
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


	// Update State
	function update(){
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
		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	// Start Game Animation
	function start() {
			int = setInterval(function(){
			update();
			draw();
			}, 1000/frames);
		}			

		start();

	function choosePlayerSide(player){
		if(player === 0){
			state.player = 0;
			canvas.addEventListener('mousemove', function(e){
				let mousePos = calcMousePos(e);			
				lpaddle.y = mousePos.y - PADDLE_HEIGHT / 2;
				socket.emit('mousePos', mousePos);				
			});
			state.inplay = true;
		}
		else if(player === 1){
			state.player = 1;
			canvas.addEventListener('mousemove', function(e){
				let mousePos = calcMousePos(e);			
				rpaddle.y = mousePos.y - PADDLE_HEIGHT / 2;
				socket.emit('mousePos', mousePos);				
			})

			state.inplay = true;

			ball.xs = 5;
			ball.ys = 4;
		}
		
	}

				
				



socket.on('mousePos', function(data){
	if(state.player === 0){
		rpaddle.y = data.y - PADDLE_HEIGHT / 2;
	}
	else if(state.player == 1){
		lpaddle.y = data.y- PADDLE_HEIGHT / 2;
	}
})

socket.on('ball', function(data){	
	ball.x = data.x;
	ball.y = data.y;
})


function announceState(state){
	socket.emit('state', state);
}


socket.on('list', function(list){
	console.log(list)
	let playerList = document.getElementById('player-list');
	list.forEach(function(val, ind){
		let p = document.createElement('p');
		p.innerHTML  = val;
		playerList.appendChild(p)
	});

		if(state.inplay === false && playerList.querySelectorAll('p')[0].innerHTML === state.username){
			console.log('player1')
			choosePlayerSide(0);
		}
		else if(state.inplay === false && playerList.querySelectorAll('p')[1].innerHTML === state.username){
			console.log('player2')
			choosePlayerSide(1);
		}	
})


document.getElementById('btn').addEventListener('click', function(){
		state = {
			username: document.getElementById('user').value,
			id: Math.floor(Math.random(100) * 99999),
			email: document.getElementById('user').value + '@gmail.com',
			inplay: false
		}
		console.log(state);
		announceState(state);
	})