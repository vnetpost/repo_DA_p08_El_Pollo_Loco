// ./scripts/main.js
import * as EPOLO from "./models/index.js"; // Define a Objekt-Namespace

// “DOMContentLoaded” indicates that only the HTML-DOM is fully loaded.
// document.addEventListener("DOMContentLoaded", initGame);
// But "load" means that DOM,Images,css,... are already fully loaded.   
window.addEventListener("load", EPOLO.Scene.initGame);

// async function initGame() {
//     await EPOLO.ImgHub.preloadAll();
//     EPOLO.Scene.LEVELS.push(new EPOLO.Scene());
// }




















// let reflect = [];
// window.addEventListener("keydown", (e) => {
//     reflect.push(e.code);
//     console.log(reflect);
    
// });