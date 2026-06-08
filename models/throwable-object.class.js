import { BotleBar } from "./bottle-bar.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { ImageHub } from "./imageHub.class.js";
import { IntervalHub } from "./intervalHub.class.js";
import { MovableObjekt } from "./movable-object.class.js";

export class ThrowableObject extends MovableObjekt {
    x;
    y;
    height = 70;
    width = 60;
    speedX = 10;
    direktionLeft = false;
    bottleCollided = false;
    alreadySplashed = false;
    offset = {
        top: 10,
        right: 10,
        left: 10,
        bottom: 10,
    };
    rX;
    rY;
    rW;
    rH;

    constructor(_x, _y) {
        super().loadImage("img/7_statusbars/3_icons/icon_salsa_bottle.png");
        this.loadImages(ImageHub.botle.botleRotation);
        this.loadImages(ImageHub.botle.botleSplash);
        this.x = _x;
        this.y = _y;
        this.checkDirektion();
        this.throw();
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
        IntervalHub.startInterval(this.checkDirektion, 1000 / 60);
        IntervalHub.startInterval(this.startXMovement, 50);
        IntervalHub.startInterval(this.startRotation, 200);
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.splash, 1000 / 60);
    }

    /**
     * Overrides the base ground check, as a thrown bottle is always considered in the air.
     * @returns {boolean} Always true.
     */
    isAboveGround() {
        return true;
    }

    /**
     * Synchronizes the bottle's flight direction with the character's current facing direction.
     */
    checkDirektion() {
        this.direktionLeft = Character.botleDirection;
    }

    /**
     * Initializes the bottle throw mechanics by resetting the cooldown timer,
     * setting initial speeds, starting physics loops, and decrementing the ammo counter.
     */
    throw() {
        Character.lastKeypressed = new Date().getTime();
        this.speedY = 30;
        this.applyGravity();
        this.startXMovement();
        this.startRotation();
        BotleBar.pice--;
    }

    /**
     * Handles the horizontal flight movement of the bottle based on its resolved direction.
     */
    startXMovement = () => {
        if (this.direktionLeft) {
            this.x -= this.speedX;
        } else {
            this.x += this.speedX;
        }
    };

    /**
     * Plays the continuous spinning animation frames of the bottle while it is mid-air.
     */
    startRotation = () => {
        if (!this.alreadySplashed) {
            this.playAnimation(ImageHub.botle.botleRotation);
        }
    };

    /**
     * Triggers the shattering sequence on impact, stopping all physics movement
     * and playing the splash animation once.
     */
    splash = () => {
        if (this.bottleCollided && !this.alreadySplashed) {
            this.speedX = 0;
            this.speedY = 0;
            this.acceleration = 0;
            this.alreadySplashed = true;
            this.playAnimation(ImageHub.botle.botleSplash);
        }
    };
}
