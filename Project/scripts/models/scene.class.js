// Main Game Manager Class
// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import { Sprite, DynamicSprite, StaticSprite, SkyLayer, BackdropLayer, Hero, BigBoss, Mob, Collectible, Coin, Projectile, IntervalHub, ImgHub, Joystick } from "./index.js";

export class Scene {
    // #region Attrubutes
    static CANVAS;                      // DOM-Ref                  DOM-Reference of CANVAS-Tag
    static CTX;                         // Object                   Get the Draw-Tools
    static WIDTH = 720;                 // Number
    static HEIGHT = 420;                // Number
    static LEVELS = [];                 // Array                    [Scene, Scene, Scene, ...]

    static PEPE;                        // Object                   From Hero-Class
    static JEFA;                        // BigBoss                  From BigBoss-Class


    // #endregion Attrubutes

    constructor() {
        Scene.CANVAS = document.getElementById("idCanvas");
        Scene.CANVAS.width = Scene.WIDTH;
        Scene.CANVAS.height = Scene.HEIGHT;
        Scene.CTX = Scene.CANVAS.getContext('2d');


        this.generateHero();
        this.generateJefa();
        this.generateGallinitas(5);

        this.generateBotellas();
        this.generateMonedas();

        Scene.draw();
    }
    // #region Static Methods

    static draw() {
        Scene.CTX.drawImage(pic, inst.pX, inst.pY, inst.W, inst.H);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    // #endregion Static Methods

    // #region Methods

    generateHero() {
        Scene.PEPE = new Hero();
        Sprite.SPRITES.push(Scene.PEPE);
        const pic = Scene.PEPE.FRAMES.walk[1];
        // Scene.draw(Scene.PEPE, pic);

    }

    generateGallinitas(number) {
        for (let i = 0; i < number; i++) {
            const newGallinita = new Mob();
            Sprite.SPRITES.push(newGallinita);
            const pic = newGallinita.FRAMES.normal.walk[2];
            // Scene.draw(newGallinita, pic);
            Mob.GALLINITAS.push(newGallinita);
        }
    }


    generateJefa() { }
    generateBotellas() { }
    generateMonedas() { }
    // #endregion Methods
}