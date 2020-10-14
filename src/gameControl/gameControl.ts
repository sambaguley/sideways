import { PHASE } from "../common/gameConstants";
import { gameCanvas } from "../common/htmlElements";
import { initUserInput } from "./userInput";
import { gameState, resetElements } from "./gameState";
// import { collisionDetection } from "../collision/collision";
// import { moveOpponent } from "../ai/ai";
import Ship from "../elements/ship";
import Landscape from "../elements/landscape";
import Bullet from "../elements/bullet";
import Camera from "../camera/camera";

import {
  clearCanvas,
  drawVersionNumber,
  drawBackground,
} from "../elements/background";
// import { drawScore, checkScores } from "./score";

let animationRequest;
export let ship;
export let bullet;
export let landscape;
export let ctx;
export let camera;

const drawGameElements = (): void => {
  clearCanvas();
  drawBackground();
  landscape.draw();
  ship.draw();
  bullet.draw();
  // drawScore();
  drawVersionNumber();
};

const gameLoop = (): void => {
  ship.move();
  bullet.move();
  // moveOpponent();
  drawGameElements();
  // collisionDetection();
  // checkScores();
  animationRequest = requestAnimationFrame(gameLoop);
};

export const init = (): void => {
  ctx = gameCanvas.getContext("2d");
  camera = new Camera(0,0);
  ship = new Ship(ctx, camera);
  bullet = new Bullet(ctx, camera);
  landscape = new Landscape(ctx, camera);
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
