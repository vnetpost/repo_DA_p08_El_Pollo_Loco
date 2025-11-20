// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import { Scene, Backdrop, ImgHub } from "./index.js";

// Cloud Instances
export class SkyLayer extends Backdrop {
    static LAYERS = [];             // SkyLayer                For Page1 & Page2 [SkyLayer, SkyLayer] 
    static SCREEN;                // Number                  1 OR 2
    static FRAMES;                 // Object                   Image-Chain from ImgHub.IMGS
    static AIR;
    static WIND = 2;

    W = Scene.WIDTH * 2 / 5;
    H = Scene.HEIGHT * 2 / 5;

    constructor({ _SCREEN, _pX, _pY } = {}) {
        super();
        SkyLayer.FRAMES = ImgHub.IMGS.background.layers.clouds;
        SkyLayer.AIR = ImgHub.IMGS.background.layers.air;
        // this.currentFrame = SkyLayer.FRAMES.tiles[0];
        this.SCREEN = _SCREEN;
        this.pX = _pX;
        this.pY = _pY;

    }

    draw(ctx) {
        if (this.SCREEN === 1) { // Screen 1
            ctx.drawImage(SkyLayer.AIR, 0, 0, Scene.WIDTH, Scene.HEIGHT);
            ctx.drawImage(SkyLayer.FRAMES.tiles[0], this.pX, this.pY, this.W, this.H);
        }
        if (this.SCREEN === 2) { // Screen 2
            ctx.drawImage(SkyLayer.AIR, Scene.WIDTH, 0, Scene.WIDTH, Scene.HEIGHT);
            ctx.drawImage(SkyLayer.FRAMES.tiles[1], Scene.WIDTH * 2, this.pY, this.W, this.H);
        }
    }

    update() {
        // Move to the left
        this.pX -= SkyLayer.WIND;

        // If completely out of view on the left, wrap around to the right
        if (this.pX + this.W <= 0) {
            this.pX += Scene.WIDTH * 2; // behind the second page
        }
    }
}