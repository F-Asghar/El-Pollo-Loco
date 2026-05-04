import { CollectableObjekts } from "./collectable-objects.class.js";
import { ImageHub } from "./imageHub.class.js";
import { IntervalHub } from "./intervalHub.class.js";



export class CollectableCoins extends CollectableObjekts{
    // + Math.random() * 500;
    x = 100 + Math.random() * 2150;
    y = 100 + Math.random() * 200;
    height = 100;
    width = 100;
    currentImage = 0;
    imageCache = {};
    offset = {
        top: 10,
        right: 10,
        left: 10,
        bottom: 10
    }
    rX;
    rY;
    rW;
    rH;

    constructor(){
        super();
        this.loadImage("img/8_coin/coin_1.png");
        this.loadImages(ImageHub.coin.coinPuls);
        this.animate(ImageHub.coin.coinPuls);
        this.getRealFrame();
        this.playAnimation(ImageHub.coin.coinPuls);
        IntervalHub.startInterval(this.puls, 500);
        IntervalHub.startInterval(this.getRealFrame, 1000/60);
    }

    animate = () => {
        this.puls();   
    }
    
    puls= () => {
        this.playAnimation(ImageHub.coin.coinPuls);
    }


}   