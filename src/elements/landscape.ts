import {
  COLOURS,
  GAME_HEIGHT,
  GAME_WIDTH,
  LANDSCAPE_MAX_X,
} from "../common/gameConstants";

export default class Landscape {
  landscapeBaseline = (5 * GAME_HEIGHT) / 6;
  lineWidth = 2;
  ctx = null;
  camera = null;
  numberOfStars = 100;
  stars = [];

  constructor(ctx, camera) {
    this.ctx = ctx;
    this.camera = camera;
    for (let i = 1; i < this.numberOfStars; i++) {
      // console.log("test");
      const starX = Math.random() * LANDSCAPE_MAX_X - this.camera.x;
      const starY = Math.random() * GAME_HEIGHT;
      this.stars.push([starX, starY]);
    }
  }

  mountain = (currentX, size) => {
    const mountainSideWidth = size;
    const mountainHeight = size;
    this.ctx.moveTo(currentX, this.landscapeBaseline);
    this.ctx.lineTo(
      currentX + mountainSideWidth,
      this.landscapeBaseline - mountainHeight
    );
    this.ctx.lineTo(currentX + 2 * mountainSideWidth, this.landscapeBaseline);
    this.ctx.fill();
    return currentX + size * 2;
  };

  flat = (currentX, length) => {
    const flatWidth = length;
    this.ctx.moveTo(currentX, this.landscapeBaseline);
    this.ctx.lineTo(currentX + flatWidth, this.landscapeBaseline);
    return currentX + length;
  };

  star = (starNumber) => {
    const [x, y] = this.stars[starNumber] ?? [0, 0];
    this.ctx.fillRect(x, y, 2, 2);
  };

  draw = () => {
    let currentX = 0;
    this.ctx.fillStyle = COLOURS.LANDSCAPE;
    this.ctx.strokeStyle = COLOURS.LANDSCAPE;
    this.ctx.lineWidth = this.lineWidth;
    for (let i = 1; i < this.numberOfStars; i++) {
      this.star(i);
    }
    this.ctx.fillStyle = COLOURS.BACKGROUND;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.landscapeBaseline);
    currentX = 200 - this.camera.x;
    this.ctx.lineTo(currentX, this.landscapeBaseline);
    for (let i = 0; i < 3; i++) {
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
    this.ctx.lineTo(LANDSCAPE_MAX_X, this.landscapeBaseline);
    this.ctx.fillRect(0, this.landscapeBaseline, GAME_WIDTH, GAME_HEIGHT);
    this.ctx.stroke();
  };
}
