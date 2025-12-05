import { createLevel1 } from "../levels/level1.js";
import { randomBetween } from "../utils/utils.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Coin } from "./coin.class.js";
import { Endboss } from "./endboss.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { StatusBar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";


/**
 * @class   Main game world that wires entities, rendering, spawning and HUD together. 
 */
export class World {
    // #region Attributes
    canvas;
    ctx;

    camera_x = 0;                                       // Always Negative

    keyboard;

    level = createLevel1();
    chickenNumber = 20;
    bottlesNumber = 20;
    coinsNumber = 150;
    isStopped = false;

    character = new Character();                        // Pepe

    statusBar_health = new StatusBar({ _whichBar: "health", _startPercentage: 100, _x: 20, _y: 10 });
    statusBar_coin = new StatusBar({ _whichBar: "coin", _startPercentage: 0, _x: 20, _y: 45 });
    statusBar_bottle = new StatusBar({ _whichBar: "bottle", _startPercentage: 0, _x: 20, _y: 80 });
    statusBar_endboss = new StatusBar({ _whichBar: "endboss", _startPercentage: 100, _x: 450, _y: 50, _w: 250, _h: 70 });

    // #endregion Attributes

    /**
     * @param {HTMLCanvasElement} _canvas Canvas element Object.
     */
    constructor(_canvas) {
        this.canvas = _canvas;
        this.ctx = this.canvas.getContext("2d");

        this.keyboard = new Keyboard();

        this.spawnChickens({ _number: this.chickenNumber });
        this.spawnBottles({ _number: this.bottlesNumber });
        this.spawnCoins({ _number: this.coinsNumber });
        this.coinsNumber = this.level.coins.length;

        this.draw();
        this.passWorld();

        IntervalHub.startInterval(() => { this.spawnChickens({ _number: 1, _x: 720 * 4 }) }, 20000);
        IntervalHub.startInterval(() => { this.spawnBottles({ _number: 1, _x: randomBetween(70, 720) }) }, 20000);
    }

    // #region Instance Methods

    /**
     * Gives world reference to character, enemies, coins and bottles.
     */
    passWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
        this.level.bottles.forEach(bottle => bottle.world = this);
        this.level.coins.forEach(coin => coin.world = this);
    }

    /**
     * Core render loop: clears canvas, draws backgrounds, HUD, entities and schedules the next frame.
     */
    draw() {
        if (this.isStopped) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const camX = Math.round(this.camera_x);
        this.ctx.translate(camX, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        // ------- Space for Fixed-Objects --------
        this.ctx.translate(-camX, 0);

        this.addToMap(this.statusBar_health);
        this.addToMap(this.statusBar_coin);
        this.addToMap(this.statusBar_bottle);
        this.addToMap(this.statusBar_endboss);

        this.ctx.translate(camX, 0);
        // ----------------------------------------

        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-camX, 0);

        requestAnimationFrame(() => this.draw());
    }

    /**
     * Draw an array of drawable objects onto the map.
     * @param {Array<object>} objects Collection of drawable objects.
     */
    addObjectsToMap(objects) {
        if (objects.length > 0)
            objects.forEach(obg => this.addToMap(obg));
    }

    /**
     * Draw a single object with respect to its facing direction.
     * @param {object} mO Drawable game object with draw/otherDirection properties.
     */
    addToMap(mO) {
        if (mO.otherDirection) this.flipImage(mO);
        mO.draw(this.ctx);
        if (mO.otherDirection) this.flipImageBack(mO);
        // this.drawInstanceFrame(mO);
    }

    /**
     * Mirror current drawing context harizontally for an object.
     * @param {object} mO Drawable game object.
     */
    flipImage(mO) {
        this.ctx.save(); // A Snapshot
        this.ctx.translate(mO.width, 0);
        this.ctx.scale(-1, 1); // X-Achse direction to links
        mO.x = mO.x * -1;
    }

    /**
     * Restore original orientation after mirroring.
     * @param {object} mO Drawable game object.
     */
    flipImageBack(mO) {
        mO.x = mO.x * -1;
        this.ctx.restore();
    }

    /**
     * Spawn throwable bottles into the level.
     * @param {object} [param0]
     * @param {number} [param0._number] Amount of bottles.
     * @param {number} [param0._x] Optional x-position override.
     */
    spawnBottles({ _number, _x } = {}) {
        for (let i = 0; i < _number; i++) {
            const newBottle = new ThrowableObject({ _x: _x });
            newBottle.world = this;
            this.level.bottles.push(newBottle);
        }
    }

    /**
     * Spawn chickens into the level.
     * @param {object} [param0]
     * @param {number} [param0._number] Amount of chickens.
     * @param {number} [param0._x] Optional x-position override.
     */
    spawnChickens({ _number, _x } = {}) {
        for (let i = 0; i < _number; i++) {
            const newChicken = new Chicken({ _x: _x });
            newChicken.world = this;
            this.level.enemies.push(newChicken);
        }
    }

    /**
     * Spawn coins into the level.
     * @param {object} [param0]
     * @param {number} [param0._number] Amount of coins.
     * @param {number} [param0._x] Optional x-position override.
     * @param {number} [param0._y] Optional y-position override.
     */
    spawnCoins({ _number, _x, _y } = {}) {
        for (let i = 0; i < _number; i++) {
            const newCoin = new Coin({ _x: _x, _y: _y });
            newCoin.world = this;
            this.level.coins.push(newCoin);
        }
    }

    /**
     * Debug helper: draws collision frames for supported moveables & Coins.
     * @param {object} mO Drawable game object.
     */
    drawInstanceFrame(mO) {
        if ((mO instanceof Character || mO instanceof Chicken ||
            mO instanceof Endboss || mO instanceof ThrowableObject || mO instanceof Coin)
            && mO.drawFrame)
            mO.drawFrame(this.ctx);
    }
    // #endregion Instance Methods
}
