import { ImageHub } from "./imageHub.class.js";
import { StatusBar } from "./status-bar.class.js";

export class BotleBar extends StatusBar {
    y = 100;
    height = 60;
    width = 200;
    static pice = 2;

    constructor() {
        super().loadImage(
            "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
        );
        this.loadImages(ImageHub.statusBar.botle);
        this.setPice(2);
    }

    /**
     * Updates the current amount of collected bottles, resolves the corresponding
     * status bar image index, and updates the active image from the cache.
     * * @param {number} pice - The new amount/count of bottles to be set.
     * @global
     * @requires BotleBar
     * @requires ImageHub
     */
    setPice(pice) {
        BotleBar.pice = pice;
        let path = ImageHub.statusBar.botle[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves and returns the correct image array index (0 to 5) for the
     * bottle status bar based on the current number of collected bottles.
     * * @returns {number} The index of the image corresponding to the bottle count.
     * @global
     * @requires BotleBar
     */
    resolveImageIndex() {
        if (BotleBar.pice >= 5) {
            return 5;
        } else if (BotleBar.pice >= 4) {
            return 4;
        } else if (BotleBar.pice >= 3) {
            return 3;
        } else if (BotleBar.pice >= 2) {
            return 2;
        } else if (BotleBar.pice >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
}
