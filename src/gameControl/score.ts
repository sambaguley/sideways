import { COLOURS, FONTS, GAME_WIDTH } from "../common/gameConstants";

import { TEXT } from "../common/gameText";

export default class Score {
  score = 0;
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  increase = (amount) => {
    this.score += amount;
  };

  draw = (): void => {
    this.ctx.fillStyle = COLOURS.white;
    this.ctx.font = FONTS.SCORE;
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `${TEXT.SCORE}: ${this.score.toString()}`,
      GAME_WIDTH / 2,
      40
    );
  };
}
