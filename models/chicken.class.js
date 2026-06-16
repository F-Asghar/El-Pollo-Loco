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
    acceleration = 1;
    soundPlayed;
    jumpedOn = false;
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
        IntervalHub.startInterval(this.applyGravity, 1000 / 60);
        IntervalHub.startInterval(this.changeSpeed, 1000 / 60);
    }

    /**
     * Checks if the object is currently in the air based on its Y-coordinate.
     * @returns {boolean} True if the object's Y-coordinate is less than the ground level (335).
     */
    isAboveGround() {
        return this.y < 335;
    }

    /**
     * Randomly alters the movement speed of the object within a specific range.
     * Does nothing if the object is dead. There is a 2% chance per frame
     * to recalculate the speed between 4 and 12.
     */
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
            this.y = 400;
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
     * Updates the movement direction of the object based on world boundaries and a random factor.
     * Forces the object to turn around at the left boundary (x <= 30) and right boundary (x >= 3600).
     * Inside the boundaries, there is a 0.5% chance per frame to randomly change direction.
     */
    changeDirection = () => {
        if (!this.isDead()) {
            if (this.x <= 30) {
                this.otherDirection = true;
            } else if (this.x >= 3600) {
                this.otherDirection = false;
            } else {
                if (Math.random() < 0.005) {
                    this.otherDirection = !this.otherDirection;
                }
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
