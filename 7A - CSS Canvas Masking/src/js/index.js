const img_2 = document.querySelector('.img_2');

document.onmousedown = () => {
    img_2.classList.toggle('hide');
}

const canvasElement = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const img = new Image();
const mask = new Image();
img.src = 'img/2.jpg';
mask.src = 'img/nature-sprite.png';

let i = 0;
const draw = () => {
    i++;
    ctx.clearRect(0, 0, 800, 600);
    ctx.drawImage(mask, -800*i, 0, 800*23, 600);    
    ctx.globalCompositeOperation = 'source-in';    
    ctx.drawImage(img, 0, 0, 800, 600);
    ctx.globalCompositeOperation = 'source-over';    
    setTimeout(draw, 100);
};
draw();
