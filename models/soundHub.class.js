export class SoundHub {
    static muted = false;
    static playing = true;

    static pepeWalk = new Audio("./sounds/character/characterRun.mp3");
    static pepeJump = new Audio("./sounds/character/characterJump.wav");
    static pepeHurt = new Audio("./sounds/character/characterDamage.mp3");
    static pepeDead = new Audio("./sounds/character/characterDead.wav");
    static pepeSleep = new Audio("./sounds/character/characterSnoring.mp3");

    static enemyDead = new Audio("./sounds/chicken/chickenDead.mp3");
    static enemyHit = new Audio("./sounds/chicken/chickenDead2.mp3");
    static endBoss = new Audio("./sounds/endboss/endbossApproach.wav");

    static collectCoins = new Audio("./sounds/collectibles/collectSound.wav");
    static collectBottle = new Audio(
        "./sounds/collectibles/bottleCollectSound.wav",
    );
    static bottleBreak = new Audio("./sounds/throwable/bottleBreak.mp3");
    static gameStart = new Audio("./sounds/game/gameStart.mp3");

    /**
     * Array storing all currently tracked audio instances.
     * @type {HTMLAudioElement[]}
     */
    static allSounds = [];

    /**
     * Plays a single sound from the beginning if audio is enabled.
     * @param {HTMLAudioElement} sound - The audio object to play.
     */
    static playOne(sound) {
        if (SoundHub.playing) {
            sound.volume = 0.2;
            sound.currentTime = 0;
            sound.play();
            this.allSounds.push(sound);
        }
    }

    /**
     * Pauses all tracked sounds and updates global state flags to muted.
     */
    static stopAll() {
        if (!SoundHub.muted) {
            SoundHub.allSounds.forEach((sound) => {
                sound.pause();
                sound.volume = 0.0;
                SoundHub.muted = true;
                SoundHub.playing = false;
            });
        }
    }

    /**
     * Resets the entire sound hub state, clearing and pausing all tracked audio.
     */
    static resetSound() {
        this.allSounds.forEach((sound) => {
            sound.pause();
            sound.currentTime = 0;
        });
        this.allSounds = [];
        SoundHub.muted = false;
        SoundHub.playing = true;
        this.defaultVolume = 0.2;
    }

    /**
     * Restores volume for all tracked audio instances if audio was disabled.
     */
    static playAll() {
        if (!SoundHub.playing) {
            SoundHub.allSounds.forEach((sound) => {
                sound.volume = 0.2;
                SoundHub.playing = true;
                SoundHub.muted = false;
            });
        }
    }

    /**
     * Pauses a specific audio instance.
     * @param {HTMLAudioElement} sound - The audio object to stop.
     */
    static stopOne(sound) {
        sound.pause();
    }
}
