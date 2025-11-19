// Main Game Manager Class
// import * as EPOLO from "./index.js"; // Define a Objekt-Namespace
import { Sprite, DynamicSprite, StaticSprite, SkyLayer, BackdropLayer, Hero, BigBoss, Mob, Collectible, Coin, Projectile, IntervalHub, ImgHub, Joystick } from "./index.js";

export class Scene {
    // #region Attrubutes
    static HZ = 0;                      // Number
    static CANVAS;                      // DOM-Ref                  DOM-Reference of CANVAS-Tag
    static CTX;                         // Object                   Get the Draw-Tools
    static WIDTH = 720;                 // Number
    static HEIGHT = 420;                // Number
    static LEVELS = [];                 // Array                    [Scene, Scene, Scene, ...]
    static Difficulty;                  // Number                   1 -> 10

    static PEPE;                        // Object                   From Hero-Class
    static JEFA;                        // BigBoss                  From BigBoss-Class


    // #endregion Attrubutes

    constructor() {
        Scene.CANVAS = document.getElementById("idCanvas");
        Scene.CANVAS.width = Scene.WIDTH;
        Scene.CANVAS.height = Scene.HEIGHT;
        Scene.CTX = Scene.CANVAS.getContext('2d');

        Sprite.SPRITES = [];

        this.generateHero();
        this.generateJefa();
        this.generateGallinitas(5);

        this.generateBotellas();
        this.generateMonedas();

        Scene.draw();
    }
    // #region Static Methods

    static draw() {

        console.log(Scene.HZ++, Sprite.SPRITES);

        Sprite.SPRITES.forEach(s => {
            Scene.CTX.drawImage(s.currentFrame, s.pX, s.pY, s.W, s.H);
        });

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
    }

    generateGallinitas(number) {
        for (let i = 0; i < number; i++) {
            const newGallinita = new Mob();
            Mob.GALLINITAS.push(newGallinita);
            Sprite.SPRITES.push(newGallinita);
        }
    }

    generateJefa() {
        Scene.JEFA = new BigBoss();
        Sprite.SPRITES.push(Scene.JEFA);

    }
    generateBotellas() { }
    generateMonedas() { }
    // #endregion Methods
}