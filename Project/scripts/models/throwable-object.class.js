import { randomBetween } from "../utils/utils.js";
import { ImgHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";
import { Chicken } from "./chicken.class.js";
import { Endboss } from "./endboss.class.js";
import { AudioHub } from "./audioHub.class.js";


/**
 * @class Throwable bottle.
 */
export class ThrowableObject extends MovableObject {
    // #region Attributes
    x = 100;
    y = 375;
    width = 50;
    height = 50;

    status = {
        isNew: true,               // Still on ground, not collected
        isPickedUp: false,         // Inside Pepe's arsenal
        isOnAir: false,            // Currently flying
        isThrown: false,
        IsSplashed: false,         // Show my Splash animation
    };

    offset = {
        top: this.height / 5,
        bottom: this.height / 6,
        left: this.width / 4,
        right: this.width / 4,
    };

    throwDirection = false;                     // false -> facing Right, true -> facing Left
    throwSpeedX = 10;
    throwSpeedY = 25;
    groundY = 375;

    // IMAGE_SINGLE = ImgHub.IMGS.bottles.single; // No Array (Just a Photo-Path)
    IMAGE_GROUND = ImgHub.IMGS.bottles.ground[Math.random() < 0.5 ? 0 : 1];
    IMAGES_ROTATION = ImgHub.IMGS.bottles.rotation;
    IMAGES_SPLASH = ImgHub.IMGS.bottles.splash;
    // #endregion Attributes

    // #region Instance Methods
    /**
     * @param {object} [param0]
     * @param {number} [param0._x] Optional initial x-position.
     */
    constructor({ _x } = {}) {
        super();
        this.x = _x ? _x : randomBetween(100, 720 * 4 - 400);
        this.loadImage(this.IMAGE_GROUND);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);

        IntervalHub.startInterval(this.animate, 1000 / 60);
        IntervalHub.startInterval(this.updateFlight, 1000 / 60);
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);

    }

    /**
     * Update current Animation based on bottle state.
     */
    animate = () => {
        if (this.status.IsSplashed) {
            this.setAnimation(this.IMAGES_SPLASH);
            return;
        }

        if (this.status.isNew) {
            this.loadImage(this.IMAGE_GROUND);
            return;
        }
        if (this.status.isPickedUp) {
            this.loadImage("") // Don't show it at Canvas
            return;
        }
        if (this.status.isOnAir) {
            this.setAnimation(this.IMAGES_ROTATION);
            return;
        }
        this.loadImage(this.IMAGE_GROUND);
    }

    /**
     * triggers the bottle for flight from a given position and direction.
     * @param {object} [param0]
     * @param {number} [param0._x] Start x-position.
     * @param {number} [param0._y] Start y-position.
     * @param {boolean} [param0._throwDirection] Throw direction (false right / true left).
     */
    triggerThrow({ _x, _y, _throwDirection } = {}) { // Called from Pepe
        this.throwDirection = _throwDirection;
        this.x = _x;
        this.y = _y;
        this.status.isNew = false;
        this.status.isPickedUp = false;
        this.status.isOnAir = true;
        this.status.isThrown = true;
        this.status.IsSplashed = false;
        this.speedY = this.throwSpeedY;
    }

    /**
     * Update Flasche-flight, handle ground contact or enemy hits.
     */
    updateFlight = () => {
        if (!this.status.isThrown || this.status.IsSplashed) return;

        this.x += this.throwDirection ? -this.throwSpeedX : this.throwSpeedX;
        this.y -= this.speedY;
        this.speedY -= this.acceleration;

        this.checkEnemyHit();

        if (this.hasHitGround()) {
            this.y = this.groundY;
            this.status.isOnAir = false;
            this.status.isThrown = false;
            this.splashIt();
        }
    }

    hasHitGround() { return this.y >= this.groundY; }

    /**
     * Check collision against enemies and handle impact.
     */
    checkEnemyHit = () => {
        this.getRealFrame();

        for (const enemy of this.world.level.enemies) {
            if (enemy.dead) continue;
            enemy.getRealFrame();
            if (!this.isColliding(enemy)) continue;

            this.status.isOnAir = false;
            this.status.isThrown = false;
            this.handleEnemyImpact(enemy);
            this.splashIt();
            break;
        }
    }

    /**
     * handle impact.
     * @param {MovableObject} enemy
     */
    handleEnemyImpact(enemy) {
        if (enemy instanceof Chicken) enemy.die();
        if (enemy instanceof Endboss) enemy.hit();
    }

    /**
     * Show splash animation, play sound, and central-removal.
     */
    splashIt() { // die 
        if (this.status.IsSplashed) return;
        this.status.IsSplashed = true;
        AudioHub.playOne(AudioHub.SOUNDS.throwable.bottleBreak);

        setTimeout(() => {
            this.world.level.bottles = this.world.level.bottles.filter(bottle => bottle !== this);
        }, 1000);
    }

    // #endregion Instance Methods
}
