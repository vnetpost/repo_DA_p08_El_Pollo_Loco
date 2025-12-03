import { ImgHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";
import { AudioHub } from "./audioHub.class.js";


export class Character extends MovableObject {
    // #region Attributes
    x = 50;
    y = 266;
    width = 80;
    height = 160;
    speed = 12.5;

    // Flags
    collided = false;
    lastActiveTime = Date.now();
    timeToNap = 4000;                               // Mili Second

    offset = {
        top: this.height / 2,
        bottom: this.height / 10,
        left: this.width / 3,
        right: this.width / 3
    };

    otherDirection = false;                 // false -> facing Right 
    //                                         true -> facing Left

    IMAGES_IDLE_SHORT = ImgHub.IMGS.pepe.idle.short;
    IMAGES_IDLE_LONG = ImgHub.IMGS.pepe.idle.long;
    IMAGES_WALKING = ImgHub.IMGS.pepe.walk;
    IMAGES_JUMPING = ImgHub.IMGS.pepe.jump;
    IMAGES_HURT = ImgHub.IMGS.pepe.hurt;
    IMAGES_DEAD = ImgHub.IMGS.pepe.dead;

    arsenal = [];                                   // [ThrowableObject,ThrowableObject,...]
    bottleLimit = 10;
    // bottleWorth = 10;
    lastThrowTime = 0;
    coinsCollected = 0;

    // currentAnimation = this.IMAGES_IDLE_SHORT;
    // isBored = false;

    SOUNDS_PEPE = AudioHub.SOUNDS.pepe;
    walk_lastPlayedAt = 0;                        // 59 S Sound duration
    snor_lastPlayedAt = 0;                        // 3  S
    jump_lastPlayedAt = 0;                        // 1  S
    hurt_lastPlayedAt = 0;                        // 0  S
    dead_lastPlayedAt = 0;                        // 1  S

    // #endregion Attributes

    constructor() {
        super();
        this.loadImage(this.IMAGES_IDLE_SHORT[0]); // Init

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_IDLE_SHORT);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        // this.SOUNDS_PEPE.walk.loop = true;

        IntervalHub.startInterval(this.animate, 1000 / 10);
        // IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
        IntervalHub.startInterval(this.moveCamera, 1000 / 60);
        IntervalHub.startInterval(this.moveLeft, 1000 / 60);
        IntervalHub.startInterval(this.moveRight, 1000 / 60);
        IntervalHub.startInterval(this.jump, 1000 / 60);                // Set this.speedY = 25 to trigger applyGravity
        IntervalHub.startInterval(this.applyGravity, 1000 / 60);        // this.speedY as a trigger
        // IntervalHub.startInterval(this.checkCollisions, 1000 / 60);
        IntervalHub.startInterval(this.collectBottles, 1000 / 60);
        IntervalHub.startInterval(this.collectCoins, 1000 / 60);
        IntervalHub.startInterval(this.throwBottle, 1000 / 60);
        IntervalHub.startInterval(this.updateStatusBars, 1000 / 10);
    }

    // #region Instance Methods    

    animate = () => {
        this.updateSoundState();

        if (this.isDead) {                              // Dead
            this.setAnimation(this.IMAGES_DEAD);
            return;
        }
        if (this.isHurt()) {                            // Hurt
            this.updateLastActiveTime();
            this.setAnimation(this.IMAGES_HURT);
            return;
        }
        if (this.isAboveGround()) {                     // Jumping
            this.updateLastActiveTime();
            this.setAnimation(this.IMAGES_JUMPING);
            return;
        }
        if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) { // Walking

            this.updateLastActiveTime();
            this.setAnimation(this.IMAGES_WALKING);
            return;
        }

        const inactiveLongEnough = (Date.now() - this.lastActiveTime) >= this.timeToNap;
        if (inactiveLongEnough) {                       // Idle
            this.setAnimation(this.IMAGES_IDLE_LONG);
        } else {
            this.setAnimation(this.IMAGES_IDLE_SHORT);
        }
    }

    updateSoundState = () => {
        const isRunningOnGround =
            !this.isDead &&
            !this.isHurt() &&
            !this.isAboveGround() &&
            (this.world.keyboard.LEFT || this.world.keyboard.RIGHT);

        const inactiveLongEnough = (Date.now() - this.lastActiveTime) >= this.timeToNap; // Jusst like Animating

        if (this.isDead) {
            const dead = this.SOUNDS_PEPE.dead;
            this.exceptThisStopOthers(dead);
            if (dead.paused) AudioHub.playOne(dead);
            return;
        }
        if (this.isHurt()) {
            const hurt = this.SOUNDS_PEPE.hurt;
            this.exceptThisStopOthers(hurt);
            if (hurt.paused) AudioHub.playOne(hurt);
            return;
        }
        if (this.isAboveGround()) {
            const jump = this.SOUNDS_PEPE.jump;
            this.exceptThisStopOthers(jump);
            if (jump.paused) AudioHub.playOne(jump);
            return;
        }
        if (isRunningOnGround) {
            const walk = this.SOUNDS_PEPE.walk;
            this.exceptThisStopOthers(walk);
            if (walk.paused) AudioHub.playOne(walk);
            return;
        }

        // Idle / Snore
        const snor = this.SOUNDS_PEPE.snor;
        this.exceptThisStopOthers(snor);
        if (inactiveLongEnough && snor.paused) AudioHub.playOne(snor);
    }

    exceptThisStopOthers = (exceptSound) => {
        Object.values(this.SOUNDS_PEPE).forEach(sound => {
            if (sound === exceptSound) return;
            AudioHub.stopOne(sound);
        });
    }

    moveLeft = () => {
        if (this.world.keyboard.LEFT) {
            // console.log(this.x, this.y);
            this.updateLastActiveTime();
            this.otherDirection = true;
            this.x -= this.speed;
            if (this.x <= 0) this.x = 0;
            // this.walking_sound.play();
        }
    }

    moveRight = () => {
        if (this.world.keyboard.RIGHT) {
            // console.log(this.x, this.y);
            this.updateLastActiveTime();
            this.otherDirection = false;
            this.x += this.speed;
            if (this.x + this.width >= 720 * 4) this.x = 720 * 4 - this.width;
        }
    }

    jump = () => {
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.updateLastActiveTime();
            this.speedY = 25;
        }
    }

    moveCamera = () => {
        this.world.camera_x = -this.x + 200;
        if (this.world.camera_x > 0) this.world.camera_x = 0;
        if (this.world.camera_x < -720 * 3) this.world.camera_x = -720 * 3;
    }

    checkCollisions = () => {
        this.getRealFrame(); // refresh Instance-Grenze before comparing
        let collided = false;

        this.world.level.enemies.forEach((enemy, idx) => {
            if (enemy.isDead) return;
            enemy.getRealFrame();

            if (this.isColliding(enemy)) {
                this.updateLastActiveTime();
                if (this.isTrampling(enemy) && enemy.die) { // 
                    this.energy += 5
                    if (this.energy > 100) this.energy = 100;
                    enemy.die();
                } else {
                    collided = true;
                    this.hit();
                    console.log(`Pepe (Energie:${this.energy} Salsa:${this.arsenal.length}) colided with enemy ${idx}`);
                }
            }
        });
        this.collided = collided;
    }

    updateLastActiveTime = () => { this.lastActiveTime = Date.now(); } // control my Nap-Frames

    isTrampling = (enemy) => {
        const isFalling = this.speedY < 0;
        const isCharacterAboveEnemy = this.rY + this.rH >= enemy.rY;
        return isFalling && isCharacterAboveEnemy;
    }

    collectBottles = () => {
        if (this.arsenal.length === this.bottleLimit) return;
        this.getRealFrame();

        this.world.level.bottles.forEach((bottle, idx) => {
            if (!bottle.status.isNew) return;
            bottle.getRealFrame();
            if (!this.isColliding(bottle)) return;
            this.updateLastActiveTime();

            bottle.status.isNew = false;
            // this.updateLastActiveTime(); // nicht noetig, da die Bottle sich nicht bewegen
            bottle.status.isPickedUp = true;
            this.arsenal.push(bottle); // Add to Pepe-Arsenal-Array
            AudioHub.playOne(AudioHub.SOUNDS.collectibles.bottle);
            this.updateStatusBars();
            console.log(`Pepe (Energie:${this.energy} Salsa:${this.arsenal.length}) collected Bottle-Idx-> ${idx}`);
        });
    }

    // #############################################################################################
    // collectCoins = () => {
    //     this.getRealFrame();

    //     this.world.level.coins.forEach((targetCoin, idx) => {
    //         targetCoin.getRealFrame();
    //         if (this.isColliding(targetCoin)) {
    //             // this.updateLastActiveTime(); // nicht noetig, da die Bottle sich nicht bewegen
    //             this.coinsCollected += 1;
    //             this.updateStatusBars();
    //             console.log(`Pepe (Energie:${this.energy} Coins:${this.coinsCollected}) collected Coin-Idx-> ${idx}`);
    //             this.world.level.coins = this.world.level.coins.filter(coin => coin !== targetCoin);
    //             return;
    //         }
    //     });
    // }

    collectCoins = () => {
        this.getRealFrame();

        this.world.level.coins = this.world.level.coins.filter((coin, idx) => {
            coin.getRealFrame();
            if (this.isColliding(coin)) {
                this.updateLastActiveTime();
                this.coinsCollected++;
                AudioHub.playOne(AudioHub.SOUNDS.collectibles.coin);
                this.updateStatusBars();
                console.log(`Pepe (Energie:${this.energy} Coins:${this.coinsCollected}) collected Coin-Idx-> ${idx}`);
                return false; // delete from Liste
            }
            return true; // Coin stay in Liste
        });
    }
    // ###################################################################################

    updateStatusBars = () => {
        this.world.statusBar_bottle.setPrecentage(this.arsenal.length * 10);
        this.world.statusBar_health.setPrecentage(this.energy);
        this.world.statusBar_coin.setPrecentage(this.coinsCollected);
    }

    throwBottle = () => {
        if (Date.now() - this.lastThrowTime < 500) return;
        if (this.arsenal.length < 1) return;
        if (!this.world.keyboard.THROW) return;
        this.updateLastActiveTime(); // Pruefe speter ???????????????????????????????????????
        const bottle = this.arsenal.pop();
        console.log(`Pepe (Energie:${this.energy} Salsa:${this.arsenal.length})`);
        this.updateStatusBars();

        this.getRealFrame();
        const startX = this.otherDirection // Bottle's Start-Position is ~ Pepe's Position
            ? (this.rX - this.rW)   // If Pepe guckt left
            : this.rX;              // If Pepe guckt right
        const startY = this.rY;
        bottle.triggerThrow({ _x: startX, _y: startY, _throwDirection: this.otherDirection });
        this.lastThrowTime = Date.now();
    }
    // #endregion Instance Methods

}
