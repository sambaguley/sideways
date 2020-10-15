import { alienImage } from "../common/htmlElements";
import { DIRECTION, GAME_HEIGHT, GAME_WIDTH } from "../common/gameConstants";

const INITIAL_STATE = {
  x: GAME_WIDTH,
  y: Math.random() * GAME_HEIGHT / 2,
  speed: 3,
  maxSpeed: 8,
  direction: DIRECTION.Right,
};

export default class Alien {
  height = 23;
  width = 26;
  x = INITIAL_STATE.x;
  y = INITIAL_STATE.y;
  speed = INITIAL_STATE.speed;
  direction = DIRECTION.Right;
  moveDirection = null;
  ctx = null;
  camera = null;

  constructor(ctx, camera) {
    this.ctx = ctx;
    this.camera = camera;
  }

  draw = () => {
    // console.log("alienImage: ", alienImage);
    this.ctx.drawImage(alienImage, this.x - this.camera.x, this.y - this.camera.y);
  };

  spawn = () => {
    this.x = INITIAL_STATE.x;
    this.y = Math.random() * GAME_HEIGHT / 2;
    this.speed = INITIAL_STATE.speed;
  };

  move = () => {
    this.x = this.x - this.speed;
  }

  explode = () => {
    this.y = -200;
  }

}
