import { IntervalHub } from "./intervalHub.class.js";
import { MovableObjekt } from "./movable-object.class.js";


export class Cloud extends MovableObjekt{

    x = 0 + Math.random() * 700;
    y = 10 + Math.random() * 50;
    width = 500;
    height = 250;
    speed = 0.15;

    constructor(){
        super().loadImage("img/5_background/layers/4_clouds/1.png");
        IntervalHub.startInterval(() => this.moveLeft(), 1000 / 60);
    }

}