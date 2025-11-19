// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import * as Utils from "../utils/utils.js";
import { Scene, Sprite, DynamicSprite, StaticSprite, SkyLayer, BackdropLayer, Hero, Collectible, Coin, Projectile, IntervalHub, ImgHub } from "./index.js";

// Enemies Instances
export class Mob extends DynamicSprite {

    static GALLINITAS = [];              // Array                    [Mob, Mob, Mob, ...]
    pY = 350;
    W = 30;
    H = 30;

    constructor() {
        super();
        this.FRAMES = ImgHub.IMGS.chickens;
        this.setRandomPosition();

    }

    setRandomPosition() {
        this.pX = 200 + Math.random() * Scene.WIDTH;
    }
}