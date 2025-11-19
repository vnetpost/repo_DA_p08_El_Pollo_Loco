// Movable-Drawable 2D Instances
import { Sprite } from "./index.js";

export class DynamicSprite extends Sprite {
    

    velocityX;
    velocityY;


    goRight() {
        console.log("Moving right!");
    }
    goLeft() {
        console.log("Moving Left!");
    }
}