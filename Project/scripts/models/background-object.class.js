import { MovableObject } from "./movable-object.class.js";


export class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    y = 0;


    constructor({ _path, _x } = {}) {
        super();
        this.loadImage(_path);
        this.x = _x;

    }
}
