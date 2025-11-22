// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import { DynamicSprite, ImgHub, Scene } from "./index.js";

// Enemies Instances
export class BigBoss extends DynamicSprite {
    W = 240;
    H = 240;
    worldX = 0;
    worldY = 160;
    lastMoveTime = 0;

    mode = "walk";
    animSpeed = 120;
    state = "idle"; // idle, attacking, returning
    stateTimer = 0;

    constructor() {
        super();
        this.FRAMES = ImgHub.IMGS.boss;
        this.worldX = Scene.WORLD_WIDTH - this.W - 40; // place near right edge of screen 2
        this.speed = 80;
        this.setMode(this.mode);
    }

    setMode(newMode) {
        if (this.mode === newMode && this.currentFrames?.length) return;
        this.mode = newMode;
        let frames = this.FRAMES.walk;
        if (this.mode === "walk") frames = this.FRAMES.walk;
        if (this.mode === "alert") frames = this.FRAMES.alert;
        if (this.mode === "attack") frames = this.FRAMES.attack;
        if (this.mode === "hurt") frames = this.FRAMES.hurt;
        if (this.mode === "dead") frames = this.FRAMES.dead;
        this.setAnimationFrames(frames);
    }

    update(timeStamp) {
        this.handleBehavior(timeStamp);
        this.animate(timeStamp);
        this.updateScreenPosition();
    }

    handleBehavior(timeStamp) {
        const hero = Scene.PEPE;
        if (!hero) return;

        const distance = hero.worldX - this.worldX;
        const isNear = Math.abs(distance) <= 250;
        const delta = (timeStamp - (this.lastMoveTime || timeStamp)) / 1000;

        if (this.state === "returning") {
            this.setMode("walk");
            this.worldX += this.speed * delta;
            const targetX = Scene.WORLD_WIDTH - this.W - 40;
            if (this.worldX >= targetX) {
                this.worldX = targetX;
                this.state = "idle";
            }
        } else if (isNear) {
            this.setMode("walk");
            const direction = Math.sign(distance);
            this.worldX += direction * this.speed * delta;
            const minX = Scene.WIDTH; // start of screen 2
            const maxX = Scene.WORLD_WIDTH - this.W;
            if (this.worldX < minX) this.worldX = minX;
            if (this.worldX > maxX) this.worldX = maxX;
            this.state = "attacking";
            this.stateTimer = 0;
        } else {
            this.setMode("alert");
            if (this.state === "attacking") {
                this.state = "idle";
                this.stateTimer = 0;
            } else {
                this.stateTimer += delta;
                if (this.stateTimer >= 3) {
                    this.state = "returning";
                }
            }
        }

        this.lastMoveTime = timeStamp;
    }

    updateScreenPosition() {
        this.pX = this.worldX - Scene.CAMERA_X;
        this.pY = this.worldY;
    }

    draw(ctx) {
        if (!this.currentFrame) return;

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
