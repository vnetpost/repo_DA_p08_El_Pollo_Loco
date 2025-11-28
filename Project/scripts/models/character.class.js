import { ImgHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";



export class Character extends MovableObject {

    // #region Attributes
    width = 80;
    height = 160;
    x = 50;
    y = 266;
    world;
    statusbar;
    speed = 2.5;

    // Flags
    collided = false;

    offset = {
        top: this.height / 2,
        bottom: this.height / 10,
        left: this.width / 3,
        right: this.width / 3
    };

    IMAGES_IDLE_SHORT = ImgHub.IMGS.pepe.idle.short;
    IMAGES_IDLE_LONG = ImgHub.IMGS.pepe.idle.long;
    IMAGES_WALKING = ImgHub.IMGS.pepe.walk;
    IMAGES_JUMPING = ImgHub.IMGS.pepe.jump;
    IMAGES_HURT = ImgHub.IMGS.pepe.hurt;
    IMAGES_DEAD = ImgHub.IMGS.pepe.dead;
    currentAnimation = this.IMAGES_IDLE_SHORT;

    // #endregion Attributes

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_IDLE_SHORT);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        IntervalHub.startInterval(this.animate, 1000 / 10);
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
        IntervalHub.startInterval(this.moveCamera, 1000 / 60);
        IntervalHub.startInterval(this.moveLeft, 1000 / 60);
        IntervalHub.startInterval(this.moveRight, 1000 / 60);
        IntervalHub.startInterval(this.jump, 1000 / 60);
        IntervalHub.startInterval(this.applyGravity, 1000 / 60);
        IntervalHub.startInterval(this.checkCollisions, 1000 / 60);
    }

    // #region Instance Methods    

    animate = () => {

        if (this.isDead()) {
            this.setAnimation(this.IMAGES_DEAD);
            return;
        }
        if (this.isHurt()) {
            this.setAnimation(this.IMAGES_HURT);
            this.world.statusBar_health.setPrecentage(this.energy);
            return;
        }
        if (this.isAboveGround()) {
            this.setAnimation(this.IMAGES_JUMPING);
            return;
        }
        if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
            this.setAnimation(this.IMAGES_WALKING);
            return;
        }

        this.setAnimation(this.IMAGES_IDLE_SHORT);
    }

    moveLeft = () => {
        if (this.world.keyboard.LEFT) {
            this.otherDirection = true;
            this.x -= this.speed;
            if (this.x <= 0) this.x = 0;
            // this.walking_sound.play();
        }
    }

    moveRight = () => {
        if (this.world.keyboard.RIGHT) {
            this.otherDirection = false;
            this.x += this.speed;
            if (this.x + this.width >= 720 * 4) this.x = 720 * 4 - this.width;
        }
    }

    jump = () => { if (this.world.keyboard.UP && !this.isAboveGround()) this.speedY = 25; }

    moveCamera = () => {
        this.world.camera_x = -this.x + 200;
        if (this.world.camera_x > 0) this.world.camera_x = 0;
        if (this.world.camera_x < -720 * 3) this.world.camera_x = -720 * 3;
    }

    checkCollisions = () => {
        // refresh Instance-Grenze before comparing
        this.getRealFrame();
        let collided = false;

        this.world.level.enemies.forEach((enemy, idx) => {
            enemy.getRealFrame();

            if (this.isColliding(enemy)) {
                collided = true;
                this.hit();
                console.log("Enemy", idx, "collided", "Energy=", this.energy);
            }
        });

        this.collided = collided;
    }
    // #endregion Instance Methods

}
