// Movable-Drawable 2D Instances
import { Sprite, StaticSprite, SkyLayer, BackdropLayer, Hero, Mob, Collectible, Coin, Projectile, IntervalHub, ImgHub } from "./index.js";


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