
export class DrawableObject {
    x;
    y;
    height;
    width;
    img;
    currentImage = 0;
    imageCache = {}

   
    loadImage(path){
        // this.img = document.getElementById ("image") <img id="image" src"""> / ist das selbe nur für JS
        this.img = new Image(); 
        this.img.src = path;
    }

    // Um uns unsere Bilder anzeigen zu lassen mit x und y Achse, Breite und Höhe
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            // this bezieht sich auf eine globale Variable in der Klasse (Attribut)! 
            // Alles was nur in der Funktion gültig ist wird ohne this geschrieben.
            this.imageCache[path] = img;
        });
    }


}