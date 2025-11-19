// Movable-Drawable 2D Instances
import { Sprite, StaticSprite, SkyLayer, BackdropLayer, Hero, Mob, Collectible, Coin, Projectile, IntervalHub, ImgHub } from "./index.js";
import * as EPOLO from "./index.js"; // Define a Objekt-Namespace


export class DynamicSprite extends EPOLO.Sprite {


    velocityX;
    velocityY;


    goRight() {
        console.log("Moving right!");
    }
    goLeft() {
        console.log("Moving Left!");
    }
}