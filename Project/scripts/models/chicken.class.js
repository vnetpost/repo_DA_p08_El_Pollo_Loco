import { randomBetween } from "../utils/utils.js";
import { AudioHub } from "./audioHub.class.js";
import { ImgHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";


/**
 * @class Chicken enemy that patrolls leftwards and can die.
 */
export class Chicken extends MovableObject {
    // #region Attributes
    width = 45;
    height = 45;
    x;
    y = 377;

    speed = 1.5;
    removalTimeout;

    offset = {
        top: this.height / 6,
        bottom: this.height / 6,
        left: this.width / 6,
        right: this.width / 6
    };

    IMAGES_WALKING;
    IMAGES_DEAD;
    // #endregion Attributes

    // #region Instance Methods
    /**
     * @param {object} [param0]
     * @param {number} [param0._x] Optional starting x-position.
     */
    constructor({ _x } = {}) {
        super();
        const variant = Math.random() < 0.5 ? "normal" : "small";
        if (variant === "small") {
            this.width = 30;
            this.height = 30;
            this.y = 390;
        }

        this.IMAGES_WALKING = ImgHub.IMGS.chickens[variant].walk;
        this.IMAGES_DEAD = ImgHub.IMGS.chickens[variant].dead;

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = _x ? _x : randomBetween(300, 720 * 4);
        this.speed += randomBetween(1, 5);

        IntervalHub.startInterval(this.animate, 1000 / 10);
        IntervalHub.startInterval(this.moveLeft, 1000 / 10);
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
    }

    /**
     * Animate walking or dead frame based on state.
     */
    animate = () => {
        if (this.isDead) {
            this.setAnimation(this.IMAGES_DEAD);
            return;
        }
        this.setAnimation(this.IMAGES_WALKING);
    }

    /**
     * Move left continuously.
     */
    moveLeft = () => {
        if (this.isDead) return;
        !(this.x + this.width <= 0) ? this.x -= this.speed : this.x = 720 * 4 + this.width;
    }

    /**
     * Kill the chicken, play sound and schedule removal.
     */
    die = () => {
        if (this.isDead) return;
        this.isDead = true;
        AudioHub.playOne(AudioHub.SOUNDS.chicken.deadA);
        this.speed = 0;
        this.currentImageIndex = 0;
        setTimeout(() => {
            this.world.level.enemies = this.world.level.enemies.filter(enemy => enemy !== this);
        }, 3000);
    }

    // #endregion Instance Methods
}
