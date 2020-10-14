import { ctx } from "../gameControl/gameControl";

import { COLOURS, DIRECTION, GAME_HEIGHT, GAME_WIDTH } from "../common/gameConstants";

const INITIAL_STATE = {
  x: GAME_WIDTH / 2 - 5,
  y: GAME_HEIGHT / 2,
  speed: 0,
  maxSpeed: 8,
  direction: DIRECTION.Right,
  dx: 0,
  dy: 0,
};

export default class Ship {
  height = 20;
  width = 20;
  acceleration = 0.2;
  maxSpeed = 8;
  x = INITIAL_STATE.x;
  y = INITIAL_STATE.y;
  speed = INITIAL_STATE.speed;
  direction = DIRECTION.Right;
  dx = INITIAL_STATE.dx;
  dy = INITIAL_STATE.dy;

  draw = () => {
    ctx.fillStyle = COLOURS.MAIN;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height / 2);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.fill();
  };

  reset = () => {
    this.x = INITIAL_STATE.x;
    this.y = INITIAL_STATE.y;
    this.speed = INITIAL_STATE.speed;
    this.dx = INITIAL_STATE.dx;
    this.dy = INITIAL_STATE.dy;
  };

  setSpeed = (speed) => {
    if(speed === "max") {
      this.speed = INITIAL_STATE.maxSpeed;
    }
  }

  changeDirection = (newDirection: DIRECTION) => {
    this.direction = newDirection;
  }

  move = () => {
    switch(this.direction) {
      case DIRECTION.Up:
        this.y = this.y - this.speed;
        break;
      case DIRECTION.Down:
        this.y = this.y + this.speed;
       break;
      case DIRECTION.Left:
        this.x = this.x - this.speed;
        break;
      case DIRECTION.Right:
        this.x = this.x + this.speed;
        break;
      default:
        break;
    }
  }

  stop = () => {
    this.speed = 0;
  }
}
