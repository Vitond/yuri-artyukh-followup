import * as THREE from 'three';
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
   
for (let i = 0; i <=count; i++) {
    x = Math.sin(i)*100;
    y = Math.cos(i)*100;
    z = i*5;

    positions.push(x);
    positions.push(y);
    positions.push(z);

    colors.push(Math.random());
    colors.push(Math.random());
    colors.push(Math.random());
    //colors.push(1);
}

const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const container = document.getElementById('container');
    
    camera = new THREE.PerspectiveCamera(90, width / height);
    camera.position.z = 500;

    //const controls = new OrbitControls(camera, renderer.domElement);

    const texture = (new THREE.TextureLoader).load("img/particle.png");
    const material = new THREE.PointsMaterial({
        size: 10,
        vertexColors: THREE.VertexColors,
        map: texture,
        alphaTest: 0.5
    })

  
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    container.appendChild(renderer.domElement);
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
    for (let i = 0; i <=count ; i++) {
        x = Math.sin(i)*100;
        y = Math.cos(i)*100;
        z = -i*2 + j*2;
    
        positions.push(x);
        positions.push(y);
        positions.push(z);
    }
    position.array = new Float32Array(positions);
    position.needsUpdate = true;
    if (j%10 === 0) {
       
    }
};

init();
window.requestAnimationFrame(render);