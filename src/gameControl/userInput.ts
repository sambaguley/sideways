import { startButton, restartButton } from "../common/htmlElements";
import { DIRECTION, INPUT, PHASE } from "../common/gameConstants";
import { init, ship } from "./gameControl";
import { hideStartScreen, hideEndScreen } from "../screens/screenControl";
import { gameState } from "./gameState";

const detectKeyDownPress = (key: string): void => {
  if (gameState.phase == PHASE.GAME) {
    switch (key) {
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
    }
  }
};

const detectKeyUpPress = (key: string): void => {
  // console.log(key);
  if (gameState.phase == PHASE.GAME) {
    if (key === INPUT.UP && ship.moveDirection === DIRECTION.Up) {
      ship.stop();
    }
    if (key === INPUT.DOWN && ship.moveDirection === DIRECTION.Down) {
      ship.stop();
    }
    if (key === INPUT.RIGHT && ship.moveDirection === DIRECTION.Right) {
      ship.stop();
    }
    if (key === INPUT.LEFT && ship.moveDirection === DIRECTION.Left) {
      ship.stop();
    }
  }
};

export const initUserInput = () => {
  document.addEventListener("keydown", (e) => {
    const { key } = e;
    detectKeyDownPress(key);
  });
  document.addEventListener("keyup", (e) => {
    const { key } = e;
    detectKeyUpPress(key);
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
