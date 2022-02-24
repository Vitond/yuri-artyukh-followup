import cfg from './cfg';

export  class Ball {
  constructor(x, y, radius, color) {
    this.x = x || 0;
    this.y = y || 0;
    this.i = 0;

    this.originalX = x || 0;
    this.originalY = y || 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius || 2;
    this.color = color || '#ff6600';
    // this.friction = 0.7;
    // this.springFactor = 0.1;
    this.diffX = 0;
    this.diffY = 0;
  }
  setPos(x,y) {
    this.x = x;
    this.y = y;
  }
  think(mouse) {
    let dx = this.x - mouse.x;
    let dy = this.y - mouse.y;

    // if (this.i%10 === 0) {
    //     console.log(dx);
    // }

    let dist = Math.sqrt(dx*dx + dy*dy);
    // interaction
    if(dist<100) {
      let angle = Math.atan2(dy,dx);
      let tx = mouse.x + Math.cos(angle) * 100;
      let ty = mouse.y + Math.sin(angle) * 100;

      this.vx += tx - this.x;
      this.vy += ty - this.y;
    }

    // spring back
    let dx1 = -(this.x - this.originalX);
    let dy1 = -(this.y - this.originalY);

    this.vx += dx1 * cfg.springFactor;
    this.vy += dy1 * cfg.springFactor;

        
    // friction
    this.vx *= cfg.friction;
    this.vy *= cfg.friction;

    // actual move
    this.x += this.vx;
    this.y += this.vy;

    this.diffX = this.x - this.originalX;
    this.diffY = this.y - this.originalY;
    this.i++;
  }


}
