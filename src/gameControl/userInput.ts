import { startButton, restartButton } from "../common/htmlElements";
import { DIRECTION, INPUT, PHASE } from "../common/gameConstants";
import { init, camera, ship } from "./gameControl";
import { hideStartScreen, hideEndScreen } from "../screens/screenControl";
import { gameState } from "./gameState";

const detectKeyPress = ({ key }: { key: string }): void => {
  if (gameState.phase == PHASE.GAME) {
    switch(key) {

      // SHIP
      case INPUT.UP:
        ship.setSpeed("max");
        ship.changeDirection(DIRECTION.Up);
      break;
      case INPUT.DOWN:
        ship.setSpeed("max");
        ship.changeDirection(DIRECTION.Down);
      break;
      case INPUT.RIGHT:
        ship.setSpeed("max");
        ship.changeDirection(DIRECTION.Right);
      break;
      case INPUT.LEFT:
        ship.setSpeed("max");
        ship.changeDirection(DIRECTION.Left);
      break;
      case INPUT.SPACE:
        ship.shoot();
      break;

      // CAMERA
      case INPUT.CAMERA_LEFT:
        camera.move(DIRECTION.Left)
      break;
      case INPUT.CAMERA_RIGHT:
        camera.move(DIRECTION.Right)
      break;


    }
  }
};

export const initUserInput = () => {
  document.addEventListener("keydown", (e) => {
    detectKeyPress(e);
  });
  document.addEventListener("keyup", (e) => {
    ship.stop(e);
  });

  startButton.addEventListener("mousedown", () => {
    init();
    hideStartScreen();
  });

  restartButton.addEventListener("mousedown", () => {
    init();
    hideEndScreen();
  });
};
