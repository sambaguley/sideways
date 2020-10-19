import Alien from "./alien";

const ALIEN_SPAWN_INTERVAL = 2000;

export default class AlienControl {
  alienList = [];
  ctx = null;
  camera = null;
  spawnTimer = null;

  constructor(ctx, camera) {
    this.ctx = ctx;
    this.camera = camera;
  }

  startSpawn = () => {
    this.spawnTimer = setInterval(this.add, ALIEN_SPAWN_INTERVAL);
  };

  stopSpawn = () => {
    clearInterval(this.spawnTimer);
  };

  add = () => {
    this.alienList.push(new Alien(this.ctx, this.camera));
  };

  update = () => {
    this.alienList.forEach((alien) => {
      alien.update();
      if (alien.x - this.camera.x < 0) {
        alien.remove();
      }
    });
    this.alienList = this.alienList.filter((x) => !x.removed);
  };

  draw = () => {
    this.alienList.forEach((alien) => alien.draw());
  };
}
