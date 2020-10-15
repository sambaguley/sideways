import { bulletControl, alien, ship } from "../gameControl/gameControl";

const isCollide = (a,b) => {
  if(b.x > a.x 
    && b.x < a.x + a.width
    && b.y > a.y 
    && b.y < a.y + a.height ) {
    return true;
  } 
  return false;
};

export const collisionDetection = (): void => {
  bulletControl.bulletList.forEach(bullet => {
    if(isCollide(alien, bullet)) {
      alien.explode();
      alien.spawn();
    }
  })
  if(isCollide(ship, alien)) {
    alien.explode();
    ship.explode();
  }
};
