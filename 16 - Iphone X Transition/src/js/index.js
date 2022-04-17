import { Timeline } from "gsap/gsap-core";
import gsap from "gsap";
import ScrollMagic from "scrollmagic";
import { ScrollMagicPluginIndicator, ScrollMagicPluginGsap} from "scrollmagic-plugins";
import { Tween } from "gsap/gsap-core";
ScrollMagicPluginIndicator(ScrollMagic);
ScrollMagicPluginGsap(ScrollMagic, Tween, Timeline);
const canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
let height = window.innerHeight;
let width = window.innerWidth;

canvas.width = width;
canvas.height = height;

let path = '-42.7,-50,-21,-50,0,-15.4,21,-50,42.7,-50,10.9,-1,44,50,22.3,50,0,13.4,-22.3,50,-44,50,-10.9,-1'.split(/\ |,/).map(function(H) {
    return parseFloat(H);
});
  

const animation = document.getElementById("animation");
animation.appendChild(canvas);

const draw = (state) => {
    ctx.globalCompositeOperation = 'source-over';
    const scale = state.value;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle='black';
    ctx.beginPath();
    ctx.moveTo(path[0]*scale + width / 2, path[1]*scale + height / 2);
    for (let i = 2; i < path.length; i+=2) {
        ctx.lineTo(path[i]*scale + width / 2, path[i+1]*scale + height / 2);
    }
    ctx.closePath();
    ctx.fill();
};
const tl = new gsap.timeline();
let state = { value: 0 };

tl.to(state, 1, {
    value: 36,
    onUpdate: () => {
        draw(state);
    },
});

const iPhone = document.getElementById('iphone');

tl.to(iPhone, { scale: 0.5}, 0);

const controller = new ScrollMagic.Controller();
const scene = new ScrollMagic.Scene({
    duration: 1000,
    offset: 0,
    triggerElement: '#trigger',
    triggerHook: 0
})
scene.addIndicators({name: 'Blo'})
scene.setPin('.animation');
scene.setTween(tl);
controller.addScene(scene);

const scene1 = new ScrollMagic.Scene({
    duration: 0,
    offset: 44,
    triggerElement: '#trigger',
    triggerHook: 0
})
scene1.addIndicators({name: 'Sub'})
scene1.setPin('.subheader');
scene1.addTo(controller);

let tl2 = new gsap.timeline();
tl2.to('.iphone', {y: -100})

const scene2 = new ScrollMagic.Scene({
    duration: 800,
    offset: 1000,
    triggerElement: '#trigger',
    triggerHook: 0
})
controller.addScene(scene2);
scene2.addIndicators('Iphone flies away')
scene2.setTween(tl2);