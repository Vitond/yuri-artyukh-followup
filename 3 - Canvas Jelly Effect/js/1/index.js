import Mouse from './mouse.js';
import Ball from './ball.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const pos = new Mouse(canvas);
let mouse = new Ball(0, 0, 30, 'green');

let balls = [];

for (var i = 0; i < 3000; i++) {
    balls.push(new Ball(canvas.width/2 + canvas.width/8*Math.cos(i*Math.PI/1000), canvas.height / 2 + canvas.width/8*Math.sin(i*Math.PI/1000)))
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
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mouse.setPos(pos.x, pos.y);
    mouse.draw(ctx);
    balls.forEach((ball) => {
        ball.think(pos);
        ball.draw(ctx);
    });
    connectDots(balls);

    window.requestAnimationFrame(render);
}
render();