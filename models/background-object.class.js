import { MovableObjekt } from "./movable-object.class.js";

export class BackgroundObject extends MovableObjekt {
    x = 0;
    y = 0;
    height = 480;
    width = 720;

    constructor(imagePath, _x) {
        super().loadImage(imagePath);
        this.x = _x;
    }
}
