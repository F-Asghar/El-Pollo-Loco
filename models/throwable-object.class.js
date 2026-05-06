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

    isAboveGround() {
        return true;
    }

    checkDirektion() {
        this.direktionLeft = Character.otherDirection;
    }

    throw() {
        Character.lastKeypressed = new Date().getTime();
        this.speedY = 30;
        this.applyGravity();
        this.startXMovement();
        this.startRotation();
        BotleBar.pice--;
    }

    startXMovement = () => {
        if (this.direktionLeft) {
            this.x -= this.speedX;
        } else {
            this.x += this.speedX;
        }
    };

    startRotation = () => {
        this.playAnimation(ImageHub.botle.botleRotation);
    };

    splash = () => {
    if (this.bottleCollided && !this.alreadySplashed) {
        this.speedX = 0;
        this.speedY = 0;
        this.alreadySplashed = true;
        if (this.alreadySplashed){ 
            this.playAnimation(ImageHub.botle.botleSplash);
        }
    }
};




// splash = () => {
//     if (this.bottleCollided) {
//         // Diese 3 Zeilen verhindern das "Fliegen" oder "Hüpfen"
//         this.speedX = 0;       // Kein Vorwärtsflug mehr
//         this.speedY = 0;       // Kein Aufwärts-/Abwärtsflug mehr
//         this.acceleration = 0; // Schwerkraft komplett ausschalten

//         if (!this.alreadySplashed) {
//             clearInterval(this.rotationInterval);
//             this.alreadySplashed = true;
//         }

//         this.playAnimationOnce(ImageHub.botle.botleSplash);
//     }
// };



















}
