import { COLOURS, FONTS, STARTING_LIVES } from "../common/gameConstants";

import { TEXT } from "../common/gameText";

export default class Lives {
  lives = STARTING_LIVES;
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  decrease = () => {
    this.lives -= 1;
  };

  draw = (): void => {
    this.ctx.fillStyle = COLOURS.white;
    this.ctx.font = FONTS.LIVES;
    this.ctx.textAlign = "left";
    this.ctx.fillText(`${TEXT.LIVES}: ${this.lives.toString()}`, 20, 40);
  };
}
