import { ImgHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject {
    // #region Attributes
    width = 200;
    height = 250;
    x = 720 * 4 - this.width;                   // Jeja Start Position
    y = 200;

    speed = 5;
    alertRange = 720 / 3;
    attackRange = 720 / 4;
    alertDuration = 1000;                       // ms to show alert frames before walking

    sinceAlerted;                               // MS
    sinceAttacking;                             // MS
    isActivated = false;

    // distance;                                   // distance With Pepe (always positiv)

    offset = {
        top: this.height / 5,
        bottom: this.height / 5,
        left: this.width / 8,
        right: this.width / 7
    };

    // isDead = false;                          // In MovableObject
    status = {
        isWalking: false,
        isAlerted: false,
        isAttacking: false,
        isHurt: true,
    };

    IMAGES_WALKING = ImgHub.IMGS.boss.walk;
    IMAGES_ALERT = ImgHub.IMGS.boss.alert;
    IMAGES_ATTACK = ImgHub.IMGS.boss.attack;
    IMAGES_HURT = ImgHub.IMGS.boss.hurt;
    IMAGES_DEAD = ImgHub.IMGS.boss.dead;

    // #endregion Attributes

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[3]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        IntervalHub.startInterval(this.animate, 1000 / 10);
        IntervalHub.startInterval(this.moveLeft, 1000 / 10);
        IntervalHub.startInterval(this.updateBehavior, 1000 / 60);
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
    }

    // #region Instance Methods

    animate = () => {
        if (this.isDead) {
            this.setAnimation(this.IMAGES_DEAD);
            return;
        }
        if (this.isHurt()) { // Hurt because of lastHit-Time
            this.setAnimation(this.IMAGES_HURT);
            this.world.statusBar_endboss.setPrecentage(this.energy);
            return;
        }
        if (this.status.isAttacking) {
            this.setAnimation(this.IMAGES_ATTACK);
            return;
        }
        if (this.status.isAlerted) {
            this.setAnimation(this.IMAGES_ALERT);
            return;
        }
        if (this.status.isWalking) {
            this.setAnimation(this.IMAGES_WALKING);
            return;
        }
    }

    moveLeft = () => {
        if (!this.isActivated || this.status.isAlerted || this.status.isAttacking || this.isDead) return;
        this.x -= this.speed;
        if (this.x <= 0) this.x = 0;
    }

    hit = () => {
        this.energy > 0 ? this.energy -= 10 : this.isDead = true;
        this.status.isHurt = true;
        this.lastHit = Date.now();
    }

    updateBehavior = () => {
        // if (!this.world.character || this.isDead) return;

        const distance = this.getDistance();
        const inAttackRange = distance < this.attackRange;
        const inAlertRange = distance < this.alertRange;

        if (!inAlertRange && !inAttackRange) {  // Trigger Walk-Anim
            this.status.isAttacking = false;
            this.status.isAlerted = false;
            this.status.isWalking = true;
            return;
        }
        if (inAlertRange) {                     // Trigger Alert-Anim 
            this.isActivated = true;

            this.status.isAttacking = false;
            this.status.isAlerted = true;
            this.status.isWalking = false;

            this.sinceAlerted = Date.now();
            return;
        }
        if (inAttackRange) {                    // Trigger Attack-Anim
            this.status.isAttacking = true;
            this.status.isAlerted = false;
            this.status.isWalking = false;
            return;
        }
    }

    getDistance() {
        return Math.abs(
            (this.world.camera_x + this.world.character.x + this.world.character.width / 2) -
            (this.world.camera_x + this.x + this.width / 2)
        );
    }

    updateSinceAlerted() { this.sinceAlerted = Date.now(); }
    updateSinceAttaking() { this.sinceAttacking = Date.now(); }
    // #endregion Instance Methods
}
