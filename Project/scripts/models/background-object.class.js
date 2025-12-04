import { MovableObject } from "./movable-object.class.js";


export class BackgroundObject extends MovableObject {
    // #region Attributes
    width = 720;
    height = 480;

    y = 0;
    // #endregion Attributes


    // #region Instance Methods
    constructor({ _path, _x } = {}) {
        super();
        this.loadImage(_path);
        this.x = _x;

    }
    // #endregion Instance Methods
}
