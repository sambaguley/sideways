import { alienImage } from "../common/htmlElements";
import {
  DIRECTION,
  GAME_HEIGHT,
  GAME_WIDTH,
  LANDSCAPE_MAX_X,
} from "../common/gameConstants";
import { camera } from "../gameControl/gameControl";

const INITIAL_STATE = {
  x: LANDSCAPE_MAX_X,
  speed: 0.5,
  maxSpeed: 8,
  direction: DIRECTION.Right,
};

export default class Alien {
  height = 23;
  width = 26;
  x = Math.random() * LANDSCAPE_MAX_X;
  y = -10;
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
    this.ctx.drawImage(
      alienImage,
      this.x - this.camera.x,
      this.y - this.camera.y
    );
  };

  spawn = () => {
    this.x = (Math.random() * GAME_WIDTH) / 2;
    this.y = -10;
    this.speed = INITIAL_STATE.speed;
  };

  update = () => {
    this.y = this.y + this.speed;
    if (this.y > GAME_HEIGHT) {
      this.remove();
    }
  };

  explode = () => {
    this.y = -200;
  };

  remove = () => {
    this.removed = true;
  };
}
