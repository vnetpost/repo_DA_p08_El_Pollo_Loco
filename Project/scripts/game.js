import { Endboss, ImgHub, IntervalHub, World, AudioHub } from "./models/index.js";

let world;
const ref_startScreen = document.getElementById("idStartScreen");
const ref_startButton = document.getElementById("idStartBtn");
const ref_canvas = document.getElementById("idCanvas");
const ref_idLastScreen = document.getElementById("idLastScreen");
const ref_backToStartButton = document.getElementById("idBackToStartBtn");
const ref_restartButton = document.getElementById("idRestartBtn");
const ref_soundBtn = document.getElementById("idSoundBtn");
const ref_soundPanel = document.getElementById("idSoundPanel");
const ref_volumeSlider = document.getElementById("idVolumeSlider");
const ref_gameScreens = document.querySelector(".cGameScreens");
const ref_fullscreenBtn = document.getElementById("idFullscreenBtn");
const ref_impressum = document.querySelector(".cImpressum");

init();

/**
 * Initialize start screen, Set events and restore volume.
 */
function init() {
    ref_startScreen.src = ImgHub.IMGS.screens.start.screen1;

    ref_startButton.addEventListener("click", startGame);
    ref_backToStartButton.addEventListener("click", backToStartScreen);
    ref_restartButton.addEventListener("click", restartGame);

    ref_soundBtn.addEventListener("click", toggleSoundPanel);
    ref_volumeSlider.addEventListener("input", onVolumeChange);

    const savedVolume = loadSavedVolume();
    AudioHub.defaultVolume = savedVolume;
    ref_volumeSlider.value = savedVolume;
    AudioHub.objSetVolume();

    ref_fullscreenBtn.addEventListener("click", toggleFullscreen);
}

/**
 * Load saved volume or useing default.
 * @returns {number}
 */
function loadSavedVolume() {
    const savedVolume = localStorage.getItem("defaultVolume");
    if (savedVolume === null) return AudioHub.defaultVolume;
    return Number(savedVolume);
}

/**
 * Start or restart the world, hide overlays and trigger watcher.
 */
function startGame() {
    cleanupWorld();
    hideOverlays();
    lockImpressum();
    world = new World(ref_canvas);
    AudioHub.playOne(AudioHub.SOUNDS.game.start);
    AudioHub.playOne(AudioHub.SOUNDS.game.bgMusic);

    startGameWatcher();
}

/**
 * Restart the game including sounds.
 */
function restartGame() {
    AudioHub.stopAll();
    startGame();
}

/**
 * Return to start screen from end screen.
 */
function backToStartScreen() {
    AudioHub.stopAll();
    cleanupWorld();
    ref_idLastScreen.classList.add("hidden");
    ref_restartButton.classList.add("hidden");
    ref_backToStartButton.classList.add("hidden");
    ref_startScreen.classList.remove("hidden");
    ref_startButton.classList.remove("hidden");
    unlockImpressum();
}

/**
 * Stop world loops and sounds.
 */
function cleanupWorld() {
    if (!world) return;
    world.isStopped = true;
    if (world.character.stopRunSound) world.character.stopRunSound();
    IntervalHub.stopAllIntervals();
}

/**
 * Hide all overlay screens/buttons.
 */
function hideOverlays() {
    ref_startScreen.classList.add("hidden");
    ref_startButton.classList.add("hidden");
    ref_idLastScreen.classList.add("hidden");
    ref_restartButton.classList.add("hidden");
    ref_backToStartButton.classList.add("hidden");
}

/**
 * Swap end screen image based on win/loss.
 * @param {{didWin: boolean}} param0
 */
function setLastScreenImage({ didWin }) {
    ref_idLastScreen.src = didWin
        ? ImgHub.IMGS.screens.youWonLost.youWinA
        : ImgHub.IMGS.screens.gameOverFolder.youLost;
}

/**
 * Show end screen und buttons.
 */
function showLastScreen() {
    ref_idLastScreen.classList.remove("hidden");
    ref_restartButton.classList.remove("hidden");
    ref_backToStartButton.classList.remove("hidden");
    unlockImpressum();
}

/**
 * Watch character/endboss state and trigger end screen with music.
 */
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

/**
 * Toggle the volume panel visibility.
 */
function toggleSoundPanel() {
    ref_soundPanel.classList.toggle("hidden");
}

/**
 * apply new volume from the slider.
 */
function onVolumeChange() {
    const newVolume = Number(ref_volumeSlider.value);
    AudioHub.defaultVolume = newVolume;
    localStorage.setItem("defaultVolume", newVolume);
    AudioHub.objSetVolume();
}

/**
 * Enter or exit fullscreen for the game container (gameScreens).
 */
function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else ref_gameScreens.requestFullscreen();
}

function lockImpressum() { ref_impressum.classList.add("is-disabled"); }
function unlockImpressum() { ref_impressum.classList.remove("is-disabled"); }
