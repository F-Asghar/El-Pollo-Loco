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

    startAnimation = () => {
        if (this.isDead()) {
            this.playAnimation(ImageHub.chickenNormal.dead);
            this.height = 50;
            this.y = 385;
        } else {
            this.playAnimation(ImageHub.chickenNormal.walk);
        }
    };

    startMovement = () => {
        if (!this.isDead() && !this.otherDirection) {
            this.moveLeft();
        } else if(!this.isDead() && this.otherDirection) {
            this.moveRight(); 
        }
    };

    changeDirection = () => {
        if (this.x <= 50) {
            this.otherDirection = true;
        }
        else if (this.x >= 2400) {
            this.otherDirection = false;
        }
    }

    setSound = () => {
        if (this.isDead() && !this.soundPlayed) {
            SoundHub.playOne(SoundHub.enemyDead);
            this.soundPlayed = true;
        }
    };
}
