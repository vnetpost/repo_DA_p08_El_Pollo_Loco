import { randomBetween } from "../utils/utils.js";
import { ImgHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";


export class ThrowableObject extends MovableObject {
    x = 100;
    y = 375;
    width = 50;
    height = 50;

    status = {
        isNew: true,            // Still On Ground
        isCarrying: false,
        isOnAir: false,
        IsCollided: false,
    };

    offset = {
        top: this.height / 5,
        bottom: this.height / 6,
        left: this.width / 4,
        right: this.width / 4,
    };

    throwDirection;

    // IMAGE_SINGLE = ImgHub.IMGS.bottles.single; // No Array (Just a Photo-Path)
    IMAGE_GROUND = ImgHub.IMGS.bottles.ground[Math.random() < 0.5 ? 0 : 1];
    IMAGES_ROTATION = ImgHub.IMGS.bottles.rotation;
    IMAGES_SPLASH = ImgHub.IMGS.bottles.splash;

    constructor({ } = {}) {
        super();
        this.x = this.x = randomBetween(100, 720 * 4);
        // this.loadImage(this.IMAGE_SINGLE);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);

        IntervalHub.startInterval(this.animate, 1000 / 10);
        // IntervalHub.startInterval(this.throw, 1000 / 60); // Set this.speedY = 25 to trigger applyGravity
        IntervalHub.startInterval(this.applyGravity, 1000 / 60); // using this.speedY as a trigger
        // IntervalHub.startInterval(this.checkCollisions, 1000 / 60);
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);

    }

    animate = () => {
        if (this.status.IsSplashed) return;

        if (this.status.isNew) {
            // console.log("here");
            this.loadImage(this.IMAGE_GROUND);
            return;
        }
        if (this.status.isCarrying) {
            this.loadImage("") // Don't show it
            return;
        }
        if (this.status.isOnAir) {
            this.setAnimation(this.IMAGES_ROTATION);
            return;
        }
        if (this.isOnGround() || this.status.IsCollided) {
            this.setAnimation(this.IMAGES_SPLASH);
            this.status.isAvailable = false;
            splashIt();
            return;
        }
    }

    triggerThrow({ _x, _y, _direction } = {}) { // Just One time durch Pepe
        this.throwDirection = _direction;
        this.x = _x;
        this.y = _y;
        this.status.isCarrying = false;
        this.status.isOnAir = true;
        this.speedY = 25;
    }

    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            if (this.y > 375) { // Reset Pepe Y-Achse Position
                this.y = 375;
                this.speedY = 0;
                // this.currentImage = this.imageCache[this.IMAGES_IDLE_SHORT[0]];
                // this.currentImageIndex = 0;
            }
        }
    }

    isOnGround() { return this.y === 375; }
    isAboveGround() { return this.y < 375; }

    splashIt() { // die 
        if (this.status.IsSplashed) return;
        this.status.IsSplashed = true;
        setTimeout(() => {
            this.world.bottles = this.world.bottles.filter(bottle => bottle !== this);
        }, 1000);
    }

}