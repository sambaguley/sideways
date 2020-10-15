import { DIRECTION } from "../common/gameConstants";

export default class Camera {
    x = 0;
    y = 0;
    minX = 0;
    maxX = 1700;
    speed = 8;

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    move = (direction) => {
        if(direction === DIRECTION.Left) {
            if(this.x < this.maxX) {
                this.x = this.x + this.speed;
            }
        }
        if(direction === DIRECTION.Right) {
            if(this.x > this.minX) {
                this.x = this.x - this.speed;
            }
        }
    }
}