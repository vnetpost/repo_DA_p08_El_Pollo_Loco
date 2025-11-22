// hero.class.js
import { DynamicSprite, ImgHub, Scene } from "./index.js";

export class Hero extends DynamicSprite {

    // Screen position (wird aus worldX + Kamera berechnet)
    pX = 50;
    pY = 225;
    W = 70;
    H = 150;

    // World position
    worldX = 50;        // Hero position in world space
    worldY = 225;       // hier identisch mit pY, aber vorbereitet für später

    // Movement
    speedX = 200;
    velY = 0;
    gravity = 900;
    jumpStrength = -500;
    onGround = true;
    lastMoveTime = 0;

    // Frames
    FRAMES = ImgHub.IMGS.pepe;

    // Animation state
    mode = "idleShort";
    animSpeed = 80;

    joystick;
    facing = 1; // 1 = right, -1 = left

    constructor(joystick) {
        super();
        this.joystick = joystick;
        this.setCurrentFrames();
    }

    setCurrentFrames() {
        let frames = this.FRAMES.idle.short;
        if (this.mode === "idleLong") frames = this.FRAMES.idle.long;
        if (this.mode === "walk") frames = this.FRAMES.walk;
        if (this.mode === "jump") frames = this.FRAMES.jump;
        if (this.mode === "hurt") frames = this.FRAMES.hurt;
        if (this.mode === "dead") frames = this.FRAMES.dead;
        this.setAnimationFrames(frames);
    }

    setMode(newMode) {
        if (this.mode === newMode) return;
        this.mode = newMode;
        this.setCurrentFrames();
    }

    update(timeStamp) {
        this.handleInput();
        this.animate(timeStamp);
        this.move(timeStamp);
        this.updateScreenPosition();
        this.updateCamera();
    }

    handleInput() {
        const j = this.joystick;

        if (!this.onGround) {
            this.setMode("jump");
            return;
        }

        if (j.left || j.right) {
            this.setMode("walk");
            if (j.left) this.facing = -1;
            if (j.right) this.facing = 1;
        } else {
            this.setMode("idleShort");
        }

        if (j.jump && this.onGround) {
            this.velY = this.jumpStrength;
            this.onGround = false;
            this.setMode("jump");
        }
    }

    move(timeStamp) {
        if (!this.lastMoveTime) {
            this.lastMoveTime = timeStamp;
            return;
        }

        const delta = timeStamp - this.lastMoveTime;
        this.lastMoveTime = timeStamp;
        const dt = delta / 1000;
        const j = this.joystick;

        if (j.left) this.worldX -= this.speedX * dt;
        if (j.right) this.worldX += this.speedX * dt;

        // clamp to world
        if (this.worldX < 0) this.worldX = 0;
        if (this.worldX + this.W > Scene.WORLD_WIDTH) this.worldX = Scene.WORLD_WIDTH - this.W;

        // gravity
        if (!this.onGround) {
            this.velY += this.gravity * dt;
            this.worldY += this.velY * dt;
        }

        const groundY = 225;
        if (this.worldY >= groundY) {
            this.worldY = groundY;
            this.velY = 0;
            this.onGround = true;
        }
    }

    // compute screen position from worldX and camera
    updateScreenPosition() {
        this.pX = this.worldX - Scene.CAMERA_X;
        this.pY = this.worldY;
    }

    // update camera so hero bleibt ungefähr in der Mitte
    updateCamera() {
        const targetOffset = this.worldX - Scene.WIDTH * 0.4;

        Scene.CAMERA_X = targetOffset;

        if (Scene.CAMERA_X < 0) Scene.CAMERA_X = 0;
        if (Scene.CAMERA_X > Scene.WORLD_WIDTH - Scene.WIDTH)
            Scene.CAMERA_X = Scene.WORLD_WIDTH - Scene.WIDTH;
    }

    draw(ctx) {
        ctx.save();
        if (this.facing === -1) {
            ctx.scale(-1, 1);
            ctx.drawImage(
                this.currentFrame,
                -(this.pX + this.W),
                this.pY,
                this.W,
                this.H
            );
        } else {
            ctx.drawImage(
                this.currentFrame,
                this.pX,
                this.pY,
                this.W,
                this.H
            );
        }
        ctx.restore();
    }
}
