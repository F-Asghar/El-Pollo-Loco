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

    constructor(canvas) {
        // Mit ctx.getContext("2d") lässt uns Methoden aufrufen für unser Canvas
        // (stell es dir vor wie async und await bei Funktionen). Wichtig! >> ctx als Variable immer so nehmen!
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.level = level1;
        this.setWorld();
        this.draw();
        this.imgLost = this.loadImage(ImageHub.loose.lost[0]);
        this.imgWin = this.loadImage(ImageHub.win.won[0]);
        IntervalHub.startInterval(this.run, 1000 / 60);
    }

    setWorld() {
        // this ist die Instanz selbst! (Hier wird die gesammte instanzierung der Klasse World übergeben)
        this.character.world = this;
    }

    gameFinished() {
        finished();
    }

    loadImage(path) {
        const img = new Image();
        img.src = path;
        return img;
    }

    youLost() {
        if (this.character.isDead()) {
            this.ctx.drawImage(
                this.imgLost,
                0,
                0,
                this.canvas.width,
                this.canvas.height,
            );
        }
    }

    youWon() {
        if (!Endboss.alive) {
            this.ctx.drawImage(
                this.imgWin,
                0,
                0,
                this.canvas.width,
                this.canvas.height,
            );
        }
    }

    run = () => {
        // hier starten wir unsere Intervalle
        // this.checkCollisionsFromTop();
        this.checkCollisions();
        this.checkCollisionsCoins();
        this.checkCollisionsBotle();
        this.checkCollisionsThrowBotel();
        this.checkThrowObjects();
        this.youLost();
        this.youWon();
        this.gameFinished();
    };

    checkThrowObjects = () => {
        if (
            Keyboard.D &&
            BotleBar.pice > 0 &&
            !this.isThrowing &&
            Character.alive
        ) {
            // Flasche in die richtige Richtung werfen
            let bottle;
            if (Character.otherDirection) {
                bottle = new ThrowableObject(
                    this.character.x - 20,
                    this.character.y + 100,
                );
            } else {
                bottle = new ThrowableObject(
                    this.character.x + 70,
                    this.character.y + 100,
                );
            }
            this.throwableObjects.push(bottle);
            this.botleBar.setPice(BotleBar.pice);
            //damit nicht mehrfach geworfen wird
            this.isThrowing = true;
        }
        if (!Keyboard.D) {
            this.isThrowing = false;
        }
    };

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionsFromTop() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isCollidingFromTop(this.character)) {
                console.log(enemy.isCollidingFromTop(this.character));
                enemy.enemyHit();
            }
        });
    }




    

    // checkCollisionsThrowBotel() {
    //     this.level.enemies.forEach((enemy) => {
    //         this.throwableObjects.forEach((botle, index) => {
    //             if (
    //                 botle.isColliding(enemy) &&
    //                 !botle.bottleCollided &&
    //                 !enemy.isDead()
    //             ) {
    //                 enemy.enemyHit();
    //                 botle.bottleCollided = true;
    //                 SoundHub.playOne(SoundHub.bottleBreak);
    //                 setTimeout(() => {
    //                     let i = this.throwableObjects.indexOf(botle);
    //                     if (i > -1) {
    //                         this.throwableObjects.splice(i, 1);
    //                     }
    //                 }, 200);
    //                 if (enemy instanceof Endboss) {
    //                     this.endbossBar.setPercentage(enemy.energy);
    //                 }
    //             }
    //         });
    //     });
    // }

    checkCollisionsThrowBotel() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((botle) => {
                // Wenn Kollision UND Flasche noch aktiv ist UND Gegner lebt
                if (
                    botle.isColliding(enemy) &&
                    !botle.bottleCollided &&
                    !enemy.isDead()
                ) {
                    botle.bottleCollided = true; // Triggert die splash() Logik oben
                    enemy.enemyHit();
                    SoundHub.playOne(SoundHub.bottleBreak);

                    // Erst nach 500ms löschen, damit man den Splash sieht
                    setTimeout(() => {
                        let i = this.throwableObjects.indexOf(botle);
                        if (i > -1) {
                            this.throwableObjects.splice(i, 1);
                        }
                    }, 150);

                    if (enemy instanceof Endboss) {
                        this.endbossBar.setPercentage(enemy.energy);
                    }
                }
            });
        });
    }









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

    checkCollisionsBotle() {
        this.level.botle.forEach((botle, index) => {
            if (this.character.isColliding(botle)) {
                BotleBar.pice++;
                this.botleBar.setPice(BotleBar.pice);
                SoundHub.playOne(SoundHub.collectBottle);
                this.level.botle.splice(index, 1);
            }
        });
    }

    draw() {
        // mit dieser Methode (clearRect(unserem canvas wie unten)) clearen wir den Canvas und können,
        // wenn wir die Position von unseres movable-objekt verändern ohne das es sich doppelt.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Wir verschieben unsere camera nach rechts ,0 ist die Y-Achse,
        // die wir natürlich nicht verschieben wollen (muss aber angegeben werden!)
        this.ctx.translate(this.camera_x, 0);

        // mit addObjectstoMap lassen wir anderst als beim character (addToMap) eine forEach schleife drüber laufen
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.botle);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.botle);
        this.addToMap(this.character);

        // Hier verschieben wir unsere Camera wieder nach links ,0 ist die Y-Achse,
        // die wir natürlich nicht verschieben wollen (muss aber angegeben werden!)
        this.ctx.translate(-this.camera_x, 0);

        // --------- Space for fixed Objects --------
        this.addToMap(this.coinsBar);
        this.addToMap(this.statusBar);
        this.addToMap(this.botleBar);
        this.addToMap(this.endbossBar);

        this.youLost();
        this.youWon();

        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        // () => Arrow-Function bindet die draw-methode an die Instanz der World-Class)
        requestAnimationFrame(() => this.draw());
    }

    // damit lassen wir uns alle unsere Gegner / Hintergründe ect. anzeigen (wir rendern z.b. alle 3 chickens! / forEach)
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    // mo in dem Fall MovableObject
    // Diese funktion wird in addObjectsToMap ebenfalls aufgerufen
    addToMap(mo) {
        // Um Character zu spiegeln die Methoden sind von ctx vorgefertigt
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        // drawImage ist vorgefertigt von JS // hier fügen wir den character ein
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        // speichern der aktuellen Einstellungen von unserem Kontext (Bild)
        this.ctx.save();
        // einfügen des Bildes an der richtigen X-Achse Stelle
        this.ctx.translate(mo.width, 0);
        // spiegeln an der Achse
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        // Hier werden die Einstellungen für das spiegeln sofern wir sie verändert haben wieder rückgängig gemacht
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
