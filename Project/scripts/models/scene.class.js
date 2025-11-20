// Main Game Manager Class
import {
    Sprite,
    DynamicSprite,
    StaticSprite,
    Backdrop,
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
    Joystick
} from "./index.js";

export class Scene {
    // #region Static Attributes
    static HZ = 0;                      // Counts the rendered frames (debugging)
    static CANVAS;                      // Reference to the HTML <canvas>
    static CTX;                         // 2D drawing context
    static WIDTH = 720;                 // Canvas width
    static HEIGHT = 420;                // Canvas height
    static LEVELS = [];                 // Stores all created Scene instances
    static Difficulty;                  // Game difficulty (1–10)

    static SKY;
    static DESERT;

    static PEPE;                        // Reference to the hero
    static mobNumber = 20;               // How many Galllinitas?
    static JEFA;                        // Reference to the final boss
    // #endregion Static Attributes


    constructor() {
        // ---------------------------------------------------------------------
        // Canvas setup
        // ---------------------------------------------------------------------
        Scene.CANVAS = document.getElementById("idCanvas");
        Scene.CANVAS.width = Scene.WIDTH;
        Scene.CANVAS.height = Scene.HEIGHT;
        Scene.CTX = Scene.CANVAS.getContext("2d");

        // Reset the global sprite list for this scene
        Sprite.SPRITES = [];

        // ---------------------------------------------------------------------
        // Spawn all game entities belonging to this Scene
        // ---------------------------------------------------------------------
        this.generateSky();
        this.generateDesert();

        this.generateHero();
        this.generateJefa();
        this.generateGallinitas(Scene.mobNumber);

        this.generateBotellas();
        this.generateMonedas();
    }


    // #region Static Methods
    static async initGame() {
        // 1) Preload all images before rendering starts
        await ImgHub.preloadAll();

        // 2) Create the first Scene instance and store it
        const scene = new Scene();
        Scene.LEVELS.push(scene);

        // 3) Start the rendering loop of the Scene
        Scene.sceneLoop();
    }


    static sceneLoop() {
        console.log("Frame", Scene.HZ++, Sprite.SPRITES);
        // -----------------------------------------------------------------
        // Clear the entire canvas at the beginning of each frame
        // -----------------------------------------------------------------
        Scene.CTX.clearRect(0, 0, Scene.WIDTH, Scene.HEIGHT);

        // -----------------------------------------------------------------
        // Update phase:
        // Every sprite handles its movement, animation, ...
        // -----------------------------------------------------------------
        Sprite.SPRITES.forEach(sprite => {
            if (typeof sprite.update === "function") {
                sprite.update();
            }
        });

        // -----------------------------------------------------------------
        // Draw phase:
        // Each sprite renders (draw) itself onto the canvas
        // -----------------------------------------------------------------
        Sprite.SPRITES.forEach(sprite => sprite.draw(Scene.CTX));

        // -----------------------------------------------------------------
        // Request the next frame → this creates the continuous game loop
        // -----------------------------------------------------------------
        requestAnimationFrame(Scene.sceneLoop);
    }
    // #endregion Static Methods


    // #region Instance Methods (Spawning Game Objects)

    generateHero() {
        // Create the player character and register it in the global sprite list
        Scene.PEPE = new Hero();
        Sprite.SPRITES.push(Scene.PEPE);
    }

    generateGallinitas(number = 5) {
        // Spawn multiple enemy chickens at random positions (later)
        for (let i = 0; i < number; i++) {
            const newGallinita = new Mob();
            Mob.GALLINITAS.push(newGallinita);
            Sprite.SPRITES.push(newGallinita);
        }
    }

    generateJefa() {
        // Create the main boss enemy and register it
        Scene.JEFA = new BigBoss();
        Sprite.SPRITES.push(Scene.JEFA);
    }

    generateBotellas() {
        // Placeholder for spawning bottle projectiles
    }

    generateMonedas() {
        // Placeholder for spawning collectible coins
    }

    generateSky() {
        Scene.SKY = new SkyLayer();
        Sprite.SPRITES.push(Scene.SKY);
    }

    generateDesert() {
        Scene.DESERT = new DesertLayer();
        Sprite.SPRITES.push(Scene.DESERT);
    }
    // #endregion Instance Methods
}
