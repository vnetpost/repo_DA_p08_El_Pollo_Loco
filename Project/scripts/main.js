// ./scripts/main.js
// import { Scene } from "./models/index.js";
import * as EPOLO from "./models/index.js"; // Define a Objekt-Namespace

let level1;
// “DOMContentLoaded” indicates that only the HTML-DOM is fully loaded.
// document.addEventListener("DOMContentLoaded", initGame);
// But "load" means that DOM,Images,css,... are already fully loaded.   
window.addEventListener("load", () => {
    level1 = new EPOLO.Scene();
    level1.init();
    console.log(level1);
    
});























// let reflect = [];
// window.addEventListener("keydown", (e) => {
//     reflect.push(e.code);
//     console.log(reflect);
    
// });