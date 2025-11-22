// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import { Scene, DynamicSprite, ImgHub } from "./index.js";

// Background Instances
export class DesertLayer extends DynamicSprite {
    static LEYERS = [];
    static FRAMES;                 // Object                   Image-Chain from ImgHub.IMGS

    SCREEN;                         // String
    W = Scene.WIDTH;
    H = Scene.HEIGHT;

    constructor({ _SCREEN, _pX, _pY } = {}) {
        super();
        DesertLayer.FRAMES = ImgHub.IMGS.background.layers;
        // this.currentFrame = DesertLayer.FRAMES.first.tiles[0];
        this.SCREEN = _SCREEN;
        this.worldX = _pX;
        this.worldY = _pY;
    }

    draw(ctx) {
        const overlap = this.SCREEN === 2 ? -6 : 0;
        const screenX = this.worldX - Scene.CAMERA_X + overlap;
        const width = this.W - overlap;

        if (this.SCREEN === 1) {
            ctx.drawImage(DesertLayer.FRAMES.third.tiles[0], screenX, this.worldY, width, this.H);
            ctx.drawImage(DesertLayer.FRAMES.second.tiles[0], screenX, this.worldY, width, this.H);
            ctx.drawImage(DesertLayer.FRAMES.first.tiles[0], screenX, this.worldY, width, this.H);
        }
        if (this.SCREEN === 2) {
            ctx.drawImage(DesertLayer.FRAMES.third.tiles[1], screenX, this.worldY, width, this.H);
            ctx.drawImage(DesertLayer.FRAMES.second.tiles[1], screenX, this.worldY, width, this.H);
            ctx.drawImage(DesertLayer.FRAMES.first.tiles[1], screenX, this.worldY, width, this.H);
        }
    }

    _update() { }
}
