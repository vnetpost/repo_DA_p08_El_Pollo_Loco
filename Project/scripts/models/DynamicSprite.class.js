// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import { Sprite } from "./index.js";

// Movable-Drawable 2D Instances
export class DynamicSprite extends Sprite {
    offset;
    pXr;                            // Number
    pYr;                            // Number
    velocityX;
    velocityY;

    // Animation state (optional for subclasses)
    currentFrames = [];
    currentFrame = null;
    currentFrameIdx = 0;
    animSpeed = 150;
    lastFrameTime = 0;

    constructor() { super(); }

    setAnimationFrames(frames = []) {
        this.currentFrames = frames;
        this.currentFrameIdx = 0;
        this.currentFrame = this.currentFrames[this.currentFrameIdx] ?? null;
        this.lastFrameTime = 0;
    }

    shouldAnimate() {
        return this.currentFrames.length > 1;
    }

    animate(timeStamp) {
        if (!this.shouldAnimate() || !this.currentFrames.length) return;
        if (!this.lastFrameTime) {
            this.lastFrameTime = timeStamp;
            return;
        }

        const delta = timeStamp - this.lastFrameTime;
        if (delta < this.animSpeed) return;

        this.lastFrameTime = timeStamp;
        this.currentFrameIdx = (this.currentFrameIdx + 1) % this.currentFrames.length;
        this.currentFrame = this.currentFrames[this.currentFrameIdx];
    }
}
