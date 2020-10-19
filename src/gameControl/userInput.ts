import { startButton, restartButton } from "../common/htmlElements";
import { DIRECTION, INPUT, PHASE } from "../common/gameConstants";
import { init, ship } from "./gameControl";
import { ACCELERATION_LEVELS } from "../elements/ship";
import { hideStartScreen, hideEndScreen } from "../screens/screenControl";
import { gameState } from "./gameState";

const detectKeyDownPress = (key: string): void => {
  if (gameState.phase == PHASE.GAME) {
    switch (key) {
      // SHIP
      case INPUT.UP:
        ship.setAcceleration(ACCELERATION_LEVELS.MAX);
        ship.changeDirection(DIRECTION.Up);
        break;
      case INPUT.DOWN:
        ship.setAcceleration(ACCELERATION_LEVELS.MAX);
        ship.changeDirection(DIRECTION.Down);
        break;
      case INPUT.RIGHT:
        ship.setAcceleration(ACCELERATION_LEVELS.MAX);
        ship.changeDirection(DIRECTION.Right);
        break;
      case INPUT.LEFT:
        ship.setAcceleration(ACCELERATION_LEVELS.MAX);
        ship.changeDirection(DIRECTION.Left);
        break;
      case INPUT.SPACE:
        ship.shoot();
        break;
    }
  }
};

const detectKeyUpPress = (key: string): void => {
  if (gameState.phase == PHASE.GAME) {
    if (key === INPUT.UP && ship.moveDirection === DIRECTION.Up) {
      ship.setAcceleration(ACCELERATION_LEVELS.MIN);
    }
    if (key === INPUT.DOWN && ship.moveDirection === DIRECTION.Down) {
      ship.setAcceleration(ACCELERATION_LEVELS.MIN);
    }
    if (key === INPUT.RIGHT && ship.moveDirection === DIRECTION.Right) {
      ship.setAcceleration(ACCELERATION_LEVELS.MIN);
    }
    if (key === INPUT.LEFT && ship.moveDirection === DIRECTION.Left) {
      ship.setAcceleration(ACCELERATION_LEVELS.MIN);
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
