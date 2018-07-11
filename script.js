var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x = 0;
var y = 0;
var dx = 1;
var dy = 1;
var ballRadius = 10;

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2, false);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	x += dx;
	y += dy;
	if (y + dy < 0 || y + dy > canvas.height ){
		dy = -dy;
	}

	if (x + dx < 0 || x + dx > canvas.width) {
		dx = -dx;
	}
}
setInterval(draw, 10);