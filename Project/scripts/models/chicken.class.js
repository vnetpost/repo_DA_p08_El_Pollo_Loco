import { randomBetween, setRandomXposition } from "../utils/utils.js";
import { ImgHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";


export class Chicken extends MovableObject {
    width = 45;
    height = 45;
    x;
    y = 377;

    speed = 1.5;
    dead = false;
    removalTimeout;

    offset = {
        top: this.height / 6,
        bottom: this.height / 6,
        left: this.width / 6,
        right: this.width / 6
    };

    IMAGES_WALKING;
    IMAGES_DEAD;


    constructor() {
        super();
        const variant = Math.random() < 0.5 ? "normal" : "small";
        this.IMAGES_WALKING = ImgHub.IMGS.chickens[variant].walk;
        this.IMAGES_DEAD = ImgHub.IMGS.chickens[variant].dead;

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = randomBetween(300, 720 * 4);
        this.speed += randomBetween(1, 5);

        IntervalHub.startInterval(this.animate, 1000 / 10);
        IntervalHub.startInterval(this.moveLeft, 1000 / 10);
        // IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
    }

    animate = () => {
        if (this.dead) {
            this.setAnimation(this.IMAGES_DEAD);
            return;
        }
        this.setAnimation(this.IMAGES_WALKING);
    }

    moveLeft = () => {
        if (this.dead) return;
        !(this.x + this.width <= 0) ? this.x -= this.speed : this.x = 720 * 4 + this.width;
    }

    die = () => {
        if (this.dead) return;
        this.dead = true;
        this.speed = 0;
        this.currentImageIndex = 0;
        // this.setAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.world.level.enemies = this.world.level.enemies.filter(enemy => enemy !== this);
        }, 3000);
    }

}
