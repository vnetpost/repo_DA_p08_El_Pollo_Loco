
/**
 * @class Base drawable that handles loading images, animations and drawing to canvas.
 */
export class DrawableObject {
    // #region Attributes
    x;
    y;
    width;
    height;

    currentImage;
    currentImageIndex = 0;
    currentAnimation = [];
    imageCache = {};                       // Object            // {"./img1.png": HTMLImageElement, ....}
    // #endregion Attributes

    // #region Instance Methods

    /**
     * Load a single image and set as current.
     * @param {string} path
     */
    loadImage(path) {
        this.currentImage = new Image();
        this.currentImage.src = path;
    }

    /**
     * Preload an array of images into the cache.
     * @param {string[]} images
     */
    loadImages(images) {
        images.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Set the current animation sequenz.
     * @param {string[]} images
     */
    setAnimation = (images) => {
        if (this.currentAnimation !== images) { // I use currentAnimation just to check
            this.currentAnimation = images;
            this.currentImageIndex = 0; // restart animation when state change
        }
        // this.playAnimation(currentAnimation); // At the beginning problematisch
        this.playAnimation(images);
    }

    /**
     * Animating.
     * @param {string[]} images
     */
    playAnimation(images) {
        let path = images[this.currentImageIndex];
        this.currentImage = this.imageCache[path]; // continous chache -> animating
        this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
    }

    /**
     * Draw the current image to the canvas.
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        if (this.currentImage instanceof Image)
            ctx.drawImage(this.currentImage, this.x, this.y, this.width, this.height);
    }

    /**
     * Calculate the real collision frame based on offsets.
     */
    getRealFrame = () => {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    // #endregion Instance Methods
}
