/**
 * Represents a collectible coin in the game world.
 * Extends DrawableObject to be drawn, animated and collected by the character.
 */
class Coins extends DrawableObject {
    /**
     * Paths to coin animation frames.
     * @type {string[]}
     */
    IMAGES_COINS = [
        "./imgs/8_coin/Gold_1.png",
        "./imgs/8_coin/Gold_2.png",
        "./imgs/8_coin/Gold_3.png",
        "./imgs/8_coin/Gold_4.png",
        "./imgs/8_coin/Gold_5.png",
        "./imgs/8_coin/Gold_6.png",
        "./imgs/8_coin/Gold_7.png",
        "./imgs/8_coin/Gold_8.png",
        "./imgs/8_coin/Gold_9.png",
        "./imgs/8_coin/Gold_10.png"
    ];

    /** @type {number} X-coordinate of the coin on the map. */
    x = 150;

    /** @type {number} Y-coordinate of the coin on the map. */
    y = 150;

    /** @type {number} Width of the coin sprite. */
    width = 25;

    /** @type {number} Height of the coin sprite. */
    height = 25;

    /** @type {number} Rotation angle (not currently used). */
    rotation = 0;

    /** @type {number} Index of the currently displayed image frame. */
    currentImage = 0;

    /** @type {HTMLImageElement[]} Loaded image frames for animation. */
    images = [];

    /** @type {number} Vertical speed (unused in static coins). */
    speedY = 20;

    /** @type {number} Gravity acceleration (unused in static coins). */
    acceleration = 3;

    /** @type {boolean} Flag indicating if all images are loaded. */
    loaded = false;

    /** @type {Promise<HTMLImageElement>[]} Promises for preloading coin images. */
    loadImagePromises = [];

    /**
     * Creates a new Coins instance and loads its images.
     * Initialises image loading and animation cycle.
     */
    constructor() {
        super();
        this.loadAllImages();
        this.initAnimation();
    }

    /**
     * Prepares image promises for all coin animation frames.
     * Each image is preloaded before animation begins.
     */
    loadAllImages() {
        this.loadImagePromises = this.IMAGES_COINS.map((path) =>
            new Promise((resolve) => {
                const img = new Image();
                img.src = path;
                img.onload = () => resolve(img);
                img.onerror = () => console.error(`Error loading image: ${path}`);
            })
        );
    }

    /**
     * Resolves all image promises and starts animation after loading.
     * Initialises the animation cycle.
     */
    initAnimation() {
        Promise.all(this.loadImagePromises).then((images) => {
            this.images = images;
            this.currentImage = 0;
            this.loaded = true;
            this.animate();
        });
    }

    /**
     * Draws the coin on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The drawing context.
     */
    draw(ctx) {
        if (!this.loaded || this.images.length === 0) return;
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.drawImage(
            this.images[this.currentImage],
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        ctx.restore();
        this.drawGreenFrame(ctx);
    }

    /**
     * Starts the coin animation cycle.
     * Cycles through all loaded image frames in fixed intervals.
     */
    animate() {
        setInterval(() => {
            if (this.loaded && this.images.length > 0) {
                this.currentImage = (this.currentImage + 1) % this.images.length;
            }
        }, 200);
    }

    /**
     * Checks if this coin collides with another object.
     * @param {DrawableObject} collectableObject - The object to check collision against.
     * @returns {boolean} True if colliding, otherwise false.
     */
    isColliding(collectableObject) {
        return (
            this.x + this.width > collectableObject.x &&
            this.x < collectableObject.x + collectableObject.width &&
            this.y + this.height > collectableObject.y &&
            this.y < collectableObject.y + collectableObject.height
        );
    }

    /**
     * Checks collisions between the character and coins.
     * If a collision is detected, the coin will be collected.
     */
    checkCollisionCoins() {
        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin(index);
            }
        });
    }

    /**
     * Handles the collection of a coin.
     * Removes it from the array, plays sound and updates the status bar.
     * @param {number} index - The index of the coin to remove.
     */
    collectCoin(index) {
        SoundManager.playSound("coin");
        this.coins.splice(index, 1);
        this.statusBar.setPersentageCoins(this.score++);
    }

    /**
     * Empty override to prevent missing method errors.
     * @param {CanvasRenderingContext2D} ctx - Unused.
     */
    drawFrame(ctx) { /* not used for coins */ }
}
