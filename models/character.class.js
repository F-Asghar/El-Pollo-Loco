import { MovableObjekt } from "./movable-object.class.js";
import { level1 } from "../levels/level1.js";
import { ImageHub } from "./imageHub.class.js";
import { IntervalHub } from "./intervalHub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { Level } from "./level.class.js";
import { SoundHub } from "./soundHub.class.js";

export class Character extends MovableObjekt {
    x = 50;
    y = 160;
    width = 120;
    height = 280;
    speed = 10;
    world;
    lastHit;
    energy = 100;
    approach = false;
    currentImage = 0;
    static otherDirection = false;
    static alive = true;
    static isNearBy = false;
    static lastKeypressed = 0;
    static walking_sound_running = false;
    soundPlayed = false;
    hurtSound = false;
    deadSound = false;
    currentImageOnce = 0;

    offset = {
        top: 120,
        right: 20,
        left: 10,
        bottom: 30,
    };
    rX;
    rY;
    rW;
    rH;

    constructor() {
        super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
        this.loadImages(ImageHub.pepe.walk);
        this.loadImages(ImageHub.pepe.jump);
        this.loadImages(ImageHub.pepe.dead);
        this.loadImages(ImageHub.pepe.hurt);
        this.loadImages(ImageHub.pepe.idle);
        this.loadImages(ImageHub.pepe.long);
        this.applyGravity();
        this.getRealFrame();
        this.long();
        IntervalHub.startInterval(this.pepeWalkSound, 1000 / 60);
        IntervalHub.startInterval(this.setSoundSlow, 1000 / 4);
        IntervalHub.startInterval(this.fightEndboss, 1000 / 25);
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.startMovement, 1000 / 60);
        IntervalHub.startInterval(this.startAnimation, 100);
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);

        IntervalHub.startInterval(this.jumpAnimationCheck, 1000 / 40);
    }

    /**
     * Triggers the endboss battle sequences when the character passes a specific
     * X-coordinate threshold for the first time, playing the boss theme music
     * and updating proximity states.
     * * @global
     * @requires SoundHub
     * @requires Character
     */
    fightEndboss = () => {
        if (this.x > 3050 && !this.approach) {
            SoundHub.playOne(SoundHub.endBoss);
            Character.isNearBy = true;
            this.approach = true;
        }
    };

    /**
     * Handles the character's movement and jumping based on keyboard input,
     * and updates the camera position.
     */
    startMovement = () => {
        if (
            Keyboard.RIGHT &&
            this.x < this.world.level.level_end_x &&
            Character.alive
        ) {
            this.handleMoveRight();
        }
        if (Keyboard.LEFT && this.x > 0 && Character.alive) {
            this.handleMoveLeft();
        }
        if (Keyboard.UP && !this.isAboveGround() && Character.alive) {
            this.handleJump();
        }
        this.world.camera_x = -this.x + 100;
    };

    /**
     * Executes the rightward movement and resets the direction flags.
     */
    handleMoveRight() {
        this.moveRight();
        this.otherDirection = false;
        Character.botleDirection = false;
        this.soundPlayed = false;
    }

    /**
     * Executes the leftward movement and sets the direction flags.
     */
    handleMoveLeft() {
        this.moveLeft();
        this.otherDirection = true;
        Character.botleDirection = true;
    }

    /**
     * Makes the character jump and resets the jump sound flag.
     */
    handleJump() {
        this.jump();
        this.soundPlayed = false;
    }

    /**
     * Controls the character's animation state machine based on game events
     * (death, jumping, getting hurt, moving, or idling).
     */
    startAnimation = () => {
        if (this.isDead()) {
            this.handleDeathAnimation();
        } else if (
            this.isAboveGround() ||
            this.isHurt() ||
            Keyboard.RIGHT ||
            Keyboard.LEFT
        ) { this.handleActiveAnimations();
        } else if (this.isWaitingLong()) {
            this.playAnimation(ImageHub.pepe.long);
        } else {
            this.playAnimation(ImageHub.pepe.idle);
        }
    };

    /**
     * Handles the death sequence by pausing movement sounds, playing the dead animation,
     * setting the character status, and triggering a delayed game loop shutdown.
     * * @requires SoundHub
     * * @requires IntervalHub
     * * @requires Character
     */
    handleDeathAnimation() {
        SoundHub.pepeWalk.pause();
        this.playAnimation(ImageHub.pepe.dead);
        if (Character.alive) {
            Character.alive = false;
            SoundHub.playOne(SoundHub.pepeDead);
        }
        setTimeout(() => {
            IntervalHub.stopAllIntervals();
        }, 600);
    }

    /**
     * Handles active movement and reaction animations (jumping, getting hurt, or walking)
     * and resets the idle/long-waiting timer.
     */
    handleActiveAnimations() {
        if (this.isAboveGround()) {
            this.playAnimationOnce(ImageHub.pepe.jump);
        } else if (this.isHurt()) {
            this.playAnimation(ImageHub.pepe.hurt);
        } else if (Keyboard.RIGHT || Keyboard.LEFT) {
            this.playAnimation(ImageHub.pepe.walk);
        }
        this.long();
    }

    jumpAnimationCheck = () => {
        if (!this.isAboveGround()) {
            this.currentImageOnce = 0;
        }
    }

    /**
     * Updates the timestamp of the last registered player input to the current time.
     * This resets the idle timer for the character.
     * * @global
     * @requires Character
     */
    long() {
        Character.lastKeypressed = new Date().getTime();
    }

    /**
     * Calculates the time passed since the last player input and checks if
     * the character has been idling for longer than 5 seconds.
     * * @returns {boolean} True if the character has been waiting for more than 5 seconds, otherwise false.
     * @global
     * @requires Character
     */
    isWaitingLong() {
        let timePassed = new Date().getTime() - Character.lastKeypressed;
        timePassed = timePassed / 1000;
        return timePassed > 5;
    }

    /**
     * Makes the character jump by applying upward vertical velocity,
     * plays the jumping sound effect, and stops the sleeping sound effect.
     * * @global
     * @requires SoundHub
     */
    jump() {
        this.speedY = 30;
        SoundHub.playOne(SoundHub.pepeJump);
        SoundHub.stopOne(SoundHub.pepeSleep);
    }

    /**
     * Manages the character's situational sound effects (hurt, sleeping, and death)
     * based on the character's state, preventing sounds from overlapping using custom timeouts.
     */
    setSoundSlow = () => {
        if (this.isHurt() && !this.hurtSound) {
            this.handleHurtSound();
        } else if (this.isWaitingLong() && !this.soundPlayed) {
            this.handleSleepSound();
        } else if (!this.deadSound && !Character.alive) {
            this.handleDeathSound();
        }
    };

    /**
     * Plays the character's hurt sound effect, silences the sleep sound,
     * and sets a 2-second cooldown before it can play again.
     * * @requires SoundHub
     */
    handleHurtSound() {
        SoundHub.playOne(SoundHub.pepeHurt);
        SoundHub.stopOne(SoundHub.pepeSleep);
        this.hurtSound = true;
        setTimeout(() => {
            this.hurtSound = false;
        }, 2000);
    }

    /**
     * Plays the character's sleeping sound effect when idling long
     * and sets a 5-second cooldown before it can trigger again.
     * * @requires SoundHub
     */
    handleSleepSound() {
        SoundHub.playOne(SoundHub.pepeSleep);
        this.soundPlayed = true;
        setTimeout(() => {
            this.soundPlayed = false;
        }, 5000);
    }

    /**
     * Clears all active game sounds, plays the character's death sound effect,
     * and sets a 2.5-second cooldown.
     * * @global
     * @requires SoundHub
     * @requires Character
     */
    handleDeathSound() {
        SoundHub.allSounds = [];
        SoundHub.playOne(SoundHub.pepeDead);
        this.deadSound = true;
        setTimeout(() => {
            this.deadSound = false;
        }, 2500);
    }

    /**
     * Controls the character's walking sound effect. Plays the sound if the character
     * is moving on the ground, and pauses it immediately when movement stops.
     * * @global
     * @requires Keyboard
     * @requires SoundHub
     * @requires Character
     */
    pepeWalkSound = () => {
        const isMoving =
            (Keyboard.LEFT || Keyboard.RIGHT) && !this.isAboveGround();
        if (
            isMoving &&
            SoundHub.pepeWalk.paused &&
            Character.alive &&
            localStorage.getItem("isMuted") !== "true"
        ) {
            SoundHub.pepeWalk.play();
            SoundHub.stopOne(SoundHub.pepeSleep);
        } else if (!isMoving) {
            SoundHub.pepeWalk.pause();
        }
    };
}
