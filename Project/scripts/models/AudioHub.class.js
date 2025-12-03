

export class AudioHub {

    static SOUNDS = {
        pepe: {
            walk: new Audio('./assets/sounds/character/characterRun.mp3'),
            snor: new Audio('./assets/sounds/character/characterSnoring.mp3'),
            jump: new Audio('./assets/sounds/character/characterJump.wav'),
            hurt: new Audio('./assets/sounds/character/characterDamage.mp3'),
            dead: new Audio('./assets/sounds/character/characterDead.wav'),
        },
        chicken: {
            deadA: new Audio('./assets/sounds/chicken/chickenDead.mp3'),
            deadB: new Audio('./assets/sounds/chicken/chickenDead2.mp3'),
        },
        collectibles: {
            coin: new Audio('./assets/sounds/collectibles/collectSound.wav'),
            bottle: new Audio('./assets/sounds/collectibles/bottleCollectSound.wav'),
        },
        endboss: {
            approach: new Audio('./assets/sounds/endboss/endbossApproach.wav'),
        },
        game: {
            start: new Audio('./assets/sounds/game/gameStart.mp3'),
        },
        throwable: {
            bottleBreak: new Audio('./assets/sounds/throwable/bottleBreak.mp3'),
        },
    }

    // Spielt eine einzelne Audiodatei ab
    static playOne(sound) {
        sound.volume = 0.2;  // Setzt die Lautstärke auf 0.2 = 20% / 1 = 100%
        sound.currentTime = 0;  // Startet ab einer bestimmten stelle (0=Anfang/ 5 = 5 sec.)
        sound.play();  // Spielt das übergebene Sound-Objekt ab
    }


    // Stoppt das Abspielen aller Audiodateien
    static stopAll() {
        AudioHub.allSounds.forEach(sound => {
            sound.pause();  // Pausiert jedes Audio in der Liste
        });
        document.getElementById('volume').value = 0.2;  // Setzt den Sound-Slider wieder auf 0.2
    }


    // Stoppt das Abspielen einer einzelnen Audiodatei
    static stopOne(sound) {
        sound.pause();  // Pausiert das übergebene Audio
    }


    // ##########################################################################################################################
    // ################################################  Sound Slider - BONUS !  ################################################
    // Setzt die Lautstärke für alle Audiodateien
    static objSetVolume(volumeSlider) {
        let volumeValue = document.getElementById('volume').value;  // Holt den aktuellen Lautstärkewert aus dem Inputfeld
        volumeSlider.forEach(sound => {
            sound.volume = volumeValue;  // Setzt die Lautstärke für jedes Audio wie im Slider angegeben
        });
    }
}
