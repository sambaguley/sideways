import { PHASE } from "../common/gameConstants";
import { gameCanvas } from "../common/htmlElements";
import { initUserInput } from "./userInput";
import { gameState, resetElements } from "./gameState";
import { collisionDetection } from "../collision/collision";
// import { moveOpponent } from "../ai/ai";
import Ship from "../elements/ship";
import Alien from "../elements/alien";
import Landscape from "../elements/landscape";
import Bullet from "../elements/bullet";
import BulletControl from "../elements/bulletControl";
import Camera from "../camera/camera";

import {
  clearCanvas,
  drawVersionNumber,
  drawBackground,
} from "../elements/background";
// import { drawScore, checkScores } from "./score";

let animationRequest;
export let ship;
export let alien;
export let bullet;
export let landscape;
export let ctx;
export let camera;
export let bulletControl;

export const init = (): void => {
  ctx = gameCanvas.getContext("2d");
  camera = new Camera(0,0);
  ship = new Ship(ctx, camera);
  bullet = new Bullet(ctx, camera);
  bulletControl = new BulletControl(ctx, camera);
  landscape = new Landscape(ctx, camera);
  alien = new Alien(ctx, camera);
  gameState.phase = PHASE.GAME;
  if (!animationRequest) {
    startAnimation();
  }
};

const drawGameElements = (): void => {
  clearCanvas();
  drawBackground();
  landscape.draw();
  ship.draw();
  alien.draw();
  bulletControl.draw();
  // drawScore();
  drawVersionNumber();
};

const gameLoop = (): void => {
  ship.move();
  alien.move();
  bulletControl.move();
  drawGameElements();
  collisionDetection();
  // checkScores();
  animationRequest = requestAnimationFrame(gameLoop);
};

const startAnimation = (): void => {
  animationRequest = requestAnimationFrame(gameLoop);
};

export const stopAnimation = (): void => {
  resetElements();
  cancelAnimationFrame(animationRequest);
};

initUserInput();
