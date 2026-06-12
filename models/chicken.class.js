import { ImageHub } from "./imageHub.class.js";
import { IntervalHub } from "./intervalHub.class.js";
import { MovableObjekt } from "./movable-object.class.js";
import { SoundHub } from "./soundHub.class.js";

export class Chicken extends MovableObjekt {
    x = 500 + Math.random() * 3500;
    y = 335;
    height = 100;
    width = 100;
    energy = 100;
    acceleration = 1.8;
    soundPlayed;
    jumpedOn = false;
    isHit = false;
    hitted = false;
    isHunter = false;
    offset = {
        top: 20,
        right: 25,
        left: 10,
        bottom: 20,
    };
    rX;
    rY;
    rW;
    rH;

    constructor() {
        super();

        this.isHunter = Math.random() < 0.3;

        this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(ImageHub.chickenNormal.walk);
        this.loadImages(ImageHub.chickenNormal.dead);
        IntervalHub.startInterval(this.changeDirection, 1000 / 60);
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
        IntervalHub.startInterval(this.startMovement, 1000 / 20);
        IntervalHub.startInterval(this.startAnimation, 200);
        IntervalHub.startInterval(this.setSound, 1000 / 60);
        IntervalHub.startInterval(this.applyGravity, 1000 / 60);
        IntervalHub.startInterval(this.randomJump, 1000 / 60);
        IntervalHub.startInterval(this.changeSpeed, 1000 / 60);
    }

    isAboveGround() {
        return this.y < 335;
    }

    randomJump = () => {
        if (!this.isDead() && !this.isAboveGround()) {
            if (Math.random() < 0.01) {
                this.speedY = 15 + Math.random() * 10;
            }
        }
    };

    changeSpeed = () => {
        if (this.isDead()) return;
        if (Math.random() < 0.02) {
            this.speed = 4 + Math.random() * 8;
        }
    };

    /**
     * Controls the chicken's animation state. Displays the dead sprite, flattens its height,
     * and anchors it to the ground if dead; otherwise, loops the standard walking animation.
     * * @requires ImageHub
     */
    startAnimation = () => {
        if (this.isDead()) {
            this.playAnimation(ImageHub.chickenNormal.dead);
            this.height = 50;
            this.y = 385;
        } else {
            this.playAnimation(ImageHub.chickenNormal.walk);
        }
    };

    /**
     * Handles the horizontal patrol movement of the chicken.
     * Moves left by default, or right if the direction flag has been inverted,
     * provided the chicken is still alive.
     */
    startMovement = () => {
        if (!this.isDead() && !this.otherDirection) {
            this.moveLeft();
        } else if (!this.isDead() && this.otherDirection) {
            this.moveRight();
        }
    };

    /**
     * Inverts the chicken's movement direction flag whenever it hits
     * the defined left (50px) or right (2400px) boundaries of its patrol route.
     */

    changeDirection = () => {
        if (this.x <= 30) {
            this.otherDirection = true;
        } else if (this.x >= 3600) {
            this.otherDirection = false;
        } else {
            if (Math.random() < 0.005) {
                this.otherDirection = !this.otherDirection;
            }
        }
    };

    /**
     * Triggers the death sound effect exactly once when the chicken dies,
     * setting a flag to prevent the audio from looping or repeating.
     * * @global
     * @requires SoundHub
     */
    setSound = () => {
        if (this.isDead() && !this.soundPlayed) {
            SoundHub.playOne(SoundHub.enemyDead);
            this.soundPlayed = true;
        }
    };
}
