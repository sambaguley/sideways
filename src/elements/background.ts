import { ctx } from "../gameControl/gameControl";

import {
  GAME_WIDTH,
  GAME_HEIGHT,
  COLOURS,
  VERSION_NUMBER,
  FONTS,
} from "../common/gameConstants";

export const clearCanvas = () => {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
};

export const drawVersionNumber = (): void => {
  ctx.fillStyle = COLOURS.white;
  ctx.font = FONTS.SMALL;
  ctx.textAlign = "left";
  ctx.fillText(`Version: ${VERSION_NUMBER}`, GAME_WIDTH - 75, GAME_HEIGHT - 10);
};

export const drawBackground = (): void => {
  ctx.fillStyle = COLOURS.BACKGROUND;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
};
