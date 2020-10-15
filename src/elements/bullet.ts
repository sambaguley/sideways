import { COLOURS, DIRECTION } from "../common/gameConstants";

export default class Bullet {
  lineWidth = 2;
  x = null;
  y = null;
  width = 100;
  height = 10;
  speed = 15;
  active = false;
  direction = DIRECTION.Right;
  ctx = null;
  camera = null;

  constructor (ctx, camera) {
    this.ctx = ctx;
    this.camera = camera;
  }

  draw = () => {
    this.ctx.strokeStyle = COLOURS.BULLET;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x -this.camera.x, this.y);
    this.ctx.lineTo(this.x + this.width -this.camera.x, this.y);
    this.ctx.stroke();
  };

  shoot = (x, y, direction) => {
    this.active = true;
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  move = () => {
    if(this.active) {
        if(this.direction === DIRECTION.Right) {
            this.x = this.x + this.speed;
        } else {
            this.x = this.x - this.speed;
        }
    }
  }
}
