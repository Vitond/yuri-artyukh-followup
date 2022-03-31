import { Timeline } from 'gsap/gsap-core';
import { makeNoise2D } from 'fast-simplex-noise';

//CANVAS WITHOUT PERLIN NOISE

const width = 1920;
const height = 1080;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = width;
canvas.height = height;
canvas.style.width = `${width} px`;
canvas.style.height = `${height} px`;

const currentState = [0, 100, 200, 300, 500, 300, 220]
const states = [
    [0, 100, 200, 300, 500, 300, 220], 
    ([0, 100, 200, 300, 500, 300, 220]).reverse()
]

const drawLines = (state, ctx) => {
    ctx.beginPath();
    ctx.moveTo(0, state[0]);
    for (let i = 0; i < state.length; i++) {
        ctx.lineTo(i*width/(state.length-1), state[i]);
    }
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
};

const tl = new Timeline();

let c = 0;
const loop = () => {
    const id = (c + 1)%states.length;
    tl.to(currentState, 1, {endArray: states[id]})
    c++;
    setTimeout(loop, 1000);
};

const draw = () => {
    ctx.clearRect(0, 0, width, height);
    drawLines(currentState, ctx);
    window.requestAnimationFrame(draw);
};

loop();
window.requestAnimationFrame(draw);

//CANVAS WITH PERLIN NOISE
const canvas1 = document.getElementById('canvas1');
let currentState1 = [0, 100, 200, 300, 500, 300, 220]

canvas1.width = width;
canvas1.height = height;
canvas1.style.width = `${width} px`;
canvas1.style.height = `${height} px`;

let t = 0;

const noiseGen = makeNoise2D(Math.random)

const draw1 = () => {
    ctx1.clearRect(0, 0, width, height);
    currentState1 = [];
    for (let i = 0; i < 1200; i++) {
        currentState1.push(
            noiseGen(i/100, t/400)*40 + 100
        )
    }
    drawLines(currentState1, ctx1);
    window.requestAnimationFrame(draw1);
    t++;
};
window.requestAnimationFrame(draw1);

const ctx1 = canvas1.getContext('2d');

//34:18