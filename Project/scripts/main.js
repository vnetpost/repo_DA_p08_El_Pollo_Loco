// ./scripts/main.js

import { Scene } from "./models/index.js";

let level1;
// “DOMContentLoaded” indicates that only the HTML-DOM is fully loaded.
// document.addEventListener("DOMContentLoaded", initGame);
// But "load" means that DOM,Images,css,... are fully loaded.   
window.addEventListener("load", () => {
    level1 = new Scene();
    level1.initGame();
});























// let reflect = [];
// window.addEventListener("keydown", (e) => {
//     reflect.push(e.code);
//     console.log(reflect);
    
// });