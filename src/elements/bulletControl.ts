import { LANDSCAPE_MAX_X } from "../common/gameConstants";
import Bullet from "./bullet";

export default class BulletControl {
  bulletList = [];
  ctx = null;
  camera = null;

  constructor(ctx, camera) {
    this.ctx = ctx;
    this.camera = camera;
  }

  addBullet = () => {
    this.bulletList.push(new Bullet(this.ctx, this.camera));
  };

  move = () => {
    this.bulletList.forEach((bullet) => {
      bullet.move();
      if (
        bullet.x > LANDSCAPE_MAX_X + this.camera.x ||
        bullet.x - this.camera.x < 0
      ) {
        bullet.remove();
      }
    });
    this.bulletList = this.bulletList.filter((x) => !x.removed);
  };

  draw = () => {
    this.bulletList.forEach((bullet) => bullet.draw());
  };
}
