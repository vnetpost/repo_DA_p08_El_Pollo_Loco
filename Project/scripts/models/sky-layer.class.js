// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import { Scene, Backdrop, ImgHub } from "./index.js";

// Cloud Instances
export class SkyLayer extends Backdrop {

    W = Scene.WIDTH * 2 / 5;            // Number               Cloud's width
    H = Scene.HEIGHT * 2 / 5;           // Number               Clould's height
    SCREEN;                             // Number               1 OR 2                             

    static LAYERS = [];                 // SkyLayer             For Page1 & Page2 [SkyLayer, SkyLayer]
    static FRAMES;                      // Object               Image-Chain from ImgHub.IMGS
    static AIR_FRAME;                   // Object               Image-Chain from ImgHub.IMGS
    static WIND = 2;                    // Number               Wind's Speed

    constructor({ _SCREEN, _pX, _pY } = {}) {
        super();
        SkyLayer.FRAMES = ImgHub.IMGS.background.layers.clouds;
        SkyLayer.AIR_FRAME = ImgHub.IMGS.background.layers.air;
        // this.currentFrame = SkyLayer.FRAMES.tiles[0];
        this.SCREEN = _SCREEN;
        this.pX = _pX;
        this.pY = _pY;

    }

    draw(ctx) {
        if (this.SCREEN === 1) { // Screen 1
            ctx.drawImage(SkyLayer.AIR_FRAME, 0, 0, Scene.WIDTH, Scene.HEIGHT);
            ctx.drawImage(SkyLayer.FRAMES.tiles[0], this.pX, this.pY, this.W, this.H);
        }
        if (this.SCREEN === 2) { // Screen 2
            ctx.drawImage(SkyLayer.AIR_FRAME, Scene.WIDTH, 0, Scene.WIDTH, Scene.HEIGHT);
            ctx.drawImage(SkyLayer.FRAMES.tiles[1], this.pX, this.pY, this.W, this.H);
        }
    }

    update() {
        // Move the clouds to the left
        this.pX -= SkyLayer.WIND;

        // If completely out of view on the left, wrap around to the right
        if (this.pX + this.W <= 0) {
            this.pX += Scene.WIDTH * 2; // behind the second page
        }
    }
}