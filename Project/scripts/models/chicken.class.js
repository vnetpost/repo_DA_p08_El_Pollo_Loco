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

    offset = {
        top: this.height / 6,
        bottom: this.height / 6,
        left: this.width / 6,
        right: this.width / 6
    };

    IMAGES_WALKING = ImgHub.IMGS.chickens.normal.walk;
    IMAGES_DEAD = ImgHub.IMGS.chickens.normal.dead;
    IMAGES_DEAD = ImgHub.IMGS.chickens.normal.dead;


    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = randomBetween(300, 720 * 4);
        this.speed += randomBetween(1, 5);

        IntervalHub.startInterval(this.animate, 1000 / 10);
        IntervalHub.startInterval(this.moveLeft, 1000 / 10);
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
    }

    animate = () => this.playAnimation(this.IMAGES_WALKING);


}
