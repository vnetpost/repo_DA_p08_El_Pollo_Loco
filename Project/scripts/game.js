import { Character, Chicken, ImgHub, Keyboard, MovableObject, World } from "./models/index.js";

// ./scripts/main.js
let canvas;
let world;

function init() {
    canvas = document.getElementById("idCanvas");
    world = new World(canvas);

    console.log(world.character);
    console.log(world.level.enemies);
    console.log(world.level.clouds);
    console.log(world.level.backgroundObjects);
    console.log(world.level.bottles);
    
    

}

init();