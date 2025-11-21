// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import { DynamicSprite, ImgHub } from "./index.js";

// Character-Player Instances
export class Hero extends DynamicSprite {
    pX = 50;
    pY = 225;
    W = 70;
    H = 150;

    mode = "idleLong";             // "idleNormal" | "idleLong" | "walk" | "jump" | "hurt" | "dead"
    currentFrames = [];        // array of HTMLImageElements
    frameIndex = 0;            // which frame in the animation
    frameSpeed = 80;           // ms per frame
    lastFrameTime = 0;         // last timestamp of animated frame

    constructor() {
        super();
        // Set default animation
        this.currentFrame = ImgHub.IMGS.pepe.idle.short[1];
        this.setCurrentFrames();
    }

    setCurrentFrames() {
        if (this.mode === "idleShort") this.currentFrames = ImgHub.IMGS.pepe.idle.short;
        if (this.mode === "idleLong") this.currentFrames = ImgHub.IMGS.pepe.idle.long;
        if (this.mode === "walk") this.currentFrames = ImgHub.IMGS.pepe.walk;
        if (this.mode === "jump") this.currentFrames = ImgHub.IMGS.pepe.jump;
        if (this.mode === "hurt") this.currentFrames = ImgHub.IMGS.pepe.hurt;
        if (this.mode === "dead") this.currentFrames = ImgHub.IMGS.pepe.dead;
    }

    jump() {
        console.log("Hero Jumps!");

    }
    throw() {
        console.log("Hero throws!");

    }

    // Updates hero each frame 
    update(timeStamp) {
        this.setCurrentFrames();
        this.animate(timeStamp);
    }

    //  Update animation frame based on time 
    //  SceneLoop(timestamp) passes timestamp into update()
    animate(timeStamp) {
        if (!this.currentFrames) return;
        console.log(timeStamp / 1000);

        if (timeStamp - this.lastFrameTime > this.frameSpeed) {
            this.frameIndex = (this.frameIndex + 1) % this.currentFrames.length;
            this.currentFrame = this.currentFrames[this.frameIndex];
            this.lastFrameTime = timeStamp;
        }
    }

    // Draw the hero
    draw(ctx) {
        ctx.drawImage(
            this.currentFrame,
            this.pX,
            this.pY,
            this.W,
            this.H
        );
    }
}