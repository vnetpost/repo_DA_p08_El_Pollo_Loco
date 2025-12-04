import { Endboss, ImgHub, IntervalHub, World, AudioHub } from "./models/index.js";

let world;
const ref_startScreen = document.getElementById("idStartScreen");
const ref_startButton = document.getElementById("idStartBtn");
const ref_canvas = document.getElementById("idCanvas");
const ref_idLastScreen = document.getElementById("idLastScreen");
const ref_restartButton = document.getElementById("idRestartBtn");
const ref_soundBtn = document.getElementById("idSoundBtn");
const ref_soundPanel = document.getElementById("idSoundPanel");
const ref_volumeSlider = document.getElementById("idVolumeSlider");
const ref_gameScreens = document.querySelector(".cGameScreens");
const ref_fullscreenBtn = document.getElementById("idFullscreenBtn");


init();

function init() {
    ref_startScreen.src = ImgHub.IMGS.screens.start.screen1;

    ref_startButton.addEventListener("click", startGame);
    ref_restartButton.addEventListener("click", restartGame);

    ref_soundBtn.addEventListener("click", toggleSoundPanel);
    ref_volumeSlider.addEventListener("input", onVolumeChange);

    ref_volumeSlider.value = AudioHub.defaultVolume;
    AudioHub.objSetVolume();

    ref_fullscreenBtn.addEventListener("click", toggleFullscreen);
}

function startGame() {
    cleanupWorld();
    hideOverlays();
    world = new World(ref_canvas);
    AudioHub.playOne(AudioHub.SOUNDS.game.start);
    AudioHub.playOne(AudioHub.SOUNDS.game.bgMusic);

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
            AudioHub.playOne(AudioHub.SOUNDS.game.gameOverMusic2);

        }
        else {
            didWin = true;
            AudioHub.stopAll();
            AudioHub.playOne(AudioHub.SOUNDS.game.wonMusic);
        }
        setLastScreenImage({ didWin });
        cleanupWorld();
        showLastScreen();
    }, 4500);
}

function toggleSoundPanel() {
    ref_soundPanel.classList.toggle("hidden");
}

function onVolumeChange() {
    AudioHub.objSetVolume();
}

function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else ref_gameScreens.requestFullscreen();
}


