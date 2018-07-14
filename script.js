var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;
var f;
var dx;
var dy = 1;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 200;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false; //false because at the beginning the control buttons are not pressed

var brickRowCount = 4;
var brickColumnCount = 5;
var brickWidth = 70;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 20;
var brickOffsetLeft = 15;

function counter() {
	brickRowCount + 1;
}

var w = 0;

function startRandom() {
	var first = Math.floor(Math.random() * 10);
	if(first < 5) {
		console.log(first + "dx = -1");
		dx = -1;
	} else if (first > 5) {
		console.log(first + "dx = 1");
			dx = 1; //i do not like the random here, it has only two directions
	}
} /// do not get why it doesn't work... ok now it works with dx = 1 instead of dx == 1


startRandom(); //wanted to add a function that would make the ball start in random direction

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(var r=0; r<brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1};
	}
}

//nie do końca rozumiem poniższe iterowanie po tablicach...

function drawBricks() {
	for (var c=0; c<brickColumnCount; c++) {
		for (var r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
				var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
				var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX; //what are these x and y here? not sure where they came from
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}


function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2, false);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}




document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}

function collisionDetection() {
	for(var c=0; c<brickColumnCount; c++) {
		for(var r=0; r<brickRowCount; r++) {
			var b = bricks[c][r]; //variable is storing the brick object in every loop.
			if(b.status == 1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy = -dy+0.5; //making the ball accelerate after each hit by 20%
					b.status = 0;
					w = w + 1; 
					console.log(w);
					score++;
				}
			}

		}
	}
	
}

function gameWon() {
			alert("game won");
			document.location.reload();
}

var score = 0;

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: " + score, 8, 20);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	collisionDetection();
	drawBricks();
	drawScore();

	x += dx;
	y += dy;

	if (y + dy < 0 + ballRadius){
		dy = -dy;
	}

	else if (y + dy > canvas.height - ballRadius) {

		if(x > paddleX && x < paddleX + paddleWidth && y + dy >paddleHeight) {
			dy = -dy;
		}

		else {

			alert("game over");
			document.location.reload();
		}
	}

	if (x + dx < 0 + ballRadius || x + dx > canvas.width - ballRadius) {
		dx = -dx;
	}
	

	if(rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += 5;
	}
	else if(leftPressed && paddleX > 0) {
		paddleX -= 5;
	}
	
	if(status == 1) {

	}

	if (w ==20) {
		
		setTimeout(gameWon, 500);
	}	
}

document.getElementById("btn").addEventListener("click", start);

function start() {
	zCount();
	document.getElementById("canvas").style.visibility = "visible";
	document.getElementById("btn").style.visibility = "hidden";
	setInterval(draw, 10);
	setInterval(counter, 2000); //should have worked as adding extra row every two seconds - doesn't work.
}

var z = [3, 2, 1]

function zCount(z) {
	console.log();
}
