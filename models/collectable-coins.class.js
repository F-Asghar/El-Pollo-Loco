import { CollectableObjekts } from "./collectable-objects.class.js";
import { ImageHub } from "./imageHub.class.js";
import { IntervalHub } from "./intervalHub.class.js";

export class CollectableCoins extends CollectableObjekts {
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
        bottom: 10,
    };
    rX;
    rY;
    rW;
    rH;

    constructor() {
        super();
        this.loadImage("img/8_coin/coin_1.png");
        this.loadImages(ImageHub.coin.coinPuls);
        this.animate(ImageHub.coin.coinPuls);
        this.getRealFrame();
        this.playAnimation(ImageHub.coin.coinPuls);
        IntervalHub.startInterval(this.puls, 500);
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
    }

    /**
     * Starts the continuous animation loops for the coin object by calling
     * the pulsing visual routine.
     */
    animate = () => {
        this.puls();
    };

    /**
     * Loops through the pulsing/spinning texture frames of the coin
     * to create a dynamic visual effect.
     * * @requires ImageHub
     */
    puls = () => {
        this.playAnimation(ImageHub.coin.coinPuls);
    };
}
