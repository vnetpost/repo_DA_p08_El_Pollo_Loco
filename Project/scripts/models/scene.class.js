// Main Class

import { ImgHub, Sprite } from "./index.js";
export class Scene {
    static canvas;              // DOM-Reference
    static ctx;                 // Get the Draw-Tools

    constructor() {
        Scene.canvas = document.getElementById("idCanvas");
        Scene.ctx = Scene.canvas.getContext('2d');

    }

    async initGame() {
        await ImgHub.preloadAll();
        Scene.ctx.drawImage(ImgHub.IMGS.pepe.walk[3], 10, 10, 50, 50);
    }

}