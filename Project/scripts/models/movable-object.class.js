import { DrawableObject } from "./drawable-object.class.js";


export class MovableObject extends DrawableObject {
    // #region Attributes    
    rX;
    rY;
    rW;
    rH;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    world;
    isDead = false;                     // Pepe, Chickens,Jefa
    speed = 0.15;

    speedY = 0;
    acceleration = 1.7;
    energy = 100;
    lastHit = 0;

    offset = {
        top: this.height / 2,
        bottom: this.height / 10,
        left: this.width / 3,
        right: this.width / 3
    };
    // #endregion Attributes

    constructor() { super(); }

    // #region Instance Methods
    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY; //console.log(this.y);
            this.speedY -= this.acceleration; //console.log(this.speedY);

            if (this.y > 266) { // Reset Pepe Y-Achse Position
                this.y = 266;
                this.speedY = 0;
                // this.currentImage = this.imageCache[this.IMAGES_IDLE_SHORT[0]];
                // this.currentImageIndex = 0;
            }
        }
    }

    moveRight = () => {
        console.log("Moving right");
    }

    isAboveGround() { return this.y < 266; }
    // isDead() { return this.energy == 0 }
    moveLeft = () => { !(this.x + this.width <= 0) ? this.x -= this.speed : this.x = 720 * 4 + this.width; }

    isHurt() { return Date.now() - this.lastHit < 500; }// < True for 5 Second to stay im Hurt-Zustand

    hit() {
        this.energy > 0 ? this.energy -= 1 : this.isDead = true;
        this.lastHit = Date.now();
    }

    drawFrame(ctx) {
        // if (!this instanceof Character) return;
        ctx.lineWidth = 3;
        // ctx.strokeStyle = "red";
        ctx.beginPath();
        // this.getRealFrame();
        ctx.rect(this.rX, this.rY, this.rW, this.rH);
        ctx.stroke();
    }

    

    isColliding = (mO) => {
        return this.rX + this.rW > mO.rX &&
            this.rY + this.rH > mO.rY &&
            this.rX < mO.rX + mO.rW &&
            this.rY < mO.rY + mO.rH;
    }

    // #endregion Instance Methods
}
