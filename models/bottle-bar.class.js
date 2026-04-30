import { ImageHub } from "./imageHub.class.js";
import { StatusBar } from "./status-bar.class.js";


export class BotleBar extends StatusBar{

        y = 100;
        height = 60;
        width = 200;
        static pice = 2;
        
        constructor(){
            super().loadImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png");
            this.loadImages(ImageHub.statusBar.botle);
            this.setPice(2);
        }
    
        setPice(pice){
            BotleBar.pice = pice;
            let path = ImageHub.statusBar.botle[this.resolveImageIndex()];
            this.img = this.imageCache[path];
        }
        
        resolveImageIndex(){
            if(BotleBar.pice >= 10){
                return 5;
            } else if(BotleBar.pice >= 8){
                return 4;
            }else if(BotleBar.pice >= 6){
                return 3;
            }else if(BotleBar.pice >= 4){
                return 2;
            }else if(BotleBar.pice >= 1){
                return 1;
            }else {                
                return 0;
            }
        }


}