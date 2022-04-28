import perlin from './perlin';

console.log(perlin(0, 1, 0));

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`

const count = 700;
const radius = 100;

let c = 0;
const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillRect(0, 0, 100, 100);
    

    for (let j = 0; j < 50; j++) {
        ctx.beginPath();
        for (let i = 0; i < 800 ; i++) {
            ctx.lineTo(i, j*10 + 100*perlin(10*i/canvas.width, j/10 + c/50, 0))
        }
        ctx.stroke();
    }
}   

const render = () => {
    draw();
    c++;
    window.requestAnimationFrame(render)
}
render()