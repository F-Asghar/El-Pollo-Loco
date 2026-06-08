import { ImageHub } from "./imageHub.class.js";
import { IntervalHub } from "./intervalHub.class.js";
import { MovableObjekt } from "./movable-object.class.js";
import { SoundHub } from "./soundHub.class.js";

export class Chicken extends MovableObjekt {
    x = 800 + Math.random() * 1000;
    y = 335;
    height = 100;
    width = 100;
    speed = 5 + Math.random() * 5;
    energy = 100;
    soundPlayed;
    jumpedOn = false;
    isHit = false;
    hitted = false;
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
        this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(ImageHub.chickenNormal.walk);
        this.loadImages(ImageHub.chickenNormal.dead);
        IntervalHub.startInterval(this.changeDirection, 1000 / 60);
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
        IntervalHub.startInterval(this.startMovement, 1000 / 20);
        IntervalHub.startInterval(this.startAnimation, 200);
        IntervalHub.startInterval(this.setSound, 1000 / 60);
    }

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
        if (this.x <= 50) {
            this.otherDirection = true;
        } else if (this.x >= 2400) {
            this.otherDirection = false;
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
