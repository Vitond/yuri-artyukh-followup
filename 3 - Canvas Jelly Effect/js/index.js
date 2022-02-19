import Mouse from './mouse.js';
import Ball from './ball.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const pos = new Mouse(canvas);
let mouse = new Ball(0, 0, 30, 'green');

let balls = [];

const ballCount = 1000;

const colorFill = 'transparent';
const colorBG = '#132061';

const radius = canvas.width / 10;


for (var i = 0; i < ballCount; i++) {
    balls.push(new Ball(canvas.width/2 + radius*Math.cos(2*Math.PI*i/ballCount), canvas.height/2 + radius*Math.sin(2*Math.PI*i/ballCount)))
}

const connectDots = balls => {
    ctx.beginPath();
    ctx.moveTo(balls[0].x, balls[0].y);
    balls.forEach(ball => {
        ctx.lineTo(ball.x, ball.y);
    });
    ctx.closePath();
    ctx.fill();
}

const render = () => {
    ctx.fillStyle = colorBG;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = colorFill;
    mouse.setPos(pos.x, pos.y);
    balls.forEach((ball) => {
        ball.think(pos);
        ball.draw(ctx);
    });
    connectDots(balls);

    window.requestAnimationFrame(render);
}
render();