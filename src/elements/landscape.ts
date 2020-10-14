import { COLOURS, GAME_HEIGHT } from "../common/gameConstants";

export default class Landscape {
  landscapeBaseline = 5 * GAME_HEIGHT / 6;
  lineWidth = 2;
  ctx = null;
  camera = null;

  constructor(ctx, camera) {
    this.ctx = ctx;
    this.camera = camera;
  }

  mountain = (currentX, size) => {
    const mountainSideWidth = size;
    const mountainHeight = size;
    this.ctx.moveTo(currentX, this.landscapeBaseline);
    this.ctx.lineTo(currentX + mountainSideWidth, this.landscapeBaseline - mountainHeight);
    this.ctx.lineTo(currentX + 2 * mountainSideWidth, this.landscapeBaseline);
    return currentX + size * 2;
  }

  flat = (currentX, length) => {
    const flatWidth = length;
    this.ctx.moveTo(currentX, this.landscapeBaseline);
    this.ctx.lineTo(currentX + flatWidth, this.landscapeBaseline);
    return currentX + length;
  }

  draw = () => {
    let currentX = 0;
    this.ctx.strokeStyle = COLOURS.LANDSCAPE;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(-this.camera.x, this.landscapeBaseline);
    currentX = 200 -this.camera.x;
    this.ctx.lineTo(currentX, this.landscapeBaseline);
    for(let i = 0; i < 3; i++) {
      currentX = this.mountain(currentX, 50);
      currentX = this.flat(currentX, 30);
      currentX = this.mountain(currentX, 70);
      currentX = this.flat(currentX, 30);
      currentX = this.mountain(currentX, 20);
      currentX = this.mountain(currentX, 20);
      currentX = this.flat(currentX, 120);
      currentX = this.mountain(currentX, 10);
      currentX = this.mountain(currentX, 10);
      currentX = this.mountain(currentX, 10);
      currentX = this.flat(currentX, 100);
      currentX = this.mountain(currentX, 100);
    }
    this.ctx.stroke();
  };
}
