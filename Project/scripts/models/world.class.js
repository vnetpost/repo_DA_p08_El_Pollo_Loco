// Main Game Manager Class

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

export class World {
    // #region Attributes
    canvas;
    ctx;                                                // Context

    camera_x = 0;                                       // Negative

    keyboard;                                           // 

    level = createLevel1();                             // enemies, clouds, backgroundObject, endboss
    chickenNumber = 20;                                 // Normal & small
    bottlesNumber = 20;
    coinsNumber = 150;
    isStopped = false;

    character = new Character();                        // Pepe

    statusBar_health = new StatusBar({ _whichBar: "health", _startPercentage: 100, _x: 20, _y: 10 });
    statusBar_coin = new StatusBar({ _whichBar: "coin", _startPercentage: 0, _x: 20, _y: 45 });
    statusBar_bottle = new StatusBar({ _whichBar: "bottle", _startPercentage: 0, _x: 20, _y: 80 });
    statusBar_endboss = new StatusBar({ _whichBar: "endboss", _startPercentage: 100, _x: 450, _y: 50, _w: 250, _h: 70 });

    // #endregion Attributes

    // #region Instance Methods
    constructor(_canvas) {
        this.canvas = _canvas;
        this.ctx = this.canvas.getContext("2d");

        this.keyboard = new Keyboard();

        this.statusBar_bottle.setPrecentage(0); // Just fuer Bottles-Colection

        this.spawnChickens({ _number: this.chickenNumber });
        this.spawnBottles({ _number: this.bottlesNumber });
        this.spawnCoins({ _number: this.coinsNumber });
        this.coinsNumber = this.level.coins.length;

        this.draw();
        this.passWorld();

        IntervalHub.startInterval(() => { this.spawnChickens({ _number: 1, _x: 720 * 4 }) }, 20000);
        IntervalHub.startInterval(() => { this.spawnBottles({ _number: 1, _x: randomBetween(70, 720) }) }, 20000);
    }

    passWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
        this.level.bottles.forEach(bottle => bottle.world = this);
        this.level.coins.forEach(coin => coin.world = this);
    }

    draw() {
        if (this.isStopped) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects); // Add Backgrounds
        this.addObjectsToMap(this.level.clouds);            // Add Clouds

        // ------- Space for Fixed-Objects --------
        this.ctx.translate(-this.camera_x, 0);              // Back

        this.addToMap(this.statusBar_health);               // Add Health's StatusBar
        this.addToMap(this.statusBar_coin);                 // Add Coin's StatusBar
        this.addToMap(this.statusBar_bottle);               // Add Bottle's StatusBar
        this.addToMap(this.statusBar_endboss);              // Add Endboss's StatusBar

        this.ctx.translate(this.camera_x, 0);               // Forward
        // ----------------------------------------

        this.addObjectsToMap(this.level.coins);             // Add Coins
        this.addToMap(this.character);                      // Add CPepe
        this.addObjectsToMap(this.level.enemies);           // Add Enemies
        this.addObjectsToMap(this.level.bottles);           // Add Bottles

        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        if (objects.length > 0)
            objects.forEach(obg => this.addToMap(obg));
    }

    addToMap(mO) {
        if (mO.otherDirection) this.flipImage(mO);
        mO.draw(this.ctx);
        if (mO.otherDirection) this.flipImageBack(mO);
        // this.drawInstanceFrame(mO);
    }

    flipImage(mO) {
        this.ctx.save(); // A Snapshot
        this.ctx.translate(mO.width, 0);
        this.ctx.scale(-1, 1); // X-Achse direction to links
        mO.x = mO.x * -1;
    }

    flipImageBack(mO) {
        mO.x = mO.x * -1;
        this.ctx.restore();
    }

    spawnBottles({ _number, _x } = {}) {
        for (let i = 0; i < _number; i++) {
            const newBottle = new ThrowableObject({ _x: _x });
            newBottle.world = this;
            this.level.bottles.push(newBottle);
        }
    }

    spawnChickens({ _number, _x } = {}) {
        for (let i = 0; i < _number; i++) {
            const newChicken = new Chicken({ _x: _x });
            newChicken.world = this;
            this.level.enemies.push(newChicken);
        }
    }

    spawnCoins({ _number, _x, _y } = {}) {
        for (let i = 0; i < _number; i++) {
            const newCoin = new Coin({ _x: _x, _y: _y });
            newCoin.world = this;
            this.level.coins.push(newCoin);
        }
    }

    drawInstanceFrame(mO) {
        if ((mO instanceof Character || mO instanceof Chicken ||
            mO instanceof Endboss || mO instanceof ThrowableObject || mO instanceof Coin)
            && mO.drawFrame)
            mO.drawFrame(this.ctx);
    }
    // #endregion Instance Methods
}
