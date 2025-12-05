
/**
 * @class   Central audio manager for playing, stopping and globally adjusting game sounds.
 */
export class AudioHub {
    // #region Attributes
    static defaultVolume = 0.15;
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
    // #endregion Attributes

    // #region Instance Methods
    /**
     * Play a single sound from the start.
     * @param {HTMLAudioElement} sound
     */
    static playOne(sound) {
        // sound.volume = AudioHub.defaultVolume;
        sound.currentTime = 0;
        sound.play();
    }

    /**
     * Pause a single sound.
     * @param {HTMLAudioElement} sound
     */
    static stopOne(sound) {
        sound.pause();
    }

    /**
     * Pause every registered sound.
     */
    static stopAll() {
        function pauseAllSounds(obj) {
            Object.values(obj).forEach(value => {
                if (value instanceof Audio) value.pause();
                else if (typeof value === 'object') pauseAllSounds(value);
            });
        }
        pauseAllSounds(AudioHub.SOUNDS);
    }

    /**
     * Set volume for every registered sound, using the UI slider (idVolumeSlider).
     */
    static objSetVolume() {
        const ref_volumeSlider = document.getElementById("idVolumeSlider");
        const userInputVolume = ref_volumeSlider ? Number(ref_volumeSlider.value) : AudioHub.defaultVolume;

        function adjustAllSounds(obj) {
            Object.values(obj).forEach((value) => {
                if (value instanceof Audio) value.volume = userInputVolume;
                else if (typeof value == "object") adjustAllSounds(value);
            });
        }
        adjustAllSounds(AudioHub.SOUNDS);
    }
    // #endregion Instance Methods
}
