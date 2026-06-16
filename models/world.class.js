import { level1 } from "../levels/level1.js";
import { BackgroundObject } from "./background-object.class.js";
import { BotleBar } from "./bottle-bar.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { CoinsBar } from "./coins-bar.class.js";
import { CollectableBotle } from "./collectable-botle.class.js";
import { CollectableCoins } from "./collectable-coins.class.js";
import { CollectableObjekts } from "./collectable-objects.class.js";
import { EndbossBar } from "./enboss-status-bar.class.js";
import { Endboss } from "./endboss.class.js";
import { ImageHub } from "./imageHub.class.js";
import { IntervalHub } from "./intervalHub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { Level } from "./level.class.js";
import { SoundHub } from "./soundHub.class.js";
import { StatusBar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

export class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    imgLost;
    imgWin;
    camera_x = 0;
    coins = new CollectableCoins();
    botle = new CollectableBotle();
    botleBar = new BotleBar();
    coinsBar = new CoinsBar();
    statusBar = new StatusBar();
    endbossBar = new EndbossBar();
    throwableObjects = [];
    isThrowing = false;
    finished = false;
    end = false;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.level = level1;
        this.setWorld();
        this.draw();
        this.imgLost = this.loadImage(ImageHub.loose.lost[0]);
        this.imgWin = this.loadImage(ImageHub.win.won[0]);
        IntervalHub.startInterval(this.run, 1000 / 60);
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
            }
        });
    }

    /**
     * Passes a reference of the current world instance to the main character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Triggers the global or external end-of-game process.
     */
    gameFinished() {
        finished();
    }

    /**
     * Creates a new HTMLImageElement, starts loading a texture path, and returns the object.
     * @param {string} path - The file path string of the image.
     * @returns {HTMLImageElement} The created image object instance.
     */
    loadImage(path) {
        const img = new Image();
        img.src = path;
        return img;
    }

    /**
     * Renders the game-over screen overlay if the character dies, and resets
     * the end flag after a 2-second timeout delay.
     */
    youLost() {
        if (this.character.isDead() && !this.end) {
            this.ctx.drawImage(
                this.imgLost,
                0,
                0,
                this.canvas.width,
                this.canvas.height,
            );
            setTimeout(() => {
                this.end = false;
            }, 2000);
        }
    }

    /**
     * Renders the victory screen overlay if the endboss is defeated, and resets
     * the end flag after a 2-second timeout delay.
     */
    youWon() {
        if (!Endboss.alive && !this.end) {
            this.ctx.drawImage(
                this.imgWin,
                0,
                0,
                this.canvas.width,
                this.canvas.height,
            );
            setTimeout(() => {
                this.end = false;
            }, 2000);
        }
    }

    /**
     * The primary game physics and state processing loop. Coordinates collision checks,
     * input detection, and end-game state evaluations.
     */
    run = () => {
        this.checkCollisionsFromTop();
        this.checkCollisions();
        this.checkCollisionsCoins();
        this.checkCollisionsBotle();
        this.checkCollisionsThrowBotel();
        this.checkThrowObjects();
        this.youLost();
        this.youWon();
        this.gameFinished();
    };

    /**
     * Checks if the player spawns a throwable bottle based on inputs and ammo,
     * and resets the throw state when the key is released.
     */
    checkThrowObjects = () => {
        if (
            Keyboard.D &&
            BotleBar.pice > 0 &&
            !this.isThrowing &&
            Character.alive
        ) {
            this.createNewBottle();
            this.botleBar.setPice(BotleBar.pice);
            this.isThrowing = true;
        }
        if (!Keyboard.D) {
            this.isThrowing = false;
        }
    };

    /**
     * Instantiates a new ThrowableObject at the correct X/Y coordinates
     * based on the character's facing direction and adds it to the tracking array.
     */
    createNewBottle() {
        let bottle;
        if (Character.botleDirection) {
            bottle = new ThrowableObject(
                this.character.x - 10,
                this.character.y + 100,
            );
        } else {
            bottle = new ThrowableObject(
                this.character.x + 70,
                this.character.y + 100,
            );
        }
        this.throwableObjects.push(bottle);
    }

    /**
     * Loops through all level enemies to check for standard horizontal collisions
     * where the character takes damage.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (
                this.character.isColliding(enemy) &&
                !enemy.jumpedOn &&
                !enemy.isDead() &&
                (!this.character.isAboveGround() || enemy instanceof Endboss)
            ) {
                this.character.hit(enemy);
                this.statusBar.setPercentage(this.character.energy);
                enemy.hitted = true;
            }
        });
    }

    /**
     * Loops through all level enemies to check if the character successfully
     * jumps on top of them to defeat them.
     */
    checkCollisionsFromTop() {
        this.level.enemies.forEach((enemy) => {
            if (
                enemy.isCollidingFromTop(this.character) &&
                !(enemy instanceof Endboss) &&
                !enemy.isHit
            ) {
                enemy.enemyHit();
                enemy.isHit = true;
                if (enemy.jumpedOn == false && !enemy.hasJumpedOn) {
                    this.character.jump();
                    enemy.jumpedOn = true;
                }
            }
        });
    }

    /**
     * Loops through all enemies and active throwable bottles to check for impacts.
     */
    checkCollisionsThrowBotel() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((botle) => {
                if (
                    botle.isColliding(enemy) &&
                    !botle.bottleCollided &&
                    !enemy.isDead()
                ) {
                    this.handleBottleImpact(botle, enemy);
                }
            });
        });
    }

    /**
     * Processes the impact of a bottle hitting an enemy by triggering damage,
     * playing sound effects, and updating the UI if the endboss was struck.
     * @param {Object} botle - The bottle object that hit the enemy.
     * @param {Object} enemy - The enemy object that was hit.
     */
    handleBottleImpact(botle, enemy) {
        botle.bottleCollided = true;
        enemy.enemyHit();
        SoundHub.playOne(SoundHub.bottleBreak);
        this.removeBottle(botle);
        if (enemy instanceof Endboss) {
            this.endbossBar.setPercentage(enemy.energy);
        }
    }

    /**
     * Removes the collided bottle from the tracking array after a short delay
     * to allow the splash animation to finish playing.
     * @param {Object} botle - The bottle object to remove.
     */
    removeBottle(botle) {
        setTimeout(() => {
            let i = this.throwableObjects.indexOf(botle);
            if (i > -1) {
                this.throwableObjects.splice(i, 1);
            }
        }, 250);
    }

    /**
     * Loops through all coins in the level to check for collisions with the character,
     * increments the coin counter, updates the UI, plays sound, and removes the collected coin.
     */
    checkCollisionsCoins() {
        this.level.coins.forEach((coins, index) => {
            if (this.character.isColliding(coins)) {
                CoinsBar.pice++;
                this.coinsBar.setPice(CoinsBar.pice);
                SoundHub.playOne(SoundHub.collectCoins);
                this.level.coins.splice(index, 1);
            }
        });
    }

    /**
     * Loops through all bottles in the level to check for collisions with the character,
     * increments the bottle counter, updates the UI, plays sound, and removes the collected bottle.
     */
    checkCollisionsBotle() {
        this.level.botle.forEach((botle, index) => {
            if (this.character.isColliding(botle) && BotleBar.pice < 5) {
                BotleBar.pice++;
                this.botleBar.setPice(BotleBar.pice);
                SoundHub.playOne(SoundHub.collectBottle);
                this.level.botle.splice(index, 1);
            }
        });
    }

    /**
     * Clears the canvas and handles the entire rendering loop, including camera translation,
     * drawing game objects, UI elements, game-over/victory screens, and schedules the next frame.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.botle);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.botle);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.coinsBar);
        this.addToMap(this.statusBar);
        this.addToMap(this.botleBar);
        this.addToMap(this.endbossBar);
        this.youLost();
        this.youWon();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Iterates over a collection of game objects and draws each one onto the map.
     * @param {Object[]} objects - An array of game objects to be drawn.
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a single game object onto the canvas context, handling image flipping
     * if the object is facing the opposite direction.
     * @param {Object} mo - The movable or standard object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Saves the canvas state, translates and scales the context to horizontally
     * mirror the image, and inverts the object's X coordinate.
     * @param {Object} mo - The object whose image needs to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the object's original X coordinate and reverts the canvas context
     * back to its last saved state.
     * @param {Object} mo - The object whose image was flipped.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
