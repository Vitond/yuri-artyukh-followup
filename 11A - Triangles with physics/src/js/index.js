import * as PIXI from "pixi.js";
import { Ball } from './ball.js';
import Delaunator from "delaunator";

const width = 800;
const height = 600;

const app = new PIXI.Application(width, height, { transparent: true});
document.body.appendChild(app.view);
app.stage.interactive = true;
let i = 0;
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
    
    const delaunay = new Delaunator(vertices);
    
    const coords = delaunay.triangles;

    const imageSprite = PIXI.Texture.from('img/2.jpg');

    const containers = [];
    const dots = [];
    const textures = [];
    const triangles = [];
    let j = 0;
    let x;
    let y;

    for (let i = 0; i < coords.length; i+= 3) {
        containers[j] = new PIXI.Container();
        triangles[j] = new PIXI.Graphics();

        x = ((vertices[2*coords[i]]) + (vertices[2*coords[i+1]]) + (vertices[2*coords[i+2]]))/3;
        y = ((vertices[2*coords[i]+1]) + (vertices[2*coords[i+1]+1]) + (vertices[2*coords[i+2]+1]))/3;

        dots.push (
            new Ball(x,y)
        )

        triangles[j].beginFill(0xFF6600, (1 - (i/coords.length))*Math.random()*0.5);
        //triangles[j].lineStyle(1);
        triangles[j].moveTo(vertices[2*coords[i]], vertices[2*coords[i] + 1]);
        triangles[j].lineTo(vertices[2*coords[i+1]], vertices[2*coords[i+1] + 1]);
        triangles[j].lineTo(vertices[2*coords[i+2]], vertices[2*coords[i+2]+1]);
        triangles[j].endFill();
        triangles[j].closePath();
        textures[j] = new PIXI.Sprite(imageSprite);
        textures[j].width = 800;
        textures[j].height = 600;
        containers[j].addChild(triangles[j]);
        containers[j].addChild(textures[j]);
        containers[j].mask = triangles[j];
        app.stage.addChild(containers[j]);
        j++;
    }
    
    
    
app.stage.addChild(graphics);

app.ticker.add(() => {
    const mousePosition = app.renderer.plugins.interaction.mouse.global;
   
    dots.forEach((d, j) => {
        d.think(mousePosition);
        containers[j].position.x = d.diffX;
        containers[j].position.y = d.diffY;

    });
    i++;
});

