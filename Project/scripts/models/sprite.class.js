// import * as EPOLO from "./index.js";
// import { DynamicSprite, StaticSprite, SkyLayer, Backdrop, Hero, Mob, Collectible, Coin, Projectile, IntervalHub, ImgHub } from "./index.js";

// All Drawable 2D Instances 
// In Game-Dev -> sprite
// Because a 2D Graphic-Figure floats above the background.

export class Sprite {
    pX;                     // Number                   X-Position
    pY;                     // Number                   Y-Position

    static SPRITES = [];    // Array                    A list of all sprites

    constructor() { }

    draw(ctx) {
        // if (!this.currentFrame) return;

        ctx.drawImage(
            this.currentFrame,
            this.pX,
            this.pY,
            this.W,
            this.H
        );
    }
}