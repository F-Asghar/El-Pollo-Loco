export class SoundHub {
    //#region sounds

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
    static backgroundMusik = new Audio(
        "./sounds/vincemcgill-western-upbeat-314736.mp3",
    );

    //#endregion

    static allSounds = [];

    /**
     * Plays a sound.
     * Sets the correct volume, resets the playback position,
     * and starts playing the audio.
     *
     * @param {HTMLAudioElement} sound - The audio element to play.
     */
    static playOne(sound) {
        SoundHub.setVolume(sound);
        sound.currentTime = 0;
        SoundHub.allSounds.push(sound);
        sound.play();
    }

    /**
     * Stops and resets all registered sounds.
     * Also stops the background music and clears the sound list.
     */
    static resetSound() {
        SoundHub.stopOne(SoundHub.backgroundMusik);
        SoundHub.allSounds.forEach((sound) => {
            sound.pause();
            sound.currentTime = 0;
        });
        SoundHub.allSounds = [];
    }

    /**
     * Stops a single sound.
     *
     * @param {HTMLAudioElement} sound - The audio element to stop.
     */
    static stopOne(sound) {
        sound.pause();
    }

    /**
     * Enables mute mode.
     * Sets the volume of all registered sounds to zero
     * and stores the setting in local storage.
     */
    static handleMute() {
        localStorage.setItem("isMuted", "true");
        SoundHub.allSounds.forEach((sound) => {
            sound.volume = 0.0;
        });
        SoundHub.updateVolumeIcons();
    }

    /**
     * Disables mute mode.
     * Restores the volume of all registered sounds
     * based on their sound category.
     */
    static handleVolume() {
        localStorage.setItem("isMuted", "false");
        SoundHub.allSounds.forEach((sound) => {
            if (sound === SoundHub.backgroundMusik) {
                sound.volume = 0.02;
            } else if (sound === SoundHub.pepeWalk) {
                sound.volume = 0.18;
            } else if (sound === SoundHub.endBoss) {
                sound.volume = 1;
            } else {
                sound.volume = 0.2;
            }
        });
        SoundHub.updateVolumeIcons();
    }

    /**
     * Updates the visibility of the mute and volume buttons
     * according to the current mute state.
     */
    static updateVolumeIcons() {
        const muteRef = document.getElementById("mute-button");
        const volumeRef = document.getElementById("volume-button");
        if (!muteRef || !volumeRef) return;
        if (localStorage.getItem("isMuted") === "true") {
            muteRef.style.display = "none";
            volumeRef.style.display = "block";
        } else {
            muteRef.style.display = "block";
            volumeRef.style.display = "none";
        }
    }

    /**
     * Sets the volume of a sound based on
     * the current audio settings.
     *
     * @param {HTMLAudioElement} sound - The audio element whose volume should be set.
     */
    static setVolume(sound) {
        if (localStorage.getItem("isMuted") !== "true") {
            if (sound === SoundHub.backgroundMusik) {
                sound.volume = 0.02;
            } else if (sound === SoundHub.pepeWalk) {
                sound.volume = 0.18;
            } else if (sound === SoundHub.endBoss) {
                sound.volume = 1;
            } else {
                sound.volume = 0.2;
            }
        } else {
            sound.volume = 0.0;
        }
    }
}
