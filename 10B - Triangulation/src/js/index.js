import * as PIXI from "pixi.js";
import Delaunator from "delaunator";

const width = 1920;
const height = 1080;

const app = new PIXI.Application(width, height, { transparent: true});
document.body.appendChild(app.view);
app.stage.interactive = true;
const container = new PIXI.Container();

const graphics = new PIXI.Graphics();

let vertices = new Array(
    0, 0,
    width, 0,
    width, height,
    0, height,
    );
    app.renderer.resize(width, height);
    
    for (let j = 0; j < 1000; j++) {
        vertices.push(Math.random()*width);
        vertices.push(Math.random()*height);
        // vertices.push(
        //     Math.random()*width,
        //     Math.random()*height
        // ])
    }
    
    console.log(vertices);
    const delaunay = new Delaunator(vertices);
    
    const coords = delaunay.triangles;
    console.log(coords);    
    for (let i = 0; i < coords.length; i+= 3) {
        graphics.beginFill(0xFF6600, (1 - (i/coords.length))*Math.random()*0.5);
        //graphics.lineStyle(1);
        graphics.moveTo(vertices[2*coords[i]], vertices[2*coords[i] + 1]);
        graphics.lineTo(vertices[2*coords[i+1]], vertices[2*coords[i+1] + 1]);
        graphics.lineTo(vertices[2*coords[i+2]], vertices[2*coords[i+2]+1]);
        graphics.endFill();
        graphics.closePath();
    }
    
    
    
app.stage.addChild(graphics);