// ./scripts/main.js

import { ImgHub } from "./classes/img-hub.class.js";

// document.addEventListener("DOMContentLoaded", initGame);
window.addEventListener("load", initGame);

let canvas;
let ctx;
let hero = new Image();

function initGame() {
    canvas = document.getElementById("idCanvas");
    ctx = canvas.getContext('2d');
    hero.src = ImgHub.IMGS.pepe.walk[0];

    hero.onload = () => {
        ctx.drawImage(hero, 50, 50, 150, 150);
    }
}



// letsGo();