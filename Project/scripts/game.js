import { Endboss, ImgHub, IntervalHub, World } from "./models/index.js";

// ./scripts/main.js
let world;
let ref_startScreen;
let ref_startButton;
let ref_canvas;
let ref_idLastScreen;
let ref_restartButton;

function init() {
    ref_startScreen = document.getElementById("idStartScreen");
    ref_startScreen.src = ImgHub.IMGS.screens.start.screen1;
    ref_startButton = document.getElementById("idStartBtn");
    ref_startButton.addEventListener("click", startGame);

    ref_canvas = document.getElementById("idCanvas");

    ref_idLastScreen = document.getElementById("idLastScreen");
    ref_idLastScreen.src = ImgHub.IMGS.screens.gameOverFolder.youLost;
    ref_restartButton = document.getElementById("idRestartBtn");
    ref_restartButton.addEventListener("click", restartGame);
}

function startGame() {
    cleanupWorld();
    hideOverlays();
    world = new World(ref_canvas);
    startGameWatcher();
}

function restartGame() {
    startGame();
}

function cleanupWorld() {
    if (!world) return;
    world.isStopped = true;
    IntervalHub.stopAllIntervals();
}

function hideOverlays() {
    ref_startScreen.classList.add("hidden");
    ref_startButton.classList.add("hidden");
    ref_idLastScreen.classList.add("hidden");
    ref_restartButton.classList.add("hidden");
}

function setLastScreenImage({ didWin }) {
    ref_idLastScreen.src = didWin
        ? ImgHub.IMGS.screens.youWonLost.youWinA
        : ImgHub.IMGS.screens.gameOverFolder.youLost;
}

function showLastScreen() {
    ref_idLastScreen.classList.remove("hidden");
    ref_restartButton.classList.remove("hidden");
}

function startGameWatcher() {
    IntervalHub.startInterval(() => {
        const pepeDead = world.character.isDead;
        const jefaDead = world.level.enemies.some(enemy => enemy instanceof Endboss && enemy.isDead); // Findng first match
        if (!pepeDead && !jefaDead) return;

        let didWin;
        if (pepeDead) didWin = false;
        else didWin = true;

        setLastScreenImage({ didWin });
        cleanupWorld();
        showLastScreen();
    }, 4000);
}

init();
