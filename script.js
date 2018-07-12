var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 1;
var dy = 1;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 100;
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
				bricks[c][r].x = brickX;
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
					dy = -dy;
					b.status = 0;
				}
			}

		}
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	collisionDetection();
	drawBricks();

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
	
}

setInterval(draw, 10);
