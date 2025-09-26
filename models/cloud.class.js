/**
 * Represents a cloud in the background of the game world.
 * Extends MovableObject to allow slow horizontal movement across the scene.
 */
class Cloud extends MovableObject {
    /**
     * Default height of the cloud sprite.
     * @type {number}
     */
    height = 200;

    /**
     * Default width of the cloud sprite.
     * @type {number}
     */
    width = 700;

    /**
     * Creates a new Cloud instance at a randomized position in the sky.
     * Loads the cloud image, assigns random position and starts movement.
     */
    constructor() {
        super();
        this.loadImage("./imgs/5_background/layers/4_clouds/1.png");
        this.setRandomPosition();
        this.animate();
    }

    /**
     * Sets a random starting position for the cloud on the map.
     * Randomizes both horizontal (x) and vertical (y) position.
     */
    setRandomPosition() {
        this.x = -100 + Math.random() * 3400;
        this.y = -50 + Math.random() * 150;
    }

    /**
     * Starts the movement of the cloud by assigning a small random speed.
     * Clouds move slowly from right to left for a parallax effect.
     */
    animate() {
        this.moveLeft();
        this.speed = 0.15 + Math.random() * 0.15;
    }
}
