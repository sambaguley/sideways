import { bullet, bulletControl } from "../gameControl/gameControl";
import { shipImage } from "../common/htmlElements";
import {
  DIRECTION,
  GAME_HEIGHT,
  GAME_WIDTH,
  LANDSCAPE_MIN_X,
  LANDSCAPE_MAX_X,
} from "../common/gameConstants";

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
  BACKWARD = "BACKWARD",
}

export enum ACCELERATION_LEVELS {
  MIN = 0,
  MAX = 0.8,
}

export default class Ship {
  height = 23;
  width = 60;
  private _acceleration = 0;
  _friction = 0.4;
  maxSpeed = 8;
  x = INITIAL_STATE.x;
  y = INITIAL_STATE.y;
  speed = INITIAL_STATE.speed;
  shipDirection = DIRECTION.Right;
  moveDirection = null;
  dx = INITIAL_STATE.dx;
  dy = INITIAL_STATE.dy;
  spriteState = SPRITE_STATES.FORWARD;
  ctx = null;
  camera = null;
  margin = 150;

  constructor(ctx, camera) {
    this.ctx = ctx;
    this.camera = camera;
  }

  draw = () => {
    switch (this.spriteState) {
      case SPRITE_STATES.FORWARD:
        this.ctx.drawImage(
          shipImage,
          0,
          0,
          this.width,
          this.height,
          this.x - this.camera.x,
          this.y - this.camera.y,
          this.width,
          this.height
        );
        break;
      case SPRITE_STATES.BACKWARD:
        this.ctx.drawImage(
          shipImage,
          this.width,
          0,
          this.width,
          this.height,
          this.x - this.camera.x,
          this.y - this.camera.y,
          this.width,
          this.height
        );
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
    if (speed === "max") {
      this.speed = INITIAL_STATE.maxSpeed;
    }
  };

  setAcceleration(newAcc) {
    this._acceleration = newAcc;
  }

  changeDirection = (newDirection: DIRECTION) => {
    this.moveDirection = newDirection;
    if (newDirection === DIRECTION.Right || newDirection === DIRECTION.Left) {
      this.shipDirection = newDirection;
    }
  };

  shoot = () => {
    if (this.shipDirection === DIRECTION.Right) {
      bulletControl.addBullet();
      const { bulletList } = bulletControl;
      bulletList[bulletList.length - 1].shoot(
        this.x + this.width,
        this.y + this.height / 2 + 2,
        this.shipDirection
      );
    } else {
      bulletControl.addBullet();
      const { bulletList } = bulletControl;
      bulletList[bulletList.length - 1].shoot(
        this.x - bullet.width,
        this.y + this.height / 2 + 2,
        this.shipDirection
      );
    }
  };

  explode = () => {
    this.y = -200;
  };

  update = () => {
    // Speed should always 0 or above and not exceed the top speed
    this.speed = Math.min(
      Math.max(this.speed + this._acceleration - this._friction, 0),
      this.maxSpeed
    );
    switch (this.moveDirection) {
      case DIRECTION.Up:
        if (this.y > 0) {
          this.y = this.y - this.speed;
        }
        break;
      case DIRECTION.Down:
        if (this.y < GAME_HEIGHT - 24) {
          this.y = this.y + this.speed;
        }
        break;
      case DIRECTION.Left:
        if (this.x > LANDSCAPE_MIN_X) {
          if (this.x - this.camera.x - this.margin > 0) {
            this.x = this.x - this.speed;
            this.spriteState = SPRITE_STATES.BACKWARD;
          } else {
            this.x = this.x - this.speed;
            this.spriteState = SPRITE_STATES.BACKWARD;
            this.camera.move(DIRECTION.Right);
          }
        }
        break;
      case DIRECTION.Right:
        if (this.x < LANDSCAPE_MAX_X) {
          if (this.x - this.camera.x + this.margin < GAME_WIDTH - this.width) {
            this.x = this.x + this.speed;
            this.spriteState = SPRITE_STATES.FORWARD;
          } else {
            this.x = this.x + this.speed;
            this.spriteState = SPRITE_STATES.FORWARD;
            this.camera.move(DIRECTION.Left);
          }
        }
        break;
      default:
        break;
    }
  };

  stop = () => {
    this.speed = 0;
  };
}
