// Main Class
import { Hero, ImgHub, Mob, Sprite } from "./index.js";

export class Scene {
    static canvas;              // DOM-Ref                  DOM-Reference of Canvas-Tag
    static ctx;                 // Object                   Get the Draw-Tools
    pepe;                       // Object                   From Hero-Class
    gallinas = [];              // Array                    [Mob, Mob, Mob, ...]
    jefa;                       // Object                   From Mob-Class
    botellas = [];              // Array                    [Projectile, Projectile, Projectile, ...]
    monedas = [];               // Array                    [Coin, Coin, Coin, ...]

    constructor() {
        Scene.canvas = document.getElementById("idCanvas");
        Scene.ctx = Scene.canvas.getContext('2d');

        this.gallinas = [new Mob(), new Mob(), new Mob(), new Mob()];
        this.pepe = new Hero();
    }

    async initGame() {
        await ImgHub.preloadAll();
        Scene.ctx.drawImage(ImgHub.IMGS.pepe.walk[3], 10, 10, 50, 50);
        // let pepe = new Hero();
    }

}