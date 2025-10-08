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
     * Starts the movement of the cloud with a continuous loop.
     * Uses requestAnimationFrame so movement is smooth and independent of World.draw().
     * Note: We intentionally do not hook into World.freeze to keep clouds unaffected by pause.
     */
    animate() {
        /* Original one-shot movement removed because it moved only once. */
        /* this.moveLeft(); this.speed = 0.15 + Math.random() * 0.15; */ /* Commented: single step was insufficient */
        this.speed = 0.15 + Math.random() * 0.15;
        const step = () => { this.moveLeft(); this._rafId = requestAnimationFrame(step); };
        this._rafId = requestAnimationFrame(step);
    }
}