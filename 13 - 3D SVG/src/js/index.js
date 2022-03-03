import * as THREE from 'three';
import {gsap} from 'gsap';
import {OrbitControls} from '../../node_modules/three/examples/jsm/controls/OrbitControls';

let renderer;
let scene;
let camera;
let geometry = new THREE.BufferGeometry();
let positions = [];
let colors = [];
let x, y, z;

let width = 1920;
let height = 1080;

const count = 100000;

const size = 100;
const tempCanvas = document.createElement('canvas');
const ctx = tempCanvas.getContext('2d');
tempCanvas.width = size;
tempCanvas.height = size;

let imageCoords = [];
let coordsArray = [];
let state0;
let state1;

let randomValuesArray = [];
let randomValuesArray2 = [];
let randomValuesArray3 = [];
for (let i = 0; i < 20000; i++) {
    randomValuesArray.push(Math.random());
    randomValuesArray2.push(Math.random());
    randomValuesArray3.push(Math.random());
}

let srcs = ['img/arrow.svg', 'img/close.svg', 'img/place.svg', 'img/logo.svg'];
let activeImageId = 0;

const loadImages = (paths, whenLoaded) => {
    const imgs=[];
    paths.forEach(function(path){
      var img = new Image;
      img.onload = function(){
        imgs.push(img);
        if (imgs.length==paths.length) whenLoaded(imgs);
      }
      img.src = path;
    });
}

const fillUp = (array, max) => {
    console.log(array.length);
    const length = array.length;
    console.log(max - array.length);
    for (let i = 0; i < (max - length); i++) {
        array.push(array[Math.floor(Math.random()*length)])
    }
    console.log(array.length);
    return array;
};

loadImages(srcs, (images) => {
    
    images.forEach((im) => {
        coordsArray.push(fillUp(getArrayFromImage(im), 20000));
    })
    console.log(coordsArray);
    imageCoords = fillUp(getArrayFromImage(images[0]), 20000);
    init();
    window.requestAnimationFrame(render);
});   


const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const container = document.getElementById('container');
    
    camera = new THREE.PerspectiveCamera(90, width / height);
    camera.position.z = 500;

    const controls = new OrbitControls(camera, renderer.domElement);

    const texture = (new THREE.TextureLoader).load("img/particle.png");
    const material = new THREE.PointsMaterial({
        size: 10,
        vertexColors: THREE.VertexColors,
        map: texture,
        alphaTest: 0.5
    })

    console.log(imageCoords)
    for (let i = 0; i < imageCoords.length; i++) {
        //x = Math.sin(i)*100;
        //y = Math.cos(i)*100;
       
        x = imageCoords[i][0];
        y = imageCoords[i][1];
        z = Math.random()*1000;srcs = ['img/arrow.svg'];

    
        positions.push(x);
        positions.push(y);
        positions.push(z);
    
        colors.push(Math.random());
        colors.push(Math.random());
        colors.push(Math.random());
        //colors.push(1);
    }

  
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    container.appendChild(renderer.domElement);
};

const getArrayFromImage = (img) => {
    const imageCoords = [];
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    let data = ctx.getImageData(0, 0, size, size);

    for (let y = 0; y < data.height; y++) {
        for (let x = 0; x < data.width; x++) {
            const r = data.data[(y*data.height + x)*4]
            const g = data.data[(y*data.height + x)*4 + 1]
            const b = data.data[(y*data.height + x)*4 + 2]
            const a = data.data[(y*data.height + x)*4 + 3]
            if (a > 0) {
                imageCoords.push([10*(x-size/2),10*(-(y-size/2))]);            
            }
        }
    }
    return imageCoords;
};

let j = 0;
const render = () => {
    j++;
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
    let position = geometry.getAttribute('position');
    // position.array = position.array.map((n, i) => {
    //     return positions[i];
    // });
    let positions = [];
    // for (let i = 0; i <=count ; i++) {
    //     x = Math.sin(i)*100;
    //     y = Math.cos(i)*100;
    //     z = -i*2 + j*2;
    
    //     positions.push(x);
    //     positions.push(y);
    //     positions.push(z);
    // }
    for (let i = 0; i < imageCoords.length; i++) {       
        x = imageCoords[i][0]+Math.sin(j/20*randomValuesArray2[i])*randomValuesArray3[i]*4;
        y = imageCoords[i][1];
        z = randomValuesArray[i]*90;
    
        positions.push(x);
        positions.push(y);
        positions.push(z);
    }
    position.array = new Float32Array(positions);
    position.needsUpdate = true;
    if (j%10 === 0) {
       
    }
};

let counter = 0;
document.addEventListener('mousedown', () => {
    const id = (counter + 1)%coordsArray.length;
    const state1 = coordsArray[id];
    for (let i = 0; i < imageCoords.length; i++) {
        const tl = new gsap.timeline();
        tl.to(imageCoords[i], 2, [state1[i][0], state1[i][1]])
    }
    counter++;
});