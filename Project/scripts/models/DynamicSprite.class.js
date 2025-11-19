// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import { Sprite, StaticSprite, SkyLayer, BackdropLayer, Hero, Mob, Collectible, Coin, Projectile, IntervalHub, ImgHub } from "./index.js";

// Movable-Drawable 2D Instances
export class DynamicSprite extends Sprite {
    offset;
    pXr;                    // Number
    pYr;                    // Number
    velocityX;
    velocityY;
    FRAMES;                  // Object                   Image-Chain

    constructor() {
        super();
        
    }

    goRight() {
        console.log("Moving right!");
    }
    goLeft() {
        console.log("Moving Left!");
    }
}