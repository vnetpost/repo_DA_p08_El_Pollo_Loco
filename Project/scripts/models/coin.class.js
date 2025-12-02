import { randomBetween } from "../utils/utils.js";
import { DrawableObject } from "./drawable-object.class.js";
import { ImgHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";

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
        top: this.height / 4,
        bottom: this.height / 4,
        left: this.width / 4,
        right: this.width / 4,
    };

    IMAGES_COINS = ImgHub.IMGS.coins;
    // #endregion Attributes

    constructor({ _x, _y } = {}) {
        super();
        this.x = _x ?? randomBetween(100, 720 * 4 - this.width);
        this.y = _y ?? randomBetween(200, 300);

        this.loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.getRealFrame();

        IntervalHub.startInterval(this.animate, 1000 / 6);
    }

    // #region Instance Methods
    animate = () => { this.setAnimation(this.IMAGES_COINS); }


    // #endregion Instance Methods
}
