// mob.class.js
import * as Utils from "../utils/utils.js";
import { DynamicSprite, ImgHub } from "./index.js";

export class Mob extends DynamicSprite {

    static GALLINITAS = [];

    // Basic size & position
    pX;
    pY = 330;
    W = 40;
    H = 40;

    // Frames from ImgHub
    FRAMES = ImgHub.IMGS.chickens.normal;

    // Animation state
    mode = "walk";              // walk | dead
    currentFrames = [];         // Array of HTMLImageElement
    currentFrame = null;        // Currently displayed HTMLImageElement
    currentFrameIdx = 0;        // Index in currentFrames
    animSpeed = 150;            // Milliseconds per frame
    lastFrameTime = 0;          // Last timestamp used for animation

    // Movement state
    speedX = 40;
    lastMoveTime = 0;

    constructor() {
        super();

        // Random X start
        this.pX = Utils.setRandomXposition();

        // Init frames
        this.setCurrentFrames();
        this.currentFrame = this.currentFrames[this.currentFrameIdx];
    }

    // Select frames based on mode
    setCurrentFrames() {
        if (this.mode === "walk") this.currentFrames = this.FRAMES.walk;
        if (this.mode === "dead") this.currentFrames = this.FRAMES.dead;
        if (this.currentFrameIdx >= this.currentFrames.length) this.currentFrameIdx = 0;
    }

    // Change mode externally
    setMode(newMode) {
        if (this.mode === newMode) return;
        this.mode = newMode;
        this.setCurrentFrames();
        this.currentFrameIdx = 0;
        this.lastFrameTime = 0;
        this.currentFrame = this.currentFrames[this.currentFrameIdx];
    }

    // Called every frame from Scene.sceneLoop(timeStamp).
    // Updates animation and movement.
    update(timeStamp) {
        this.setCurrentFrames();
        this.animate(timeStamp);
        this.move(timeStamp);
    }

    // Time-based animation using RAF timestamp.
    animate(timeStamp) {
        if (this.mode === "dead") return;
        if (!this.lastFrameTime) {
            this.lastFrameTime = timeStamp;
            return;
        }

        const delta = timeStamp - this.lastFrameTime;

        if (delta >= this.animSpeed) {
            this.lastFrameTime = timeStamp;
            this.currentFrameIdx = (this.currentFrameIdx + 1) % this.currentFrames.length;
            this.currentFrame = this.currentFrames[this.currentFrameIdx];
        }
    }

    // Movement over time
    move(timeStamp) {
        if (this.mode === "dead") return;
        if (!this.lastMoveTime) {
            this.lastMoveTime = timeStamp;
            return;
        }

        const delta = timeStamp - this.lastMoveTime;
        this.lastMoveTime = timeStamp;

        const deltaSeconds = delta / 1000;
        this.pX -= this.speedX * deltaSeconds;

        // Respawn on right side after leaving screen
        if (this.pX + this.W < 0)
            this.pX = 720 + Utils.setRandomXposition();
    }

    // Draw on canvas
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
