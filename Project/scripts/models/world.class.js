// Main Game Manager Class

import { level1 } from "../levels/level1.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Endboss } from "./endboss.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { StatusBar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

export class World {
    // #region Attributes
    canvas;
    ctx;

    camera_x = 0;

    keyboard;


    level = level1;                                     // enemies, clouds, backgroundObject, endboss
    chickenNumber = 10;                                 // Normal & small
    bottlesNumber = 10;

    character = new Character();                        // Pepe

    statusBar_health = new StatusBar({ _whichBar: "health", _x: 20, _y: 10 });
    statusBar_coin = new StatusBar({ _whichBar: "coin", _x: 20, _y: 45 });
    statusBar_bottle = new StatusBar({ _whichBar: "bottle", _x: 20, _y: 80 });
    statusBar_endboss = new StatusBar({ _whichBar: "endboss", _x: 450, _y: 10, _w: 250, _h: 70 });

    // #endregion Attributes

    // #region Instance Methods
    constructor(_canvas) {
        this.canvas = _canvas;
        this.ctx = this.canvas.getContext("2d");

        this.keyboard = new Keyboard();

        this.spawnChickens(this.chickenNumber);
        this.spawnBottles(this.bottlesNumber);

        this.draw();
        this.passWorld();
        // IntervalHub.startInterval(this.checkCollisions, 1000 / 60);
    }

    passWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects); // Add Backgrounds
        this.addObjectsToMap(this.level.clouds);            // Add Clouds

        // ------- Space for Fixed-Objects --------
        this.ctx.translate(-this.camera_x, 0);              // Back

        this.addToMap(this.statusBar_health);               // Add Health's StatusBar
        this.addToMap(this.statusBar_coin);                 // Add Coin's StatusBar
        this.addToMap(this.statusBar_bottle);               // Add Bottle's StatusBar

        this.ctx.translate(this.camera_x, 0);               // Forward
        // ----------------------------------------

        this.addToMap(this.character);                      // Add CPepe
        this.addToMap(this.statusBar_endboss);              // Add Endboss's StatusBar
        // this.addObjectsToMap(this.level.enemies);           // Add Enemies
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
        if (mO instanceof Character || mO instanceof Chicken ||
            mO instanceof Endboss || mO instanceof ThrowableObject)
            mO.drawFrame(this.ctx);
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

    spawnBottles(number) {
        for (let i = 0; i < number; i++) {
            this.level.bottles.push(new ThrowableObject());
        }
    }

    spawnChickens(number) {
        for (let i = 0; i < number; i++) {
            this.level.enemies.push(new Chicken());
        }
    }

    // #endregion Instance Methods
}
