import { Sprite, DynamicSprite, StaticSprite, SkyLayer, BackdropLayer, Hero, Mob, Collectible, Coin, Projectile, IntervalHub, ImgHub } from "./index.js";

export class Joystick {
    //  -> e.code = ["KeyD", "Space", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]

    constructor() {

    }


    addEvents() {
        window.addEventListener("keydown", (e) => {
            if (e.code === "ArrowLeft") this.goLeft();
            if (e.code === "ArrowRight") this.goRight();
            if (e.code === "ArrowUp");
            if (e.code === "ArrowDown");
            if (e.code === "Space") this.jump();
            if (e.code === "KeyD") this.throw();
        });
    }
}