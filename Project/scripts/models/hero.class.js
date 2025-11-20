// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import { DynamicSprite, ImgHub } from "./index.js";

// Character-Player Instances
export class Hero extends DynamicSprite {
    pX = 50;
    pY = 250;
    W = 70;
    H = 150;

    constructor() {
        super();
        this.FRAMES = ImgHub.IMGS.pepe;
        this.currentFrame = this.FRAMES.walk[1];
    }

    //  -> e.code = ["KeyD", "Space", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]

    jump() {
        console.log("Hero Jumps!");

    }
    throw() {
        console.log("Hero throws!");

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