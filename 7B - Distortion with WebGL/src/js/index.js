import * as PIXI from 'pixi.js';
import gsap from 'gsap';

const renderer = new PIXI.Application({
    width: 1920, height: 600, backgroundColor: 0x000, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(renderer.view);

const container = new PIXI.Container();
renderer.stage.addChild(container);

const texture2 = PIXI.Texture.from('img/2.jpg');


const texture = PIXI.Texture.from('img/photo.jpg');
const img1 = new PIXI.Sprite(texture);
img1.width = 1920;
img1.height = 600;
img1.position.x = 0;
img1.position.y = 0;
container.addChild(img1);

const img2 = new PIXI.Sprite(texture2);
img2.width = 600;
img2.height = 400;
img2.position.x = 100;
img2.position.y = 100;
img2.alpha = 0;
//container.addChild(img2); 

const displacementSprite = PIXI.Sprite.from('img/photo.jpg');
displacementSprite.width = 1920;
displacementSprite.height = 600;
displacementSprite.position.x = 0;
displacementSprite.position.y = 0;
const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

renderer.stage.addChild(displacementSprite);
renderer.stage.filters = [displacementFilter];

document.onclick = () => {
    const timeline = new gsap.timeline();
    timeline
    .to(displacementFilter.scale, {duration: 1, y: 300, x: 20})
    //.to(displacementFilter.scale, {duration: 1, y: 1});
    
    //gsap.to(img2, {duration: 1, delay: 1, alpha: 1})
}


let i = 0;
const draw = () => {
    i++;
    renderer.render();
    window.requestAnimationFrame(draw);
};
draw();

