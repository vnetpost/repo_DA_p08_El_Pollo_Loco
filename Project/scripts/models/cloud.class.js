import { randomBetween } from "../utils/utils.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";


export class Cloud extends MovableObject {
    width = 400;
    height = 250;
    y = 80;
    

    constructor({ _path, _x } = {}) {
        super();
        this.loadImage(_path);
        this.x = _x;
        IntervalHub.startInterval(() => this.animate(), 1000 / 60);
    }



    animate() {
        this.moveLeft();
    }


}