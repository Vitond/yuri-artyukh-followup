import Mouse from './mouse.js';
import Ball from './ball.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const pos = new Mouse(canvas);
let mouse = new Ball(0, 0, 30, 'green');

let balls = [];

const ballCount = 3000

const colorFill = '#b5c1ff';
const colorBG = '#132061';

const radius = canvas.width / 10;


for (var i = 0; i < ballCount; i++) {
    balls.push(new Ball(canvas.width/2 + radius*Math.cos(i*2*Math.PI/ballCount), canvas.height / 2 + radius*Math.sin(i*2*Math.PI/ballCount)))
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
    ctx.fillRect(0, 0, canvas.width, canvas.height)
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