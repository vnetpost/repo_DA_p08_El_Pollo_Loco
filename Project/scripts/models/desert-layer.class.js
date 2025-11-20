// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import { Scene, Backdrop, ImgHub } from "./index.js";

// Background Instances
export class DesertLayer extends Backdrop {
    W = 70;
    H = 150;

    static FRAMES;




    constructor() {
        super();
        DesertLayer.FRAMES = ImgHub.IMGS.background.layers;
        this.currentFrame = DesertLayer.FRAMES.first.tiles[0];
        this.pX = 0;
        this.pY = 0;
        this.W = Scene.WIDTH;
        this.H = Scene.HEIGHT;

    }

}