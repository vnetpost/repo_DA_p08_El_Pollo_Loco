

export class DrawableObject {
    x;
    y;
    width;
    height;

    currentImage;
    currentImageIndex = 0;                 // Index
    currentAnimation = [];
    imageCache = {};                       // Object            // {"./img1.png": HTMLImageElement, ....}


    loadImage(path) {
        this.currentImage = new Image();
        this.currentImage.src = path;
    }

    loadImages(images) {
        images.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    setAnimation = (images) => {
        if (this.currentAnimation !== images) { // I use currentAnimation just to check
            this.currentAnimation = images;
            this.currentImageIndex = 0; // restart animation when state change
        }
        // this.playAnimation(currentAnimation); // At the beginning problematisch
        this.playAnimation(images);
    }

    playAnimation(images) {
        let path = images[this.currentImageIndex];
        this.currentImage = this.imageCache[path]; // continous chache -> animating
        this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
    }

    draw(ctx) {
        if (this.currentImage instanceof Image)
            ctx.drawImage(this.currentImage, this.x, this.y, this.width, this.height);
    }

}
