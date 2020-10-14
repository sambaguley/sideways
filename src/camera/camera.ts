import { DIRECTION } from "../common/gameConstants";

export default class Camera {
    x = 0;
    y = 0;
    speed = 8;

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    move = (direction) => {
        if(direction === DIRECTION.Left) {
            this.x = this.x + this.speed;
        }
        if(direction === DIRECTION.Right) {
            this.x = this.x - this.speed;
        }
    }
}