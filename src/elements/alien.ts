import { alienImage } from "../common/htmlElements";
import { DIRECTION, GAME_HEIGHT, GAME_WIDTH, LANDSCAPE_MAX_X } from "../common/gameConstants";
import { camera } from "../gameControl/gameControl";

const INITIAL_STATE = {
  x: LANDSCAPE_MAX_X,
  speed: 3,
  maxSpeed: 8,
  direction: DIRECTION.Right,
};

export default class Alien {
  height = 23;
  width = 26;
  x = INITIAL_STATE.x;
  y = Math.random() * GAME_HEIGHT / 2;
  speed = INITIAL_STATE.speed;
  direction = DIRECTION.Right;
  moveDirection = null;
  ctx = null;
  camera = null;
  removed = false;

  constructor(ctx, camera) {
    this.ctx = ctx;
    this.camera = camera;
  }

  draw = () => {
    this.ctx.drawImage(alienImage, this.x - this.camera.x, this.y - this.camera.y);
  };

  spawn = () => {
    this.x = LANDSCAPE_MAX_X;
    this.y = Math.random() * GAME_HEIGHT / 2;
    this.speed = INITIAL_STATE.speed;
  };

  move = () => {
    this.x = this.x - this.speed;
  }

  explode = () => {
    this.y = -200;
  }

  remove = () => {
    this.removed = true;
  }

}
