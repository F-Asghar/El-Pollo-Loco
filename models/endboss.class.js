import { level1 } from "../levels/level1.js";
import { Character } from "./character.class.js";
import { ImageHub } from "./imageHub.class.js";
import { IntervalHub } from "./intervalHub.class.js";
import { Level } from "./level.class.js";
import { MovableObjekt } from "./movable-object.class.js";
import { SoundHub } from "./soundHub.class.js";

export class Endboss extends MovableObjekt {
    width = 300;
    height = 400;
    x = 2600;
    y = 55;
    energy = 1000;
    lastHit;
    soundPlayed;
    hurtSound = false;
    speed = 10;
    static alive = true;
    offset = {
        top: 20,
        right: 20,
        left: 20,
        bottom: 20,
    };
    rX;
    rY;
    rW;
    rH;

    constructor() {
        super();
        this.loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
        this.loadImages(ImageHub.endboss.alert);
        this.loadImages(ImageHub.endboss.walk);
        this.loadImages(ImageHub.endboss.dead);
        this.loadImages(ImageHub.endboss.hurt);
        IntervalHub.startInterval(this.startMovement, 1000 / 20);
        IntervalHub.startInterval(this.startAnimation, 200);
        IntervalHub.startInterval(this.animate, 200);
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
        IntervalHub.startInterval(this.setSound, 1000 / 60);
    }

    startMovement = () => {
        // this.x > 0 verhindert, dass der character weiter nach links laufen kann
        if (Character.isNearBy && !this.isDead()) {
            this.moveLeft();
            this.soundPlayed = true;
        }
    };

    // setSound = () => {
    //     if (!this.soundPlayed) {
    //         SoundHub.playOne(SoundHub.enemyHit);
    //     } else if (this.isDead()){
    //         SoundHub.playOne(SoundHub.enemyDead);
    //         setTimeout(() => {
    //             SoundHub.stopAll();
    //         }, 400);
    //     }
    // };

    setSound = () => {
        // Boss ist verletzt
        if (this.isHurt() && !this.hurtSound) {
            SoundHub.playOne(SoundHub.enemyHit);
            this.hurtSound = true;
            setTimeout(() => {
                this.hurtSound = false;
            }, 2000);
        }

        // Boss stirbt
        if (this.isDead()) {
            SoundHub.playOne(SoundHub.enemyDead);
            setTimeout(() => {
                SoundHub.stopAll();
            }, 400);
        }
    };
    
    startAnimation = () => {
        // Mit If abfragen können wir die dazugehörigen Bilderabfolgen starten
        if (this.isDead()) {
            this.playAnimation(ImageHub.endboss.dead);
            Endboss.alive = false;
            // hier alle animationen und intervalle stoppen und löschen!
            setTimeout(() => {
                IntervalHub.stopAllIntervals();
            }, 400);
        } else if (this.isHurt()) {
            this.playAnimation(ImageHub.endboss.hurt);
            this.soundPlayed = false;
        } else if (Character.isNearBy) {
            this.playAnimation(ImageHub.endboss.walk);
        } else {
            this.playAnimation(ImageHub.endboss.alert);
        }
    };
}
