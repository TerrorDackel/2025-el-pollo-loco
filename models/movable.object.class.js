/**
 * Represents a movable object in the game world.
 * Extends {@link DrawableObject} to provide movement, gravity, collision detection, 
 * energy states (hit, hurt, dead) and idle behavior.
 */
class MovableObject extends DrawableObject {
    /** @type {number} Horizontal movement speed. */
    speed = 0.25;

    /** @type {boolean} Whether the object is facing the opposite direction (mirrored). */
    otherDirection = false;

    /** @type {number} Vertical speed for jumps and gravity. */
    speedY = 20;

    /** @type {number} Acceleration applied to vertical speed (gravity). */
    acceleration = 3;

    /** @type {number} Remaining energy (health points). */
    energy = 5;

    /** @type {number} Timestamp of the last hit in ms since epoch. */
    lastHit = 0;

    /**
     * Applies gravity to the object with continuous updates.
     * Decreases {@link speedY} until the object reaches the ground.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above ground level.
     * ThrowableObjects are always treated as above ground.
     * @returns {boolean} True if above ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObjects) return true;
        return this.y < 100;
    }

    /**
     * Checks collision between this object and another.
     * Uses object offsets to improve hitbox accuracy.
     * @param {MovableObject} mo - The other movable object.
     * @returns {boolean} True if colliding, otherwise false.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offsetRight >= mo.x + mo.offsetLeft &&
            this.x - this.offsetLeft <= mo.x + mo.width - mo.offsetRight &&
            this.y + this.height - this.offsetBottom >= mo.y + mo.offsetTop &&
            this.y + this.offsetTop <= mo.y + mo.height - mo.offsetBottom
        );
    }

    /**
     * Checks if the object is idle (no movement for >3s).
     * If idle is detected, {@link startIdleMode} is triggered.
     * @returns {boolean} True if idle, otherwise false.
     */
    isIdle() {
        if (Date.now() - this.world.keyboard.lastMove > 3000 && !this.idleTriggered) {
            this.startIdleMode();
            return true;
        }
        return false;
    }

    /** 
     * Starts idle mode and triggers idle animation + sound. 
     * Automatically stops on the next key press.
     */
    startIdleMode() {
        if (!this.idleTriggered) {
            this.idleTriggered = true;
            SoundManager.playSound("idle");
            this.playAnimation(this.IMAGES_IDLE);
            document.addEventListener("keydown", () => this.stopIdleMode(), { once: true });
        }
    }

    /** Stops idle mode, pauses sound and resets state. */
    stopIdleMode() {
        SoundManager.pause("idle");
        this.idle_sound.currentTime = 0;
        this.idleTriggered = false;
    }

    /** 
     * Handles the object being hit and reduces energy by 1.
     * Sets {@link lastHit} for later {@link isHurt} checks.
     */
    hit() {
        this.energy -= 1;
        if (this.energy < 0) this.energy = 0;
        else this.lastHit = Date.now();
    }

    /**
     * Checks if the object was recently hurt (within 3 seconds).
     * @returns {boolean} True if hurt recently.
     */
    isHurt() {
        const timepassed = (Date.now() - this.lastHit) / 3000;
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead (no energy left).
     * @returns {boolean} True if dead.
     */
    isDead() { return this.energy === 0; }

    /**
     * Loads multiple images and stores them in the cache for animations.
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
     * Plays an animation by cycling through the given images.
     * Sets {@link img} to the current frame and advances {@link currentImage}.
     * @param {string[]} images - Array of image paths.
     */
    playAnimation(images) {
        const i = this.currentImage % images.length;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /** Moves the object right by increasing {@link x}. */
    moveRight() { this.x += this.speed; }

    /** Moves the object left by decreasing {@link x}. */
    moveLeft() { this.x -= this.speed; }

    /** Makes the object jump by setting {@link speedY} to a positive value. */
    jump() { this.speedY = 35; }
}
