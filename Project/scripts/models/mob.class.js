// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import * as Utils from "../utils/utils.js";
import { Scene, Sprite, DynamicSprite, StaticSprite, SkyLayer, BackdropLayer, Hero, Collectible, Coin, Projectile, IntervalHub, ImgHub } from "./index.js";

// Enemies Instances
export class Mob extends DynamicSprite {

    static JEFA;                       // Mob                      From Mob-Class
    static GALLINITAS = [];              // Array                    [Mob, Mob, Mob, ...]
    pY = 350;
    w = 30;
    h = 30;

    constructor() {
        super();
        this.ANIMS = ImgHub.IMGS.chickens;
        this.setRandomPosition();

    }

    setRandomPosition() {
        this.pX = Math.random() * Scene.WIDTH;
    }
}