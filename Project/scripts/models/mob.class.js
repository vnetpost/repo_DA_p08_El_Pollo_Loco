// import * as Utils from "../utils/utils.js";
import * as Utils from "../utils/utils.js";
import { DynamicSprite, ImgHub } from "./index.js";

// Enemy chickens
export class Mob extends DynamicSprite {

    // Static list with all Gallinitas (optional game-wide registry)
    static GALLINITAS = [];

    // Basic size & position on the ground
    pY = 330;
    W = 40;
    H = 40;

    // --- Animation state ---
    mode = "walk";               // "walk" | "dead"
    currentFrames = [];          // Array of HTMLImageElement
    frameIndex = 0;              // Current index in currentFrames
    frameDuration = 150;         // Milliseconds per frame (animation speed)
    elapsedTime = 0;             // Accumulated time for frame switching
    lastTime = 0;                // Last timestamp from RAF

    // --- Movement state ---
    speedX = 40;                 // Pixels per second to the left (slow)

    constructor() {
        super();

        // All chicken frames from ImgHub
        this.FRAMES = ImgHub.IMGS.chickens.normal;

        // Initial mode & frames
        this.setCurrentFrames();
        this.currentFrame = this.currentFrames[this.frameIndex];

        // Random start position on X axis
        this.pX = Utils.setRandomXposition();
    }

    // ------------------------------------------------------------------
    // Selects the correct frame array depending on the current mode
    // ------------------------------------------------------------------
    setCurrentFrames() {
        if (this.mode === "walk") {
            this.currentFrames = this.FRAMES.walk;   // [img1, img2, img3]
        } else if (this.mode === "dead") {
            this.currentFrames = this.FRAMES.dead;   // [deadImage] (array!)
        }

        // Safety: avoid out-of-bounds frameIndex
        if (this.frameIndex >= this.currentFrames.length) {
            this.frameIndex = 0;
        }
    }

    // ------------------------------------------------------------------
    // Public helper: change mode from outside (e.g. on collision)
    // ------------------------------------------------------------------
    setMode(newMode) {
        if (this.mode === newMode) return;
        this.mode = newMode;
        this.setCurrentFrames();
        this.frameIndex = 0;
        this.elapsedTime = 0;
        this.currentFrame = this.currentFrames[this.frameIndex];
    }

    // ------------------------------------------------------------------
    // Called every frame from Scene.sceneLoop(timeStamp)
    // Handles animation + movement
    // ------------------------------------------------------------------
    update(timeStamp) {
        this.updateAnimation(timeStamp);
        this.updateMovement(timeStamp);
    }

    // ------------------------------------------------------------------
    // Time-based animation using requestAnimationFrame timestamp
    // ------------------------------------------------------------------
    updateAnimation(timeStamp) {
        // First call: init lastTime and skip animation step
        if (!this.lastTime) {
            this.lastTime = timeStamp;
            return;
        }

        const delta = timeStamp - this.lastTime; // ms since last frame
        this.lastTime = timeStamp;

        // Dead mode → no animation, keep single frame
        if (this.mode === "dead") {
            return;
        }

        // Accumulate time and switch to next frame when frameDuration reached
        this.elapsedTime += delta;

        if (this.elapsedTime >= this.frameDuration) {
            this.elapsedTime -= this.frameDuration;

            // Next frame in cycle
            this.frameIndex = (this.frameIndex + 1) % this.currentFrames.length;
            this.currentFrame = this.currentFrames[this.frameIndex];
        }
    }

    // ------------------------------------------------------------------
    // Moves the chicken slowly to the left
    // ------------------------------------------------------------------
    updateMovement(timeStamp) {
        if (!this.lastMoveTime) {
            this.lastMoveTime = timeStamp;
            return;
        }

        const delta = timeStamp - this.lastMoveTime;  // ms since last move
        this.lastMoveTime = timeStamp;

        // Dead chickens do not move
        if (this.mode === "dead") return;

        // Convert ms → seconds
        const deltaSeconds = delta / 1000;

        // Move to the left: x = x - speed * time
        this.pX -= this.speedX * deltaSeconds;

        // Optional: if Mob walks out of screen on the left, respawn on right
        if (this.pX + this.W < 0) {
            this.pX = 720 + Utils.setRandomXposition();  // 720 = Scene.WIDTH
        }
    }

    // ------------------------------------------------------------------
    // Render chicken on canvas
    // ------------------------------------------------------------------
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
