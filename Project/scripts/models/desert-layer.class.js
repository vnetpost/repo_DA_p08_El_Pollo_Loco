// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import { Scene, Backdrop, ImgHub } from "./index.js";

// Background Instances
export class DesertLayer extends Backdrop {
    static LEYERS = [];
    static FRAMES;                 // Object                   Image-Chain from ImgHub.IMGS

    SCREEN;                         // String


    constructor({ _SCREEN, _pX, _pY } = {}) {
        super();
        DesertLayer.FRAMES = ImgHub.IMGS.background.layers;
        // this.currentFrame = DesertLayer.FRAMES.first.tiles[0];
        this.SCREEN = _SCREEN;
        this.pX = _pX;
        this.pY = _pY;
    }

    draw(ctx) {
        if (this.SCREEN === "p1") {
            ctx.drawImage(DesertLayer.FRAMES.third.tiles[0], this.pX, this.pY, this.W, this.H);
            ctx.drawImage(DesertLayer.FRAMES.second.tiles[0], this.pX, this.pY, this.W, this.H);
            ctx.drawImage(DesertLayer.FRAMES.first.tiles[0], this.pX, this.pY, this.W, this.H);
        }
        if (this.SCREEN === "p2") {
            ctx.drawImage(DesertLayer.FRAMES.third.tiles[1], this.pX, this.pY, this.W, this.H);
            ctx.drawImage(DesertLayer.FRAMES.second.tiles[1], this.pX, this.pY, this.W, this.H);
            ctx.drawImage(DesertLayer.FRAMES.first.tiles[1], this.pX, this.pY, this.W, this.H);
        }
    }
}