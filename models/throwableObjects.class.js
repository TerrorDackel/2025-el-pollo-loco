/**
 * Represents a throwable salsa bottle in the game world.
 * Extends {@link MovableObject} to inherit movement, gravity, collision and animation.
 */
class ThrowableObjects extends MovableObject {
    /** @type {string[]} Image set for rotating (flying) bottles. */
    IMAGES_THROWBOTTLES = [
        "./imgs/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "./imgs/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "./imgs/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "./imgs/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ];

    /** @type {string[]} Image set for smashing bottles (splash effect). */
    IMAGES_SMASHINGBOTTLES = [
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
    ];

    /**
     * Creates a new throwable bottle and starts its movement/animation.
     * @param {number} x - Initial x position.
     * @param {number} y - Initial y position.
     * @param {World} world - Reference to the current game world.
     * @param {boolean} [facingLeft=false] - Direction of throw. True = left, false = right.
     */
    constructor(x, y, world, facingLeft = false) {
        super();
        this.loadImage(this.IMAGES_THROWBOTTLES[0]);   // ✅ fixes undefined img
        this.loadImages(this.IMAGES_THROWBOTTLES);
        this.loadImages(this.IMAGES_SMASHINGBOTTLES);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.debugMode = true;
        this.world = world;
        this.hasHit = false;
        /** @type {number} Horizontal velocity (depends on facing). */
        this.vx = facingLeft ? -10 : 10;
        this.animate();
        this.throw();
    }

    /**
     * Draws the bottle on canvas while isolating state changes.
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     */
    draw(ctx) {
        if (!this.img) {
            console.warn("[ThrowableObjects.draw] WARNING: img is undefined!");
        }
        ctx.save();
        super.draw(ctx);
        ctx.restore();
    }

    /**
     * Checks if bottle is above ground level.
     * @returns {boolean} True if above ground, otherwise false.
     */
    isAboveGround() { return this.y < 330; }

    /** Starts main animation loop for throwing and smashing. */
    animate() {
        let timeoutSet = false;
        const interval = setInterval(() => {
            if (this.isAboveGround()) this.animateThrow();
            else this.animateSmash(interval, timeoutSet);
        }, 100);
    }

    /** Plays rotation animation while flying and checks collisions. */
    animateThrow() {
        this.playAnimation(this.IMAGES_THROWBOTTLES);
        this.checkBottleEnemyCollision();
    }

    /**
     * Plays smash animation and removes bottle afterwards.
     * @param {number} interval - The interval ID for clearing.
     * @param {boolean} timeoutSet - Ensures smash timeout is set only once.
     */
    animateSmash(interval, timeoutSet) {
        if (!timeoutSet) {
            timeoutSet = true;
            this.currentImage = 0;
            setTimeout(() => this.removeAfter(interval), 300);
        }
        this.playAnimation(this.IMAGES_SMASHINGBOTTLES);
        SoundManager.playSound("smashBottle");
    }

    /**
     * Removes bottle after smash animation is done.
     * @param {number} interval - The interval ID to clear.
     */
    removeAfter(interval) {
        clearInterval(interval);
        const index = this.world.throwableObjects.indexOf(this);
        if (index !== -1) this.world.throwableObjects.splice(index, 1);
    }

    /** Applies gravity and horizontal movement to the bottle. */
    throw() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            if (this.isAboveGround()) {
                this.x += this.vx;
            }
        }, 1000 / 50);
    }

    /** Checks collisions of the bottle with boss or enemies. */
    checkBottleEnemyCollision() {
        if (this.hasHit || !this.world) return;
        if (this.tryHitBoss()) return;
        this.tryHitEnemies();
    }

    /**
     * Tries to hit the endboss with the bottle.
     * @returns {boolean} True if boss was hit.
     */
    tryHitBoss() {
        const boss = this.world.level?.boss;
        if (boss && this.isBottleColliding(boss)) {
            this.hasHit = true;
            boss.hitByBottle();
            this.removeBottle();
            return true;
        }
        return false;
    }

    /** Tries to hit smaller enemies with the bottle. */
    tryHitEnemies() {
        this.world.enemies?.forEach((enemy, index) => {
            if (this.isBottleColliding(enemy)) {
                this.hasHit = true;
                if (enemy instanceof Endboss) enemy.hitByBottle();
                else {
                    enemy.die();
                    this.world.enemies.splice(index, 1);
                }
                this.removeBottle();
            }
        });
    }

    /** Removes this bottle from the world’s throwableObjects list. */
    removeBottle() {
        const index = this.world.throwableObjects.indexOf(this);
        if (index !== -1) this.world.throwableObjects.splice(index, 1);
    }

    /**
     * Checks bounding-box collision between bottle and enemy.
     * @param {MovableObject} enemy - The enemy to test against.
     * @returns {boolean} True if colliding.
     */
    isBottleColliding(enemy) {
        return (
            this.x + this.width > enemy.x &&
            this.x < enemy.x + enemy.width &&
            this.y + this.height > enemy.y &&
            this.y < enemy.y + enemy.height
        );
    }
}