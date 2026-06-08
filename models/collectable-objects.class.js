import { DrawableObject } from "./drawable-object.class.js";
import { ImageHub } from "./imageHub.class.js";
import { IntervalHub } from "./intervalHub.class.js";

export class CollectableObjekts extends DrawableObject {
    x;
    y;
    height;
    width;
    currentImage = 0;
    imageCache = {};

    constructor() {
        super();
    }

    /**
     * Calculates the exact hitbox boundaries (real frame) of the object by applying
     * the custom left, top, right, and bottom layout offsets to its current scale and coordinates.
     */
    getRealFrame = () => {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    };

    /**
     * Loops through a given array of texture paths to play a fluid animation,
     * resolving the image from the cache and incrementing the frame counter.
     * * @param {string[]} images - An array containing the file path strings of the animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
