// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import * as Utils from "../utils/utils.js";
import { Scene, Sprite, DynamicSprite, StaticSprite, SkyLayer, BackdropLayer, Hero, Mob, Collectible, Coin, Projectile, IntervalHub, ImgHub } from "./index.js";

// Enemies Instances
export class BigBoss extends DynamicSprite {
    pX = 500;
    pY = 350;
    W = 100;
    H = 100;

    constructor() {
        super();
        this.FRAMES = ImgHub.IMGS.boss;
        this.currentFrame = this.FRAMES.attack[4];
        this.setRandomPosition();

    }

    setRandomPosition() {

    }
}