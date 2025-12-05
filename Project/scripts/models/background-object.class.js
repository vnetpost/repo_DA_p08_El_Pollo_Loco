import { MovableObject } from "./movable-object.class.js";

/**
 * @class Static background tile that scrolls with the world camera.
 */
export class BackgroundObject extends MovableObject {
    // #region Attributes
    width = 720;
    height = 480;
    y = 0;
    // #endregion Attributes

    // #region Instance Methods
    /**
     * @param {object} [param0]
     * @param {string} [param0._path] Image path for this background tile.
     * @param {number} [param0._x] X-position of the tile within the level.
     */
    constructor({ _path, _x } = {}) {
        super();
        this.loadImage(_path);
        this.x = _x;
    }
    // #endregion Instance Methods
}
