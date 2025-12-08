import { DrawableObject } from "./drawable-object.class.js";

/**
 * @class Base class for moveable entities.
 */
export class MovableObject extends DrawableObject {
    // #region Attributes    
    rX;
    rY;
    rW;
    rH;

    world;
    isDead = false;
    speed = 0.15;

    speedY = 0;
    acceleration = 1.7;
    energy = 100;
    lastHit = 0;

    offset = {
        top: this.height / 2,
        bottom: this.height / 10,
        left: this.width / 3,
        right: this.width / 3
    };
    // #endregion Attributes

    constructor() { super(); }

    // #region Instance Methods

    /**
     * Apply gravity.
     */
    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;

            if (this.y > 266) {
                this.y = 266;
                this.speedY = 0;
            }
        }
    }

    /**
     * Check if the object is above ground.
     * @returns {boolean}
     */
    isAboveGround() { return this.y < 266; }

    /**
     * Move left.
     */
    moveLeft = () => { !(this.x + this.width <= 0) ? this.x -= this.speed : this.x = 720 * 4 + this.width; }

    /**
     * Determine if the object is in a hurt state based on time seit last hit.
     * @returns {boolean}
     */
    isHurt() { return Date.now() - this.lastHit < 500; }

    /**
     * Apply damage and set dead flag if energy is zero.
     */
    hit() {
        this.energy > 0 ? this.energy -= 1 : this.isDead = true;
        this.lastHit = Date.now();
    }

    /**
     * collision check.
     * @param {MovableObject} mO
     * @returns {boolean}
     */
    isColliding = (mO) => {
        return this.rX + this.rW > mO.rX &&
            this.rY + this.rH > mO.rY &&
            this.rX < mO.rX + mO.rW &&
            this.rY < mO.rY + mO.rH;
    }

    // #endregion Instance Methods
}
