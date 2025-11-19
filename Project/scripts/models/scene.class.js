// Main Game Manager Class
// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import { Sprite, DynamicSprite, StaticSprite, SkyLayer, BackdropLayer, Hero, Mob, Collectible, Coin, Projectile, IntervalHub, ImgHub, Joystick } from "./index.js";

export class Scene {
    // #region Attrubutes
    static CANVAS;                      // DOM-Ref                  DOM-Reference of CANVAS-Tag
    static CTX;                         // Object                   Get the Draw-Tools
    static WIDTH = 720;                 // Number
    static HEIGHT = 420;                // Number
    static LEVELS = [];                 // Array                    [Scene, Scene, Scene, ...]

    static PEPE;                        // Object                   From Hero-Class


    // #endregion Attrubutes

    constructor() {
        Scene.CANVAS = document.getElementById("idCanvas");
        Scene.CANVAS.width = Scene.WIDTH;
        Scene.CANVAS.height = Scene.HEIGHT;
        Scene.CTX = Scene.CANVAS.getContext('2d');

        this.generateHero();
        this.spawnGallinas(5);
    }
    // #region Static Methods
    

    // #endregion Static Methods
    // #region Methods

    generateHero() {
        Scene.PEPE = new Hero();
        console.log(Scene.PEPE);

        const pic = Scene.PEPE.ANIMS.walk[1];
        Scene.draw(Scene.PEPE, pic);

    }

    spawnGallinas(number) {
        for (let i = 0; i < number; i++) {
            const newGallina = new Mob();
            const pic = newGallina.ANIMS.normal.walk[2];
            Scene.draw(newGallina, pic);
            Mob.GALLINITAS.push(newGallina);
        }
    }

    static draw(inst, pic) {
        console.log(inst.pX);
        Scene.CTX.drawImage(pic, inst.pX, inst.pY, inst.w, inst.h);

    }
    // #endregion Methods
}