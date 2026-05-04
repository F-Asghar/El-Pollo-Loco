import { level1 } from "../levels/level1.js";
import { ImageHub } from "./imageHub.class.js";
import { IntervalHub } from "./intervalHub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { Level } from "./level.class.js";
import { MovableObjekt } from "./movable-object.class.js";
import { SoundHub } from "./soundHub.class.js";

export class Character extends MovableObjekt {
    x = 50;
    y = 160;
    width = 120;
    height = 280;
    speed = 10;
    world;
    lastHit;
    // isAlive;
    energy = 100;
    static otherDirection = false;
    static alive = true;
    static isNearBy = false;
    static lastKeypressed = 0;
    // static walking_sound_running = false;
    soundPlayed = false;
    hurtSound = false;
    deadSound = false;
    
    offset = {
        top: 120,
        right: 40,
        left: 20,
        bottom: 30,
    };
    rX;
    rY;
    rW;
    rH;

    constructor() {
        // Ein Bild muss geladen werden, damit es standardmäßig etwas anzeigt, noch bevor man etwas drückt
        super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
        // Bilder müssen im constructor vorgeladen werden, um sie später verwenden zu können.
        this.loadImages(ImageHub.pepe.walk);
        this.loadImages(ImageHub.pepe.jump);
        this.loadImages(ImageHub.pepe.dead);
        this.loadImages(ImageHub.pepe.hurt);
        this.loadImages(ImageHub.pepe.idle);
        this.loadImages(ImageHub.pepe.long);
        this.applyGravity();
        this.getRealFrame();
        this.long();
        IntervalHub.startInterval(this.pepeWalkSound, 1000 / 4);
        IntervalHub.startInterval(this.setSoundSlow, 1000 / 4);
        IntervalHub.startInterval(this.setSoundFast, 1000 / 60);
        IntervalHub.startInterval(this.stopSound, 1000 / 60);
        IntervalHub.startInterval(this.fightEndboss, 1000 / 25);
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.startMovement, 1000 / 60);
        IntervalHub.startInterval(this.startAnimation, 100);
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
    }

    fightEndboss = () => {
        if (this.x > 2200) {
            Character.isNearBy = true;
        }
    };

    startMovement = () => {
        // Mit this.world.level.level_end_x verhindern wir, dass der Character weiter nach rechts laufen kann (Ende vom Level)
        if (
            Keyboard.RIGHT &&
            this.x < this.world.level.level_end_x &&
            Character.alive
        ) {
            this.moveRight();
            this.otherDirection = false;
            Character.otherDirection = false;
            this.soundPlayed = false;
        }

        // this.x > 0 verhindert, dass der character weiter nach links laufen kann
        if (Keyboard.LEFT && this.x > 0 && Character.alive) {
            this.moveLeft();
            this.otherDirection = true;
            Character.otherDirection = true;
        }

        // Wir können nur springen wenn unser Character auf dem Boden ist
        if (Keyboard.UP && !this.isAboveGround() && Character.alive) {
            this.jump();
            this.soundPlayed = false;
        }
        // Hiermit fixieren wir die Camera auf unseren Character
        //  + 100 rückt die Camera etwas weiter nach links, damit Pepe weiter rechts angezeigt wird.
        this.world.camera_x = -this.x + 100;
    };

    startAnimation = () => {
        // Mit If abfragen können wir die dazugehörigen Bilderabfolgen starten
        if (this.isDead()) {
            SoundHub.pepeWalk.pause();
            this.playAnimation(ImageHub.pepe.dead);
            Character.alive = false;
            SoundHub.pepeHurt.pause();
            // hier alle animationen und intervalle stoppen und löschen!
            setTimeout(() => {
                IntervalHub.stopAllIntervals();
                SoundHub.stopAll();
            }, 1200);
        } else if (this.isAboveGround()) {
            this.playAnimation(ImageHub.pepe.jump);
            this.long();
        } else if (this.isHurt()) {
            this.playAnimation(ImageHub.pepe.hurt);
            this.long();
        } else if (Keyboard.RIGHT || Keyboard.LEFT) {
            this.playAnimation(ImageHub.pepe.walk);
            this.long();
        } else if (this.isWaitingLong()) {
            this.playAnimation(ImageHub.pepe.long);
        } else {
            this.playAnimation(ImageHub.pepe.idle);
        }
    };

    long() {
        Character.lastKeypressed = new Date().getTime();
    }

    isWaitingLong() {
        let timePassed = new Date().getTime() - Character.lastKeypressed; // Differenz in ms
        timePassed = timePassed / 1000; // Differenz in Sekunden
        return timePassed > 5;
    }

    jump() {
        this.speedY = 30;
    }

    setSoundSlow = () => {
        if (this.isHurt() && !this.hurtSound) {
            SoundHub.playOne(SoundHub.pepeHurt);
            this.hurtSound = true;
            setTimeout(() => {
                this.hurtSound = false;
            }, 2000);
        } else if (this.isWaitingLong() && !this.soundPlayed) {
            SoundHub.playOne(SoundHub.pepeSleep);
            this.soundPlayed = true;
            setTimeout(() => {
                this.soundPlayed = false;
            }, 5000);
        } else if (!this.deadSound && !Character.alive) {
            SoundHub.allSounds = [];
            SoundHub.playOne(SoundHub.pepeDead);
            this.deadSound = true;
            setTimeout(() => {
                this.deadSound = false;
            }, 2500);
        }
    };

    // pepeWalkSound = () => {
    //     if (
    //         (Keyboard.LEFT && !this.isAboveGround()) ||
    //         (Keyboard.RIGHT && !this.isAboveGround())
    //     ) {
    //         // Startet den Sound fürs Laufen
    //         SoundHub.playOne(SoundHub.pepeWalk);
    //     }
    // }

    pepeWalkSound = () => {
        const isMovingOnGround =
            (Keyboard.LEFT || Keyboard.RIGHT) && !this.isAboveGround();

        if (isMovingOnGround) {
                // Character.walking_sound_running = true;
                SoundHub.playOne(SoundHub.pepeWalk); 
        } else if (!this.walking_sound_running) {
            // Wenn er aufhört zu laufen
            // this.walking_sound_running = false;
            SoundHub.pepeWalk.pause(); 
        }
    };

    setSoundFast = () => {
        if (Keyboard.UP && !this.isAboveGround() && Character.alive) {
            SoundHub.stopOne(SoundHub.pepeWalk);
            SoundHub.playOne(SoundHub.pepeJump);
        }
    };

    stopSound = () => {
        if (!Keyboard.LEFT && !Keyboard.RIGHT && !this.isAboveGround()) {
            SoundHub.stopOne(SoundHub.pepeWalk);
        }
    };
}
