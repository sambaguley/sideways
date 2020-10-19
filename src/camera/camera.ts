import { DIRECTION } from "../common/gameConstants";

export default class Camera {
  x = 0;
  y = 0;
  minX = 0;
  maxX = 1700;
  speed = 0;
  maxSpeed = 8;
  direction = null;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setDirection = (newDirection: DIRECTION) => {
    this.direction = newDirection;
  };

  followShip = (followX) => {
    this.x = this.x + followX;
  };
}
