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
    x = 3600;
    y = 55;
    energy = 1000;
    speed = 15;
    lastHit;
    soundPlayed;
    hurtSound = false;
    isDeadSoundPlayed = false;
    otherDirection = false;
    static alive = true;
    offset = {
        top: 60,
        right: 40,
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
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
        IntervalHub.startInterval(this.setSound, 1000 / 60);
    }

    /**
     * Manages the endboss sound effects. Triggers a hurt sound with a 2-second cooldown,
     * and plays a final death sound that stops all audio after 600ms.
     * * @global
     * @requires SoundHub
     */
    setSound = () => {
        if (this.isHurt() && !this.hurtSound) {
            SoundHub.playOne(SoundHub.enemyHit);
            this.hurtSound = true;
            setTimeout(() => {
                this.hurtSound = false;
            }, 800);
        }
        if (this.isDead() && !this.isDeadSoundPlayed) {
            this.isDeadSoundPlayed = true;
            SoundHub.playOne(SoundHub.enemyDead);
            setTimeout(() => {
                this.isDeadSoundPlayed = false;
            }, 1000);
        }
    };

    /**
     * Controls the endboss animation loop and state switches (death sequence,
     * getting hurt, walking, or staying alert).
     * * @global
     * @requires ImageHub
     * @requires Endboss
     * @requires Character
     * @requires IntervalHub
     */
    startAnimation = () => {
        if (this.isDead()) {
            this.playAnimation(ImageHub.endboss.dead);
            Endboss.alive = false;
            setTimeout(() => {
                IntervalHub.stopAllIntervals();
            }, 600);
        } else if (this.isHurt()) {
            this.playAnimation(ImageHub.endboss.hurt);
            this.soundPlayed = false;
        } else if (Character.isNearBy) {
            this.playAnimation(ImageHub.endboss.walk);
        } else {
            this.playAnimation(ImageHub.endboss.alert);
        }
    };

    /**
     * Main movement control loop. Checks requirements and initiates
     * the character chasing logic if the conditions are met.
     */
    startMovement = () => {
        if (this.isDead() || !Character.isNearBy || !this.world?.character) {
            return;
        }
        this.chaseCharacter(this.world.character);
    };

    /**
     * Controls horizontal movement and direction changes based on the character's position.
     * @param {Object} char - The character instance from the world.
     */
    chaseCharacter(char) {
        let offset = 180;

        if (!this.otherDirection) {
            this.handleLeftMovement(char, offset);
        } else {
            this.handleRightMovement(char, offset);
        }
    }

    /**
     * Handles movement to the left or switches direction to the right if the character is too far right.
     * @param {Object} char - The character instance.
     * @param {number} offset - The distance threshold before turning around.
     */
    handleLeftMovement(char, offset) {
        if (char.x > this.x + offset) {
            this.otherDirection = true;
        } else {
            this.moveLeft();
        }
    }

    /**
     * Handles movement to the right or switches direction to the left if the character is too far left.
     * @param {Object} char - The character instance.
     * @param {number} offset - The distance threshold before turning around.
     */
    handleRightMovement(char, offset) {
        if (char.x < this.x - offset) {
            this.otherDirection = false;
        } else {
            this.moveRight();
        }
    }
}
