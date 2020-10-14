import { ctx } from "../gameControl/gameControl";
import { shipImage } from "../common/htmlElements"
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

enum SPRITE_STATES {
  FORWARD = "FORWARD",
  BACKWARD = "BACKWARD"
};

export default class Ship {
  height = 23;
  width = 60;
  acceleration = 0.2;
  maxSpeed = 8;
  x = INITIAL_STATE.x;
  y = INITIAL_STATE.y;
  speed = INITIAL_STATE.speed;
  direction = DIRECTION.Right;
  dx = INITIAL_STATE.dx;
  dy = INITIAL_STATE.dy;
  spriteState = SPRITE_STATES.FORWARD;

  draw = () => {
    switch(this.spriteState) {
      case SPRITE_STATES.FORWARD: 
        ctx.drawImage(shipImage, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        break;
      case SPRITE_STATES.BACKWARD:
        ctx.drawImage(shipImage, this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        break;
      default:
        break;
    }

    // ctx.fillStyle = COLOURS.MAIN;
    // ctx.beginPath();
    // ctx.moveTo(this.x, this.y);
    // ctx.lineTo(this.x + this.width, this.y + this.height / 2);
    // ctx.lineTo(this.x, this.y + this.height);
    // ctx.fill();
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
        this.spriteState = SPRITE_STATES.BACKWARD;
        break;
      case DIRECTION.Right:
        this.x = this.x + this.speed;
        this.spriteState = SPRITE_STATES.FORWARD;
        break;
      default:
        break;
    }
  }

  stop = () => {
    this.speed = 0;
  }
}
