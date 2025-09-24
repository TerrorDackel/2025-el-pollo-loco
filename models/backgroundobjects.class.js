/**
 * BackgroundObject represents static scenery elements (e.g. sky, mountains, ground)
 * that move relative to the camera but are not interactive.
 * Extends MovableObject to reuse drawing and positioning logic.
 */
class BackgroundObject extends MovableObject {
    /**
     * Constructs a background object and initialises its visual representation.
     * @param {string} imagePath - File path to the image asset.
     * @param {number} xBg - Horizontal position in the world.
     * @param {number} yBg - Vertical position in the world.
     * @param {number} heightBg - Height in pixels.
     * @param {number} widthBg - Width in pixels.
     */
    constructor(imagePath, xBg, yBg, heightBg, widthBg) {
        super();
        this.loadAndSetImage(imagePath, xBg, yBg, heightBg, widthBg);
    }

    /**
     * Loads the given image and applies size and position to this object.
     * @param {string} imagePath - File path to the image asset.
     * @param {number} xBg - Horizontal position in the world.
     * @param {number} yBg - Vertical position in the world.
     * @param {number} heightBg - Height in pixels.
     * @param {number} widthBg - Width in pixels.
     */
    loadAndSetImage(imagePath, xBg, yBg, heightBg, widthBg) {
        this.loadImage(imagePath, xBg, yBg, heightBg, widthBg);
        this.x = xBg;
        this.y = yBg;
        this.height = heightBg;
        this.width = widthBg;
    }
}
