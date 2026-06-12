
import { CollectableObjekts } from "./collectable-objects.class.js";
import { ImageHub } from "./imageHub.class.js";
import { IntervalHub } from "./intervalHub.class.js";



export class CollectableBotle extends CollectableObjekts{
    x = 100 + Math.random() * 3600;
    y = 340;
    height = 100;
    width = 100;
    offset = {
        top: 30,
        right: 60,
        left: 70,
        bottom: 10
    }
    rX;
    rY;
    rW;
    rH;

    constructor(){
        super();
        this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.loadImages(ImageHub.botle.botleGround);
        this.getRealFrame();
        IntervalHub.startInterval(this.getRealFrame, 1000/60);
    }

}