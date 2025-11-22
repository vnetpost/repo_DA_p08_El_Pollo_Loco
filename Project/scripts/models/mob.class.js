// mob.class.js
import * as Utils from "../utils/utils.js";
import { DynamicSprite, ImgHub, Scene } from "./index.js";

export class Mob extends DynamicSprite {

    static GALLINITAS = [];

    // Basic size & position
    W = 40;
    H = 40;
    worldX = 0;
    worldY = 330;

    // Frames from ImgHub
    FRAMES = ImgHub.IMGS.chickens.normal;

    // Animation state
    mode = "walk";              // walk | dead
    animSpeed = 150;            // Milliseconds per frame

    // Movement state
    speedX = 40;
    lastMoveTime = 0;

    constructor() {
        super();

        // Random X start in world space
        this.worldX = Utils.setRandomXposition();

        // Init frames
        this.setCurrentFrames();
    }

    // Select frames based on mode
    setCurrentFrames() {
        const frames = this.mode === "walk" ? this.FRAMES.walk : this.FRAMES.dead;
        this.setAnimationFrames(frames);
    }

    // Change mode externally
    setMode(newMode) {
        if (this.mode === newMode) return;
        this.mode = newMode;
        this.setCurrentFrames();
    }

    // Called every frame from Scene.sceneLoop(timeStamp).
    // Updates animation and movement.
    update(timeStamp) {
        this.animate(timeStamp);
        this.move(timeStamp);
        this.updateScreenPosition();
    }

    shouldAnimate() {
        return this.mode !== "dead" && super.shouldAnimate();
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
        this.worldX -= this.speedX * deltaSeconds;

        // Respawn on right side after leaving screen
        if (this.worldX + this.W < 0)
            this.worldX = Scene.WORLD_WIDTH + Utils.randomBetween(150, 450);
    }

    updateScreenPosition() {
        this.pX = this.worldX - Scene.CAMERA_X;
        this.pY = this.worldY;
    }

    // Draw on canvas
    draw(ctx) {
        const screenX = this.worldX - Scene.CAMERA_X;
        ctx.drawImage(
            this.currentFrame,
            screenX,
            this.worldY,
            this.W,
            this.H
        );
    }
}
