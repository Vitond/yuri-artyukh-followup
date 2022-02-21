const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = document.getElementById('image'); 
const mask = document.getElementById('mask');

let i = 0;

const draw = () => {
    i++;
    ctx.clearRect(0, 0, 800, 600);

    const width = 100 + i;
    const height = (100 + i) * (3 / 4);
    const yy = (600 - height)/2;
    const xx = (800-width)/2;

    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(mask, xx, yy, 100 + i, 80 + i);
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(img, 0, 0);
    window.requestAnimationFrame(draw);
}
draw();