import Perlin from './perlin'
import Particle from './particle'

function createArray(length) {
    var arr = new Array(length || 0),
      i = length;
  
    if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);
      while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }
  
    return arr;
}

let width = 600;
let height = 600;
let cols = 30;
let rows = 30;
let number = 100;

let gwidth = width / cols;
let gheight = height / cols;

let flowfield = createArray(rows, cols);

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = width;
canvas.height = height;

document.body.appendChild(canvas);

const sky = document.getElementById('sky');
const swallow = document.getElementById('swallow');

let particles = [];
for (let i = 0; i < number; i++) {
    particles.push(new Particle(Math.random()*width, Math.random()*height, 0, 0))
}

let opts = {
    width: width,
    height: height,
    gwidth: gwidth,
    gheight: gheight,
    cols: cols,
    rows: rows
}

const audio = new Audio();
audio.controls = true;
//audio.autoplay = true;
audio.src = "img/blue.mp3"
document.body.appendChild(audio);

const context = new AudioContext();
const analyser = context.createAnalyser();
analyser.fftSize = 128;
const frequencyData = new Uint8Array(analyser.frequencyBinCount);

window.onload = () => {
    const source = context.createMediaElementSource(audio);
    source.connect(analyser)
    analyser.connect(context.destination)
};

const render = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(sky, 0, 0, 1920, 1275);
    analyser.getByteFrequencyData(frequencyData);
    const avg = frequencyData.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    })/64
    ctx.fillColor = '#FF0000';
    ctx.fillRect(0, 0, 10, avg);
    for (let i = 0 ; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
            // ctx.fillStyle = '#000'
            // ctx.fillRect(i*gwidth, j*gheight, gwidth - 1, gheight - 1)
            let flow = Perlin(i/200, j/200, t/800)
            let alpha = 4*Math.PI*flow
            ctx.beginPath();
            const posx = 10*Math.cos(alpha)
            const posy = 10*Math.sin(alpha)
            flowfield[i][j] = [posx*avg/60, posy*avg/60]
            ctx.moveTo(i*gwidth, j*gheight)
            ctx.lineTo(i*gwidth + posx, j*gheight + posy)
            ctx.closePath();
            ctx.stroke();
            // ctx.fillStyle = '#FFF'
            // ctx.fillText(flow, i*gwidth, j*gheight);

        }   
    }
    particles.forEach(p => {
        p.wind(flowfield, opts);
        p.move(opts);
        p.draw(ctx, swallow);
    })
}

let t = 0;

const draw = () => {
    render();
    t++;
    window.requestAnimationFrame(draw);
};

draw();