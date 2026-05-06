export class SoundHub {
    // Audiodateien

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
    static collectBottle = new Audio("./sounds/collectibles/bottleCollectSound.wav");
    static bottleBreak = new Audio("./sounds/throwable/bottleBreak.mp3");
    static gameStart = new Audio("./sounds/game/gameStart.mp3");

    // Array, das alle definierten Audio-Dateien enthält
    static allSounds = [];

    // Spielt eine einzelne Audiodatei ab
    static playOne(sound) {
        if (SoundHub.playing) {
            // instrumentId nur wichtig für die Visualisierung
            sound.volume = 0.2; // Setzt die Lautstärke auf 0.2 = 20% / 1 = 100%
            sound.currentTime = 0; // Startet ab einer bestimmten stelle (0=Anfang/ 5 = 5 sec.)
            sound.play(); // Spielt das übergebene Sound-Objekt ab
            this.allSounds.push(sound);
        }
    }

    // Stoppt das Abspielen aller Audiodateien
    static stopAll() {
        if (!SoundHub.muted) {
            SoundHub.allSounds.forEach((sound) => {
                sound.pause(); // Pausiert jedes Audio in der Liste
                sound.volume = 0.0;
                SoundHub.muted = true;
                SoundHub.playing = false;
            });
        }
    }

static resetSound() {
    // 1. Alle laufenden Sounds stoppen
    this.allSounds.forEach((sound) => {
        sound.pause();        // Beendet die Wiedergabe
        sound.currentTime = 0; // Setzt den Sound an den Anfang zurück
    });

    // 2. Das Array komplett leeren (löscht die Referenzen)
    this.allSounds = [];

    // 3. Auf Standardeinstellungen zurücksetzen
    SoundHub.muted = false;
    SoundHub.playing = true;
    
    // Falls du eine globale Standard-Lautstärke für neue Sounds willst:
    // (Achte darauf, dass diese Variable auch existiert)
    this.defaultVolume = 0.2; 
}

    static playAll() {
        if (!SoundHub.playing) {
            SoundHub.allSounds.forEach((sound) => {
                sound.volume = 0.2;
                SoundHub.playing = true;
                SoundHub.muted = false;
            });
        }
    }

    // Stoppt das Abspielen einer einzelnen Audiodatei
    static stopOne(sound) {
        sound.pause(); // Pausiert das übergebene Audio
    }

    // ##########################################################################################################################
    // ################################################  Sound Slider - BONUS !  ################################################
    // Setzt die Lautstärke für alle Audiodateien
    static objSetVolume(volumeSlider) {
        let volumeValue = document.getElementById("volume").value; // Holt den aktuellen Lautstärkewert aus dem Inputfeld
        volumeSlider.forEach((sound) => {
            sound.volume = volumeValue; // Setzt die Lautstärke für jedes Audio wie im Slider angegeben
        });
    }
}




// Soundhub zeigt Fehlermeldung, ist noch nicht zu Ende geladen prüfen!