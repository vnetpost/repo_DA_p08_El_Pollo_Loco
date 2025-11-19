import { DynamicSprite } from "./DynamicSprite.class.js";

// Character-Player Instances
class Hero extends DynamicSprite {


    //  -> e.code = ["KeyD", "Space", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]

    jump() {
        console.log("Hero Jumps!");
        
    }
    throw() {
        console.log("Hero throws!");

    }

    addEvents() {
        window.addEventListener("keydown", (e) => {
            if (e.code === "ArrowLeft") this.goLeft();
            if (e.code === "ArrowRight") this.goRight();
            if (e.code === "ArrowUp");
            if (e.code === "ArrowDown");
            if (e.code === "Space") this.jump();
            if (e.code === "KeyD") this.throw();
        });
    }
}