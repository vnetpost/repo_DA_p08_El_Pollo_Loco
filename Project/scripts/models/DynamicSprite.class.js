// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import { Sprite } from "./index.js";

// Movable-Drawable 2D Instances
export class DynamicSprite extends Sprite {
    offset;
    pXr;                            // Number
    pYr;                            // Number
    velocityX;
    velocityY;

    isAnim = false;                 // Boolean
    // mode;                           // String                   idle, walk, alert, attack, Jump, hurt, dead, ....
    currentFrame;                   //


    constructor() { super(); }

    

    goRight() {
        console.log("Moving right!");
    }
    goLeft() {
        console.log("Moving Left!");
    }
}