import GSAP from 'gsap';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const newCanvas = document.createElement('canvas');
const newCtx = newCanvas.getContext('2d');
document.body.prepend(newCanvas);

const image1 = document.getElementById('image1');

const cols = 10;
const rows = 10;
const width = 1800 / cols;
const height = 1200 / rows;

document.addEventListener('click', () => {
    if (obj.pos === 0) {
        tl.to(obj, {pos: 2, duration: 1}) 
    } else {
        tl.to(obj, {pos: 0, duration: 1}) 
    }
})

const validatePos = pos => {
    if (pos < 0) {
        pos = 0;
    }
    if (pos > 1) {
        pos = 1;
    }
    return pos;
}

const startTime = new Date();

const renderTempCanvas = (t) => {
    newCtx.clearRect(0, 0, 1800, 1200);
    //newCtx.fillRect(0, 0, 1800, 1200);
    newCtx.drawImage(image2, 0, 0);
    //newCtx.clearRect(0, 0, t*100, t*100);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            delay = j*i/(cols*rows);
            newCtx.clearRect(i*width, j*height, validatePos(obj.pos - delay)*width, validatePos(obj.pos-delay)*height);
        }
    }
};

let delay;

const render = (t) => {
    ctx.clearRect(0, 0, 1800, 1200);
    ctx.drawImage(image1, 0, 0);
    ctx.drawImage(newCanvas, 0, 0);
    renderTempCanvas(t);
};

const setCanvasSize = canvas => {
    canvas.width = "1800";
    canvas.height = "1200";
    canvas.style.width = "900px";
    canvas.style.height = "600px";
};

setCanvasSize(newCanvas);
setCanvasSize(canvas);

const tl = new GSAP.timeline();
const obj = {pos: 0};

const draw = () => {
    const thisTime = new Date();
    const timeDiff = thisTime - startTime;
    const t = timeDiff / 1000;
    render(t);
    window.requestAnimationFrame(draw);
};

draw();