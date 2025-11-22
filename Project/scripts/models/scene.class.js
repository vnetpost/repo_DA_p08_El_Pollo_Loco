// Main Game Manager Class
import {
    Sprite,
    DynamicSprite,
    StaticSprite,
    SkyLayer,
    DesertLayer,
    Hero,
    BigBoss,
    Mob,
    Collectible,
    Coin,
    Projectile,
    IntervalHub,
    ImgHub,
    Joystick,
    MeterUI
} from "./index.js";

export class Scene {
    // #region Static Attributes
    static HZ = 0;                                          // Counts the rendered frames (debugging)
    static CANVAS;                                          // Reference to the HTML <canvas>
    static CTX;                                             // 2D drawing context
    static WIDTH = 720;                                     // Canvas width
    static HEIGHT = 420;                                    // Canvas height
    static LEVELS = [];                                     // Stores all created Scene instances
    static Difficulty;                                      // Game difficulty (1–10)

    static PEPE;                                            // Reference to the hero
    static mobNumber = 10;                                  // How many Galllinitas?
    static JEFA;                                            // Reference to the final boss
    static JOYSTICK;

    // camera and world
    static CAMERA_X = 0;                                    // current world offset on X
    static WORLD_WIDTH = Scene.WIDTH * 2;                   // 2 screens wide

    // #endregion Static Attributes

    constructor() {
        // Canvas setup
        Scene.CANVAS = document.getElementById("idCanvas");
        Scene.CANVAS.width = Scene.WIDTH;
        Scene.CANVAS.height = Scene.HEIGHT;
        Scene.CTX = Scene.CANVAS.getContext("2d");

        Sprite.SPRITES = []; // Reset the global sprite list for this scene

        // Spawn all game entities belonging to this Scene
        this.generateSky();
        this.generateDesert();

        this.generateHero();
        this.generateJefa();
        this.generateGallinitas(Scene.mobNumber);

        this.generateBotellas();
        this.generateMonedas();
        this.generateHUD();
    }

    // #region Static Methods
    static async initGame() {
        await ImgHub.preloadAll(); // 1) Preload all images before rendering starts
        Scene.JOYSTICK = new Joystick(); // Create joystick before hero
        const scene = new Scene(); // 2) Create the first Scene instance and store it
        Scene.LEVELS.push(scene);
        Scene.sceneLoop(); // 3) Start the rendering loop of the Scene
    }

    static sceneLoop(timeStamp) {
        // console.log("Timestamp:", timeStamp / 1000, "Frame", Scene.HZ++, Sprite.SPRITES);

        Scene.CTX.clearRect(0, 0, Scene.WIDTH, Scene.HEIGHT);

        Sprite.SPRITES.forEach(sprite => { // Update phase
            if (typeof sprite.update === "function") sprite.update(timeStamp);
        });
        Sprite.SPRITES.forEach(sprite => { // Draw phase:
            if (typeof sprite.draw === "function") sprite.draw(Scene.CTX);
        });

        requestAnimationFrame(Scene.sceneLoop); // Continuous game loop
    }
    // #endregion Static Methods


    // #region Instance Methods (Spawning Game Objects)

    generateHero() {
        Scene.PEPE = new Hero(Scene.JOYSTICK);
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

    generateBotellas() {
        // 
    }

    generateMonedas() {
        //
    }

    generateHUD() {
        Scene.METER_UI = new MeterUI();
        Sprite.SPRITES.push(Scene.METER_UI);
    }

    generateSky() {
        SkyLayer.LAYERS.push(new SkyLayer({ _SCREEN: 1, _pX: 350, _pY: 0 }));
        SkyLayer.LAYERS.push(new SkyLayer({ _SCREEN: 2, _pX: Scene.WIDTH + 350, _pY: 0 }));

        SkyLayer.LAYERS.forEach(sky => Sprite.SPRITES.push(sky));
    }

    generateDesert() {
        DesertLayer.LEYERS.push(new DesertLayer({ _SCREEN: 1, _pX: 0, _pY: 0 }));
        DesertLayer.LEYERS.push(new DesertLayer({ _SCREEN: 2, _pX: Scene.WIDTH - 2, _pY: 0 }));

        DesertLayer.LEYERS.forEach(desert => Sprite.SPRITES.push(desert));
    }
    // #endregion Instance Methods
}
