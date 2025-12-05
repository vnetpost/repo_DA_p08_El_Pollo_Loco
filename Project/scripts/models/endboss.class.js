import { ImgHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";
import { AudioHub } from "./audioHub.class.js";

/**
 * @class Endboss enemy with alert/attack behavior, sounds and animations.
 */
export class Endboss extends MovableObject {
    // #region Attributes
    width = 200;
    height = 250;
    x = 720 * 4 - this.width;                  
    y = 190;

    speed = 5;
    alertRange = 720 / 2;
    attackRange = 720 / 3;
    alertDuration = 1000;                          // ms to show alert frames before walking

    sinceAlerted;                                  // MS
    sinceAttacking;                                // MS

    offset = {
        top: this.height / 5,
        bottom: this.height / 5,
        left: this.width / 8,
        right: this.width / 7
    };
    
    status = {
        isActivated: false,
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

    SOUNDS_ENDBOSS = AudioHub.SOUNDS.endboss;

    // #endregion Attributes

    /**
     * Initialize endboss Figur, sounds and timers.
     */
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

    /**
     * Choose the correct animation based on current state.
     */
    animate = () => {
        this.updateAttackSoundState();

        if (!this.status.isActivated && !this.status.isAlerted && !this.status.isAttacking) {
            this.currentImage = this.imageCache[this.IMAGES_WALKING[3]];
            return;
        }
        if (this.isDead) {
            this.setAnimation(this.IMAGES_DEAD);
            return;
        }
        if (this.isHurt()) { // go to Hurt-mode because of lastHit-Time
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

    /**
     * Play or stop alert/attack sounds depending on state.
     */
    updateAttackSoundState = () => {
        const attackSound = this.SOUNDS_ENDBOSS.attack;
        const alertSound = this.SOUNDS_ENDBOSS.approach;

        const mussPlayAttacking = this.status.isAttacking && !this.isDead;
        if (mussPlayAttacking && attackSound.paused) {
            AudioHub.playOne(attackSound);
            // attackSound.volume = 1;
        }
        else if (!mussPlayAttacking && !attackSound.paused) AudioHub.stopOne(attackSound);

        const mussPlayAlerting = this.status.isAlerted && !this.isDead;
        if (mussPlayAlerting && alertSound.paused) {
            AudioHub.playOne(alertSound);
            // alertSound.volume = 1;
        } else if (!mussPlayAlerting && !alertSound.paused) AudioHub.stopOne(alertSound);
    }

    /**
     * Walk left.
     */
    moveLeft = () => {
        if (!this.status.isActivated || this.status.isAlerted || this.isDead) return;
        this.x -= this.speed;
        if (this.x <= 0) this.x = 0;
    }

    /**
     * Apply damage to the endboss and mark hurt/death states.
     */
    hit = () => {
        this.energy > 0 ? this.energy -= 10 : this.isDead = true;
        this.status.isHurt = true;
        this.lastHit = Date.now();
    }

    /**
     * Update behavior flags based on distance to the player.
     */
    updateBehavior = () => {
        if (!this.world.character || this.isDead) return;

        const distance = this.getDistance();
        const inAttackRange = distance < this.attackRange;
        const inAlertRange = distance < this.alertRange;

        if (!inAlertRange && !inAttackRange) {  // Trigger Walk-Anim
            this.status.isAttacking = false;
            this.status.isAlerted = false;
            this.status.isWalking = this.status.isActivated; // stay idle frame until activated once
            return;
        }
        if (inAttackRange) {                    // Trigger Attack-Anim
            this.status.isAttacking = true;
            this.status.isAlerted = false;
            this.status.isWalking = false;
            return;
        }
        if (inAlertRange) {                     // Trigger Alert-Anim 
            this.status.isActivated = true;

            this.status.isAttacking = false;
            this.status.isAlerted = true;
            this.status.isWalking = false;
            return;
        }
    }

    /**
     * Harizontal distance between endboss and character.
     * @returns {number}
     */
    getDistance() {
        return Math.abs(
            (this.world.camera_x + this.world.character.x + this.world.character.width / 2) -
            (this.world.camera_x + this.x + this.width / 2)
        );
    }

    /**
     * Track when alert started.
     */
    updateSinceAlerted() { this.sinceAlerted = Date.now(); }
    /**
     * Track when attack started.
     */
    updateSinceAttaking() { this.sinceAttacking = Date.now(); }


    // #endregion Instance Methods
}
