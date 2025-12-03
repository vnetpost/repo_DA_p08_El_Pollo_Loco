import { Endboss, ImgHub, IntervalHub, World, AudioHub } from "./models/index.js";

// ./scripts/main.js
let world;
let ref_startScreen;
let ref_startButton;
let ref_canvas;
let ref_idLastScreen;
let ref_restartButton;

init();

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
    AudioHub.playOne(AudioHub.SOUNDS.game.start);
    AudioHub.playOne(AudioHub.SOUNDS.game.bgMusic);
    AudioHub.SOUNDS.game.bgMusic.volume = 0.1;

    startGameWatcher();
}

function restartGame() {
    AudioHub.stopAll();
    startGame();
}

function cleanupWorld() {
    if (!world) return;
    world.isStopped = true;
    if (world.character.stopRunSound) world.character.stopRunSound();
    IntervalHub.stopAllIntervals();
    // AudioHub.stopAll();
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
        if (pepeDead) {
            didWin = false;
            AudioHub.stopAll();
            AudioHub.playOne(AudioHub.SOUNDS.game.gameOverMusic1);
            AudioHub.SOUNDS.game.gameOverMusic1.volume = 1;

        }
        else {
            didWin = true;
            AudioHub.stopAll();
            AudioHub.playOne(AudioHub.SOUNDS.game.wonMusic);
            AudioHub.SOUNDS.game.wonMusic.volume = 1;
        }
        setLastScreenImage({ didWin });
        cleanupWorld();
        showLastScreen();
    }, 4000);
}


