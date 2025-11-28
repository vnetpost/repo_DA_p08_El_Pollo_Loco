

export class DrawableObject {
    x;
    y;
    width;
    height;

    img;
    imageCache = {};                       // Object            // {"./img1.png": HTMLImageElement, ....}
    currentImage = 0;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(images) {
        images.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    setAnimation = (images) => {
        if (this.currentAnimation !== images) {
            this.currentAnimation = images;
            this.currentImage = 0; // restart animation when state change
        }
        this.playAnimation(images);
    }

    playAnimation(images) {
        let path = images[this.currentImage];
        this.img = this.imageCache[path]; // continous chache -> animating
        this.currentImage = (this.currentImage + 1) % images.length;
    }

    draw(ctx) { if (this.img instanceof Image) ctx.drawImage(this.img, this.x, this.y, this.width, this.height); }

    
}
