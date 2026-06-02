
import { DrawableObject } from "./drawable-object.class.js";
import { ImageHub } from "./imageHub.class.js";
import { IntervalHub } from "./intervalHub.class.js";


export class EndbossBar extends DrawableObject{
    
    x = 520;
    y = 10;
    height = 60;
    width = 200;
    lastHit;
    percentage;

    constructor(){
        super();
        this.loadImage(ImageHub.statusBar.statusEndboss[0]);
        this.loadImages(ImageHub.statusBar.statusEndboss);
        this.setPercentage(1000);
    }

    setPercentage(percentage){
        this.percentage = percentage;
        let path = ImageHub.statusBar.statusEndboss[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if(this.percentage == 1000){
            return 5;
        } else if(this.percentage >= 800){
            return 4;
        }else if(this.percentage >= 600){
            return 3;
        }else if(this.percentage >= 400){
            return 2;
        }else if(this.percentage >= 200){
            return 1;
        }else {
            return 0;
        }
    }
}