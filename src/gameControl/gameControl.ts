import { PHASE } from "../common/gameConstants";
import { gameCanvas } from "../common/htmlElements";
import { initUserInput } from "./userInput";
import { gameState, resetElements } from "./gameState";
// import { collisionDetection } from "../collision/collision";
// import { moveOpponent } from "../ai/ai";
import Ship from "../elements/ship";
import {
  clearCanvas,
  drawVersionNumber,
  drawBackground,
} from "../elements/landscape";
// import { drawScore, checkScores } from "./score";

let animationRequest;
export let ship;
export let ctx;

const drawGameElements = (): void => {
  clearCanvas();
  drawBackground();
  ship.draw();
  // drawScore();
  drawVersionNumber();
};

const gameLoop = (): void => {
  ship.move();
  // moveOpponent();
  drawGameElements();
  // collisionDetection();
  // checkScores();
  animationRequest = requestAnimationFrame(gameLoop);
};

export const init = (): void => {
  ctx = gameCanvas.getContext("2d");
  ship = new Ship();
  gameState.phase = PHASE.GAME;
  if (!animationRequest) {
    startAnimation();
  }
};

const startAnimation = (): void => {
  animationRequest = requestAnimationFrame(gameLoop);
};

export const stopAnimation = (): void => {
  resetElements();
  cancelAnimationFrame(animationRequest);
};

initUserInput();
