import { startButton, restartButton } from "../common/htmlElements";
import { DIRECTION, INPUT, PHASE } from "../common/gameConstants";
import { init, stopAnimation, ship } from "./gameControl";
import { hideStartScreen, hideEndScreen } from "../screens/screenControl";
import { gameState } from "./gameState";

const detectKeyPress = ({ key }: { key: string }): void => {
  console.log("key: ", key);
  if (gameState.phase == PHASE.GAME) {
    if (key === INPUT.UP) {
      ship.setSpeed("max");
      ship.changeDirection(DIRECTION.Up);
    } else if (key === INPUT.DOWN) {
      ship.setSpeed("max");
      ship.changeDirection(DIRECTION.Down);
    } else if (key === INPUT.RIGHT) {
      ship.setSpeed("max");
      ship.changeDirection(DIRECTION.Right);
    } else if (key === INPUT.LEFT) {
      ship.setSpeed("max");
      ship.changeDirection(DIRECTION.Left);
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
