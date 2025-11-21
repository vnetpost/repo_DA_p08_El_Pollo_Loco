// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import * as Utils from "../utils/utils.js";
import { DynamicSprite, ImgHub } from "./index.js";

// Enemies Instances
export class BigBoss extends DynamicSprite {
    pX = 520;
    pY = 190;
    W = 200;
    H = 200;

    constructor() {
        super();
        this.FRAMES = ImgHub.IMGS.boss;
        this.currentFrame = this.FRAMES.attack[4];
        this.setRandomPosition();

    }

    setRandomPosition() {

    }

        draw(ctx) {
        // if (!this.currentFrame) return;

        ctx.drawImage(
            this.currentFrame,
            this.pX,
            this.pY,
            this.W,
            this.H
        );
    }
}