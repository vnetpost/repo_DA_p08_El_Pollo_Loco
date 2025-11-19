// Main Class
// import { Sprite, DynamicSprite, StaticSprite, SkyLayer, BackdropLayer, Hero, Mob, Collectible, Coin, Projectile, IntervalHub, ImgHub } from "./index.js";
import * as EPOLO from "./index.js"; // Define a Objekt-Namespace

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

        this.gallinas = [new EPOLO.Mob(), new EPOLO.Mob(), new EPOLO.Mob(), new EPOLO.Mob()];
        this.pepe = new EPOLO.Hero();
    }

    async init() {
        await EPOLO.ImgHub.preloadAll();
        Scene.ctx.drawImage(EPOLO.ImgHub.IMGS.pepe.walk[3], 10, 10, 50, 50);
        console.log(Scene);

    }

}