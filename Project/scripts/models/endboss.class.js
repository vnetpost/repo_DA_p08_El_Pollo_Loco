import { ImgHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject {
    // #region Attributes
    width = 200;
    height = 250;
    x = 500;
    y = 200;

    offset = {
        top: this.height / 5,
        bottom: this.height / 5,
        left: this.width / 8,
        right: this.width / 7
    };

    IMAGES_ALERT = ImgHub.IMGS.boss.alert;
    IMAGES_WALKING = ImgHub.IMGS.boss.walk;
    IMAGES_HURT = ImgHub.IMGS.boss.hurt;
    IMAGES_DEAD = ImgHub.IMGS.boss.dead;
    IMAGES_ATTACK = ImgHub.IMGS.boss.attack;

    // #endregion Attributes

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        IntervalHub.startInterval(this.animate, 1000 / 10);
        // IntervalHub.startInterval(this.moveLeft, 1000 / 60);
        // IntervalHub.startInterval(this.moveRight, 1000 / 60);
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
    }

    // #region Instance Methods

    animate = () => this.playAnimation(this.IMAGES_WALKING);

    moveLeft = () => {
        if (this.world.keyboard.LEFT) {
            this.otherDirection = true;
            this.x -= this.speed;
            if (this.x <= 0) this.x = 0;
        }

    }

    moveRight = () => {
        if (this.world.keyboard.RIGHT) {
            this.otherDirection = false;
            this.x += this.speed;
            if (this.x + this.width >= 720 * 4) this.x = 720 * 4 - this.width;
        }
    }
    // #endregion Instance Methods
}
