/**
 * Represents a chicken enemy in the game world.
 * Extends MovableObject to inherit movement and collision behaviour.
 */
class Chicken extends MovableObject {
    height = 70;
    width = 70;
    isDead = false;

    /**
     * Sprite images used for the walking animation of the chicken.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        "imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "imgs/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "imgs/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];

    /**
     * Sprite image used for the dead state of the chicken.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        "./imgs/3_enemies_chicken/chicken_normal/2_dead/dead.png"
    ];

    /**
     * Creates a new Chicken instance.
     * Initializes images, position, movement and animation.
     */
    constructor() {
        super();
        this.initImages();
        this.setInitialPosition();
        this.animate();
        this.moveLeft();
        this.setRandomSpeed();
        this.setOffsets();
    }

    /**
     * Loads all images required for walking and dead states.
     */
    initImages() {
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
    }

    /**
     * Sets the initial spawn position of the chicken on the game map.
     * X is randomized to distribute chickens across the level.
     */
    setInitialPosition() {
        this.x = 500 + Math.random() * 3000;
        this.y = 310;
    }

    /**
     * Assigns a random movement speed to the chicken.
     * Ensures variety in enemy behavior.
     */
    setRandomSpeed() {
        this.speed = 0.3 + Math.random() * 0.5;
    }

    /**
     * Configures the hitbox offsets of the chicken for collisions.
     */
    setOffsets() {
        this.offsetTop = -10;
        this.offsetBottom = -10;
        this.offsetLeft = -10;
        this.offsetRight = -10;
    }

    /**
     * Starts the walking animation loop for the chicken.
     * Moves the chicken continuously to the left and cycles walking frames.
     */
    animate() {
        this.walkingInterval = setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 60);
    }

    /**
     * Kills the chicken and starts the death animation.
     * Plays sound effect and removes the chicken after a short delay.
     */
    die() {
        this.isDead = true;
        this.playAnimation(this.IMAGES_DEAD);
        SoundManager.playSound("chickenDead");
        setTimeout(() => this.removeFromGame(), 500);
    }

    /**
     * Removes the chicken instance from the game world enemy array.
     */
    removeFromGame() {
        const index = this.world?.level?.enemies.indexOf(this);
        if (index > -1) this.world.level.enemies.splice(index, 1);
    }
}
