export class SoundHub {
    static muted = false;

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

    static playOne(sound) {
        SoundHub.setVolume(sound);
        sound.currentTime = 0;
        SoundHub.allSounds.push(sound);
        sound.play();
    }

    static resetSound() {
        SoundHub.allSounds.forEach((sound) => {
            sound.pause();
            sound.currentTime = 0;
        });
        SoundHub.allSounds = [];
    }

    static stopOne(sound) {
        sound.pause();
    }

    static handleMute() {
        SoundHub.allSounds.forEach((sound) => {
            sound.volume = 0.0;
        });
        SoundHub.muted = true;

        // localStorage.setItem("isMuted", "true");
        const muteRef = document.getElementById("mute-button");
        const volumeRef = document.getElementById("volume-button");
        muteRef.style.display = "none";
        volumeRef.style.display = "block";
    }

    static handleVolume() {
        SoundHub.muted = false;
        SoundHub.allSounds.forEach((sound) => {
            if (sound === SoundHub.backgroundMusik) {
                sound.volume = 0.03;
            } else if (sound === SoundHub.endBoss) {
                sound.volume = 1;
            } else {
                sound.volume = 0.2;
            }
        });
        const muteRef = document.getElementById("mute-button");
        const volumeRef = document.getElementById("volume-button");
        muteRef.style.display = "block";
        volumeRef.style.display = "none";
    }

    static setVolume(sound) {
        if (!SoundHub.muted) {
            if (sound === SoundHub.backgroundMusik) {
                sound.volume = 0.03;
            } else if (sound === SoundHub.endBoss) {
                sound.volume = 1;
            } else {
                sound.volume = 0.2;
            }
        } else {
            sound.volume = 0.0;
        }
    }

    // #region test

    // #endregion

    // #region save
    // /**
    //  * Restores volume for all tracked audio instances if audio was disabled.
    //  */
    // static playAll() {
    //     if (!SoundHub.playing) {
    //         SoundHub.playing = true;
    //         SoundHub.muted = false;
    //         SoundHub.allSounds.forEach((sound) => {
    //             if (sound === SoundHub.backgroundMusik) {
    //                 sound.volume = 0.03;
    //             } else {
    //                 sound.volume = 0.2;
    //             }
    //             sound.play();
    //         });
    //     }
    // }

    // #endregion
}
