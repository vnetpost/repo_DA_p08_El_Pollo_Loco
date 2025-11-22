// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import { Scene, DynamicSprite, ImgHub } from "./index.js";

// Cloud Instances
export class SkyLayer extends DynamicSprite {

    W = Scene.WIDTH * 2 / 5;            // Number               Cloud's width
    H = Scene.HEIGHT * 2 / 5;           // Number               Clould's height
    SCREEN;                             // Number               1 OR 2                             

    static LAYERS = [];                 // SkyLayer             For Page1 & Page2 [SkyLayer, SkyLayer]
    static FRAMES;                      // Object               Image-Chain from ImgHub.IMGS
    static AIR_FRAME;                   // Object               Image-Chain from ImgHub.IMGS
    static WIND = 0.15;                 // Number               Wind's Speed

    constructor({ _SCREEN, _pX, _pY } = {}) {
        super();
        SkyLayer.FRAMES = ImgHub.IMGS.background.layers.clouds;
        SkyLayer.AIR_FRAME = ImgHub.IMGS.background.layers.air;
        // this.currentFrame = SkyLayer.FRAMES.tiles[0];
        this.SCREEN = _SCREEN;
        this.worldX = _pX;
        this.worldY = _pY;
    }

    draw(ctx) {
        const tileIndex = this.SCREEN === 1 ? 0 : 1;
        if (this.SCREEN === 1) {
            ctx.drawImage(SkyLayer.AIR_FRAME, -Scene.CAMERA_X, 0, Scene.WIDTH, Scene.HEIGHT);
        }
        if (this.SCREEN === 2) {
            ctx.drawImage(SkyLayer.AIR_FRAME, Scene.WIDTH - 2 - Scene.CAMERA_X, 0, Scene.WIDTH + 2, Scene.HEIGHT);
        }
        const offset = this.SCREEN === 2 ? -2 : 0;
        const screenX = this.worldX - Scene.CAMERA_X + offset;

        ctx.drawImage(SkyLayer.FRAMES.tiles[tileIndex], screenX, this.worldY, this.W + 2, this.H);
    }

    update() {
        // Move the clouds to the left
        this.worldX -= SkyLayer.WIND;

        // If completely out of view on the left, wrap around to the right of screen 2
        if (this.worldX + this.W <= Scene.CAMERA_X) {
            this.worldX = Scene.WORLD_WIDTH + Math.random() * 120;
        }
    }
}
