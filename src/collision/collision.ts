import {
  bulletControl,
  alienControl,
  ship,
  score,
  stopAnimation,
} from "../gameControl/gameControl";
import { showEndScreen } from "../screens/screenControl";
import { SCORES } from "../common/gameConstants";
import { TEXT } from "../common/gameText";
import { scoreResult } from "../common/htmlElements";

const isCollide = (a, b) => {
  if (b.x > a.x && b.x < a.x + a.width && b.y > a.y && b.y < a.y + a.height) {
    return true;
  }
  return false;
};

export const collisionDetection = (): void => {
  bulletControl.bulletList.forEach((bullet) => {
    alienControl.alienList.forEach((alien) => {
      if (isCollide(alien, bullet)) {
        alien.explode();
        bullet.remove();
        score.increase(SCORES.SHOOT_ALIEN);
      }
    });
  });
  alienControl.alienList.forEach((alien) => {
    if (isCollide(ship, alien)) {
      alien.explode();
      ship.explode();
      stopAnimation();
      showEndScreen();
      console.log(scoreResult);
      scoreResult.innerHTML = `${TEXT.SCORE}: ${score.score}`;
    }
  });
};
