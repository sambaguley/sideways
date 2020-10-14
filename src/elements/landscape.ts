import { ctx } from "../gameControl/gameControl";
import { COLOURS, GAME_HEIGHT, GAME_WIDTH } from "../common/gameConstants";

export default class Landscape {

  landscapeBaseline = 5 * GAME_HEIGHT / 6;
  lineWidth = 2;

  mountain = (currentX, size) => {
    const mountainSideWidth = size;
    const mountainHeight = size;
    ctx.moveTo(currentX, this.landscapeBaseline);
    ctx.lineTo(currentX + mountainSideWidth, this.landscapeBaseline - mountainHeight);
    ctx.lineTo(currentX + 2 * mountainSideWidth, this.landscapeBaseline);
    return currentX + size * 2;
  }

  flat = (currentX, length) => {
    const flatWidth = length;
    ctx.moveTo(currentX, this.landscapeBaseline);
    ctx.lineTo(currentX + flatWidth, this.landscapeBaseline);
    return currentX + length;
  }

  draw = () => {
    let currentX = 0;
    ctx.strokeStyle = COLOURS.LANDSCAPE;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.moveTo(0, this.landscapeBaseline);
    currentX = 200;
    ctx.lineTo(currentX, this.landscapeBaseline);
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
    ctx.stroke();
  };
}
