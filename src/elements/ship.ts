import { bullet, bulletControl } from "../gameControl/gameControl";
import { shipImage } from "../common/htmlElements";
import {
  DIRECTION,
  GAME_HEIGHT,
  GAME_WIDTH,
  LANDSCAPE_MIN_X,
  LANDSCAPE_MAX_X,
  ACCELERATION_LEVELS,
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
  EXPLODE = "EXPLODE",
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
      case SPRITE_STATES.EXPLODE:
        this.ctx.drawImage(
          shipImage,
          this.width * 2,
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
    this.spriteState = SPRITE_STATES.EXPLODE;
  };

  update = () => {
    // Speed should always 0 or above and not exceed the top speed
    this.speed = Math.min(
      Math.max(this.speed + this._acceleration - this._friction, 0),
      this.maxSpeed
    );
    if (this.speed > 0) {
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
          this.spriteState = SPRITE_STATES.BACKWARD;
          if (this.x > LANDSCAPE_MIN_X) {
            this.x = this.x - this.speed;
            if (this.x - this.camera.x - this.margin < 0) {
              this.camera.followShip(-this.speed);
            }
          }
          break;
        case DIRECTION.Right:
          this.spriteState = SPRITE_STATES.FORWARD;
          if (this.x < LANDSCAPE_MAX_X) {
            this.x = this.x + this.speed;
            if (
              this.x - this.camera.x + this.margin >
              GAME_WIDTH - this.width
            ) {
              this.camera.followShip(this.speed);
            }
          }
          break;
        default:
          break;
      }
    }
  };

  stop = () => {
    this.speed = 0;
  };
}
