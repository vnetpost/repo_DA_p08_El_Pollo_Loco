

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
            attack: new Audio('./assets/sounds/endboss/attack.mp3'),
        },
        game: {
            start: new Audio('./assets/sounds/game/gameStart.mp3'),
            bgMusic: new Audio('./assets/sounds/game/escuchaMe.mp3'),
            gameOverMusic1: new Audio('./assets/sounds/game/rose.mp3'),
            gameOverMusic2: new Audio('./assets/sounds/game/chicken.mp3'),
            wonMusic: new Audio('./assets/sounds/game/vamosABailar.mp3'),
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

    // Stoppt das Abspielen einer einzelnen Audiodatei
    static stopOne(sound) {
        sound.pause();  // Pausiert das übergebene Audio
    }

    // Stoppt das Abspielen aller Audiodateien
    static stopAll() {
        function pauseAllSounds(obj) {
            Object.values(obj).forEach(value => {
                if (value instanceof Audio)
                    value.pause();
                else if (typeof value === 'object') {
                    pauseAllSounds(value);
                }
            });
        }
        pauseAllSounds(AudioHub.SOUNDS);
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
