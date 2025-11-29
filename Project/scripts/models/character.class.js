import { ImgHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";


export class Character extends MovableObject {

    // #region Attributes
    x = 50;
    y = 266;
    width = 80;
    height = 160;
    speed = 2.5;

    // Flags
    collided = false;
    lastActiveTime = Date.now();
    timeToNap = 2000;                               // Mili Second

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

    arsenal = [];                                   // [ThrowableObject,ThrowableObject,...]

    // currentAnimation = this.IMAGES_IDLE_SHORT;
    // isBored = false;

    // #endregion Attributes

    constructor() {
        super();
        this.loadImage(this.IMAGES_IDLE_SHORT[0]); // Init

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_IDLE_SHORT);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        IntervalHub.startInterval(this.animate, 1000 / 10);
        // IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
        IntervalHub.startInterval(this.moveCamera, 1000 / 60);
        IntervalHub.startInterval(this.moveLeft, 1000 / 60);
        IntervalHub.startInterval(this.moveRight, 1000 / 60);
        IntervalHub.startInterval(this.jump, 1000 / 60); // Set this.speedY = 25 to trigger applyGravity
        IntervalHub.startInterval(this.applyGravity, 1000 / 60); // this.speedY as a trigger
        IntervalHub.startInterval(this.checkCollisions, 1000 / 60);
        IntervalHub.startInterval(this.collectBottles, 1000 / 60);
    }

    // #region Instance Methods    

    animate = () => {
        if (this.isDead()) {
            this.setAnimation(this.IMAGES_DEAD);
            // IntervalHub.stopAllIntervals();
            return;
        }
        if (this.isHurt()) {
            this.updateLastActiveTime();
            this.setAnimation(this.IMAGES_HURT);
            this.world.statusBar_health.setPrecentage(this.energy);
            return;
        }
        if (this.isAboveGround()) {
            this.updateLastActiveTime();
            this.setAnimation(this.IMAGES_JUMPING);
            return;
        }
        if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
            this.updateLastActiveTime();
            this.setAnimation(this.IMAGES_WALKING);
            return;
        }

        const inactiveLongEnough = (Date.now() - this.lastActiveTime) >= this.timeToNap;
        this.setAnimation(inactiveLongEnough ? this.IMAGES_IDLE_LONG : this.IMAGES_IDLE_SHORT);
    }

    moveLeft = () => {
        if (this.world.keyboard.LEFT) {
            this.updateLastActiveTime();
            this.otherDirection = true;
            this.x -= this.speed;
            if (this.x <= 0) this.x = 0;
            // this.walking_sound.play();
        }
    }

    moveRight = () => {
        if (this.world.keyboard.RIGHT) {
            this.updateLastActiveTime();
            this.otherDirection = false;
            this.x += this.speed;
            if (this.x + this.width >= 720 * 4) this.x = 720 * 4 - this.width;
        }
    }

    jump = () => {
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.updateLastActiveTime();
            this.speedY = 25;
        }
    }

    moveCamera = () => {
        this.world.camera_x = -this.x + 200;
        if (this.world.camera_x > 0) this.world.camera_x = 0;
        if (this.world.camera_x < -720 * 3) this.world.camera_x = -720 * 3;
    }

    checkCollisions = () => {
        this.getRealFrame(); // refresh Instance-Grenze before comparing
        let collided = false;

        this.world.level.enemies.forEach((enemy, idx) => {
            if (enemy.dead) return;
            enemy.getRealFrame();

            if (this.isColliding(enemy)) {
                this.updateLastActiveTime();
                if (this.isTrampling(enemy) && enemy.die) { // 
                    this.energy += 5
                    if (this.energy > 100) this.energy = 100;
                    enemy.die();
                } else {
                    collided = true;
                    this.hit();
                    console.log(`Pepe (${this.energy}) colided with Enemy ${idx}`);
                }
            }
        });

        this.collided = collided;
    }

    updateLastActiveTime = () => { this.lastActiveTime = Date.now(); }

    isTrampling = (enemy) => {
        const isFalling = this.speedY < 0;
        const isCharacterAboveEnemy = this.rY + this.rH >= enemy.rY;
        return isFalling && isCharacterAboveEnemy;
    }

    collectBottles = () => {
        this.getRealFrame();


        this.world.level.bottles.forEach((bottle, idx) => {
            if (!bottle.status.isNew) return;
            console.log(`Pepe (${this.energy}) colided with Bottle ${idx}`);
            bottle.status.isNew = false;
            bottle.getRealFrame();
            if (this.isColliding(bottle)) {
                // this.updateLastActiveTime(); // nicht noetig, da die Bottle sich nicht bewegen
                bottle.status.isPickedUp = true;
                this.arsenal.push(bottle);
            }

        });
    }

    // #endregion Instance Methods

}
