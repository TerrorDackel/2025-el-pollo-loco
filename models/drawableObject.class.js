/**
 * Represents any drawable object in the game.
 * Provides basic image loading, drawing and debugging utilities.
 */
class DrawableObject {
    /** @type {number} X-coordinate of the object on the canvas. */
    x = 120;

    /** @type {number} Y-coordinate of the object on the canvas. */
    y = 280;

    /** @type {number} Height of the object. */
    height = 200;

    /** @type {number} Width of the object. */
    width = 100;

    /** @type {HTMLImageElement | undefined} The current image of the object. */
    img;

    /** @type {number} Top offset for collision box. */
    offsetTop = 40;

    /** @type {number} Bottom offset for collision box. */
    offsetBottom = -20;

    /** @type {number} Right offset for collision box. */
    offsetRight = 40;

    /** @type {number} Left offset for collision box. */
    offsetLeft = 15;

    /** @type {Object.<string, HTMLImageElement>} Cache for health bar images. */
    imageCacheHealth = {};

    /** @type {Object.<string, HTMLImageElement>} Cache for coin images. */
    imageCacheCoins = {};

    /** @type {Object.<string, HTMLImageElement>} Cache for bottle images. */
    imageCacheBottles = {};

    /** @type {Object.<string, HTMLImageElement>} General image cache for animations. */
    imageCache = {};

    /** @type {number} Index of the current animation frame. */
    currentImage = 0;

    /**
     * Loads a single image for the object.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images for animations and stores them in cache.
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws a red rectangle around throwable objects for debugging.
     * @param {CanvasRenderingContext2D} ctx - The drawing context.
     */
    rectangleThrowableObject(ctx) {
        ctx.save();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
        ctx.restore();
    }

    /**
     * Draws a green frame for coins and bottles.
     * @param {CanvasRenderingContext2D} ctx - The drawing context.
     */
    drawGreenFrame(ctx) {
        ctx.save();
        ctx.strokeStyle = "green";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
        ctx.restore();
    }

    /**
     * Draws the object and optional debug frames.
     * Automatically adds debug outlines for certain object types.
     * @param {CanvasRenderingContext2D} ctx - The drawing context.
     */
    draw(ctx) {
        if (!this.img) return;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        if (this.debugMode) this.rectangleThrowableObject(ctx);
        if (this instanceof Coins || this instanceof Bottle) this.drawGreenFrame(ctx);
    }

    /**
     * Draws a blue frame for characters and chickens.
     * @param {CanvasRenderingContext2D} ctx - The drawing context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(
                this.x + this.offsetLeft,
                this.y + this.offsetTop,
                this.width - this.offsetRight - this.offsetLeft,
                this.height - this.offsetBottom - this.offsetTop
            );
            ctx.stroke();
        }
    }

    /**
     * Loads images into the health cache.
     * @param {string[]} arr - Array of image paths.
     */
    loadImagesHealth(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCacheHealth[path] = img;
        });
    }

    /**
     * Loads images into the coins cache.
     * @param {string[]} arr - Array of image paths.
     */
    loadImagesCoins(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCacheCoins[path] = img;
        });
    }

    /**
     * Loads images into the bottles cache.
     * @param {string[]} arr - Array of image paths.
     */
    loadImagesBottles(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCacheBottles[path] = img;
        });
    }
}
