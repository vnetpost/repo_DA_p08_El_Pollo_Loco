// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import * as Utils from "../utils/utils.js";
import { DynamicSprite, ImgHub } from "./index.js";

// Enemies Instances
export class Mob extends DynamicSprite {

    static GALLINITAS = [];              // Array                    [Mob, Mob, Mob, ...]
    pY = 330;
    W = 40;
    H = 40;

    constructor() {
        super();
        this.FRAMES = ImgHub.IMGS.chickens;
        this.currentFrame = this.FRAMES.normal.walk[1];
        this.pX = Utils.setRandomXposition();

    }    

    
}