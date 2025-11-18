// Movable-Drawable 2D Instances

import { Sprite } from "./sprite.class.js";

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