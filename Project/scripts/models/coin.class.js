import { randomBetween } from "../utils/utils.js";
import { DrawableObject } from "./drawable-object.class.js";
import { ImgHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";

/**
 * @class Collectible coin with simple spinn-animation.
 */
export class Coin extends DrawableObject {
    // #region Attributes
    x;
    y;
    width = 70;
    height = 70;

    rX;
    rY;
    rW;
    rH;

    offset = {
        top: this.height / 3,
        bottom: this.height / 3,
        left: this.width / 3,
        right: this.width / 3,
    };

    IMAGES_COINS = ImgHub.IMGS.coins;
    // #endregion Attributes

    /**
     * @param {object} [param0]
     * @param {number} [param0._x] Optional x-position.
     * @param {number} [param0._y] Optional y-position.
     */
    constructor({ _x, _y } = {}) {
        super();
        this.x = _x ?? randomBetween(100, 720 * 4 - 400);
        this.y = _y ?? randomBetween(150, 250);

        this.loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.getRealFrame();

        IntervalHub.startInterval(this.animate, 1000 / 6);
    }

    // #region Instance Methods
    /**
     * Spin-Animation.
     */
    animate = () => { this.setAnimation(this.IMAGES_COINS); }

    /**
     * Debug: draws the coin's collision frame.
     * @param {CanvasRenderingContext2D} ctx
     */
    drawFrame(ctx) {
        ctx.lineWidth = 3;
        // ctx.strokeStyle = "red";
        ctx.beginPath();
        this.getRealFrame();
        ctx.rect(this.rX, this.rY, this.rW, this.rH);
        ctx.stroke();
    }  

    // #endregion Instance Methods
}
