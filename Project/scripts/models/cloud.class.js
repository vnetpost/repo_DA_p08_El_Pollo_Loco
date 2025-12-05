import { randomBetween } from "../utils/utils.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";


/**
 * @class Background cloud - Slow-moving to the left.
 */
export class Cloud extends MovableObject {
    // #region Attributes
    width = 400;
    height = 250;
    y = 80;
    // #endregion Attributes

    /**
     * @param {object} [param0]
     * @param {string} [param0._path] Image path for the cloud.
     * @param {number} [param0._x] X-position where the cloud starts.
    */
    constructor({ _path, _x } = {}) {
        super();
        this.loadImage(_path);
        this.x = _x;
        IntervalHub.startInterval(() => this.animate(), 1000 / 60);
    }

    // #region Instance Methods

    /**
     * Just moving left.
     */
    animate() { this.moveLeft(); }

    // #endregion Instance Methods

}
