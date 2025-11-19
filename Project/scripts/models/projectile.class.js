// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import { Sprite, DynamicSprite, StaticSprite, SkyLayer, BackdropLayer, Hero, Mob, Collectible, Coin, IntervalHub, ImgHub } from "./index.js";

// Throwable Instances
export class Projectile extends Collectible {

    static BOTELLAS = [];              // Array                    [Projectile, Projectile, Projectile, ...]


    constructor() {
        super();
        
    }
    
}