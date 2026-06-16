import { DrawableObject } from "./drawable-object.class.js";
import { IntervalHub } from "./intervalHub.class.js";

export class MovableObjekt extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy;
    soundPlayed = false;
    hurtSound = false;
    lastHit = 0;
    currentImageOnce = 0;

    constructor() {
        super();
    }

    /**
     * Applies gravity to the object, moving it downwards and adjusting vertical speed.
     */
    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    };

    /**
     * Checks if the object is currently in the air.
     * @returns {boolean} True if the Y coordinate is above the ground threshold.
     */
    isAboveGround() {
        return this.y < 150;
    }

    /**
     * Calculates the exact hitbox boundaries (real frame) applying custom offsets.
     */
    getRealFrame = () => {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    };

    /**
     * Checks for a standard bounding box collision with another object.
     * @param {Object} mO - The other movable object to check collision against.
     * @returns {boolean} True if the hitboxes overlap.
     */
    isColliding(mO) {
        return (
            this.rX + this.rW > mO.rX &&
            this.rY + this.rH > mO.rY &&
            this.rX < mO.rX + mO.rW &&
            this.rY < mO.rY + mO.rH
        );
    }

    /**
     * Checks if another object is colliding with this object from above (e.g. jumping on top).
     * @param {Object} mO - The other movable object.
     * @returns {boolean} True if a collision from above occurs.
     */
    isCollidingFromTop(mO) {
        if (mO.isAboveGround() && mO.speedY <= 0) {
            return (
                this.rX < mO.rX + mO.rW - 15 &&
                this.rY < mO.rY + mO.rH &&
                this.rX - 15 + this.rW > mO.rX
            );
        }
        return false;
    }

    /**
     * Reduces energy by a minor amount when taking standard damage.
     */
    hit(enemy) {
        if (enemy && enemy.constructor.name === "Endboss") {
            this.energy -= 1;
        } else {
            this.energy -= 1;
        }
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Reduces energy completely or heavily when hit by an enemy.
     */
    enemyHit() {
        this.energy -= 100;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object has zero or less energy remaining.
     * @returns {boolean} True if dead.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Checks if the object was recently hit (within the last 2 seconds).
     * @returns {boolean} True if still in the hurt state.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 2;
    }

    /**
     * Moves the object to the right based on its current speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left based on its current speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Triggers a vertical jump by setting the vertical upward speed.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Loops an array of images continuously for repeating animations.
     * @param {string[]} images - Array of image file paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays an array of images exactly once without looping.
     * @param {string[]} images - Array of image file paths.
     */
    playAnimationOnce(images) {
        if (this.currentImageOnce < images.length) {
            const path = images[this.currentImageOnce];
            this.img = this.imageCache[path];
            this.currentImageOnce++;
        }
    }
}
