import { DrawableObject } from "./drawable-object.class.js";
import { IntervalHub } from "./intervalHub.class.js";

export class MovableObjekt extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5; // Fallgeschwindigkeit pro FPS
    energy;
    soundPlayed = false;
    hurtSound = false;
    lastHit = 0;

    constructor() {
        super();
    }

    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY; // Bewegung der Objekte auf der Y-Achse (Geschwindigkeit * acceleration)
            this.speedY -= this.acceleration; // Fallgeschwindigkeit pro FPS
        }
    };

    isAboveGround() {
        return this.y < 150;
    }

    getRealFrame = () => {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    };

    isColliding(mO) {
        // Es müssen 4 Bedingungen für eine Collission erfüllt sein
        return (
            this.rX + this.rW > mO.rX &&
            this.rY + this.rH > mO.rY &&
            this.rX < mO.rX + mO.rW &&
            this.rY < mO.rY + mO.rH
        );
    }


    // kollision von oben muss überarbeitet werden!!
    // isCollidingFromTop(mO) {
    //     return (
    //         // flag setzen noch!
    //         this.rX < mO.rX + mO.rW - 15 &&
    //         this.rY < mO.rY + mO.rH &&
    //         this.rX - 15 + this.rW > mO.rX
    //     );
    // }

    hit() {
        this.energy -= 1;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            // diese Funktion ist vorgefertigt, und ermöglicht es uns
            // den Zeitpunkt der Collision in dem Fall zu bestimmen (new Date().getTime()) --> Milisekunden ab dem 01.01.1970
            this.lastHit = new Date().getTime();
        }
    }

    enemyHit() {
        this.energy -= 100;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            // diese Funktion ist vorgefertigt, und ermöglicht es uns
            // den Zeitpunkt der Collision in dem Fall zu bestimmen (new Date().getTime()) --> Milisekunden ab dem 01.01.1970
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy <= 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timePassed = timePassed / 1000; // Differenz in Sekunden
        return timePassed < 2;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images) {
        if (this.currentImage < images.length) {
            const path = images[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }
}
