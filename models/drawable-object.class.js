export class DrawableObject {
    x;
    y;
    height;
    width;
    img;
    currentImage = 0;
    imageCache = {};

    /**
     * Creates a new HTMLImageElement and sets its source path to load a single texture.
     * * @param {string} path - The file path string of the image to be loaded.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Renders the object's active image onto the game canvas using its
     * current X/Y coordinates and width/height dimensions.
     * * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Preloads an array of image paths and stores the loaded HTMLImageElements
     * inside the centralized image cache object.
     * * @param {string[]} arr - An array containing the file path strings of the images to preload.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}
