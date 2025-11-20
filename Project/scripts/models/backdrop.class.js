// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import { Scene, DynamicSprite } from "./index.js";

// Background Instances
export class Backdrop extends DynamicSprite {
    pX = 0;
    pY = 0;
    W = Scene.WIDTH;
    H = Scene.HEIGHT;

    constructor() { super(); }

}