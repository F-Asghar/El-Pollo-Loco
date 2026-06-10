import { ImageHub } from "./imageHub.class.js";
import { StatusBar } from "./status-bar.class.js";

export class CoinsBar extends StatusBar {
    y = 50;
    height = 60;
    width = 200;
    static pice = 0;

    constructor() {
        super().loadImage(
            "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        );
        this.loadImages(ImageHub.statusBar.coins);
        this.setPice(0);
    }

    /**
     * Updates the current amount of collected coins, resolves the corresponding
     * status bar image index, and updates the active image from the cache.
     * * @param {number} piece - The new amount/count of coins to be set.
     * @global
     * @requires CoinsBar
     * @requires ImageHub
     */
    setPice(piece) {
        CoinsBar.piece = piece;
        let path = ImageHub.statusBar.coins[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves and returns the correct image array index (0 to 5) for the
     * coin status bar based on the current number of collected coins.
     * * @returns {number} The index of the image corresponding to the coin count.
     * @global
     * @requires CoinsBar
     */
    resolveImageIndex() {
        if (CoinsBar.piece >= 20) {
            return 5;
        } else if (CoinsBar.piece >= 16) {
            return 4;
        } else if (CoinsBar.piece >= 12) {
            return 3;
        } else if (CoinsBar.piece >= 8) {
            return 2;
        } else if (CoinsBar.piece >= 4) {
            return 1;
        } else {
            return 0;
        }
    }
}
