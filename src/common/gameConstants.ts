export const VERSION_NUMBER: string = "0.2";

export enum DIRECTION {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

export const GAME_WIDTH: number = 1000;
export const GAME_HEIGHT: number = 400;

export const LANDSCAPE_MAX_X = 2650;
export const LANDSCAPE_MIN_X = 0;

export const BAT_SIDE_MARGIN: number = 20;
export const BALL_RADIUS: number = 10;
export const BAT_HEIGHT: number = 60;
export const BAT_WIDTH: number = 8;

export const WIN_SCORE: number = 11;

export const COLOURS = {
  BACKGROUND: "#333",
  MAIN: "#00CC00",
  LANDSCAPE: "#FFF",
  BULLET: "#00FF00",
  white: "white",
};

export const FONTS = {
  TITLE: "30px arial",
  SCORE: "60px arial",
  SMALL: "12px arial",
};

export const INPUT = {
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  SPACE: " ",
  X: "x"
};

export const PHASE = {
  START: "START",
  GAME: "GAME",
  END: "END",
};

export const HTML_ELEMENTS = {
  START_BUTTON: "startButton",
  RESTART_BUTTON: "restartButton",
  START_SCREEN: "startScreen",
  END_SCREEN: "endScreen",
  RESULT_TEXT: "resultText",
  SHIP_IMAGE: "ship",
  ALIEN_IMAGE: "alien"
};
