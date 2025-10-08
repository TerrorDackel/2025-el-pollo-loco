/**
 * Represents the main character controlled by the player.
 * Extends MovableObject to provide movement, collision and animation.
 */
class Character extends MovableObject {
    height = 300;
    width = 150;
    x = 0;
    y = 110;
    speed = 10;

    /** Independent throttle for IDLE frame rate (ms per frame). */
    idleAnimMs = 100; /* <- kleiner = schnelleres Idle-Framewechseln */

    /** Independent throttle for JUMP frame rate (ms per frame). */
    jumpAnimMs = 90;  /* <- kleiner = schnelleres Jump-Framewechseln */

    /** Internal timestamp markers for throttled animations. */
    _lastIdleFrameAt = 0;
    _lastJumpFrameAt = 0;

    /**
     * Image paths for idle animation.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        "./imgs/2_character_pepe/1_idle/idle/I-1.png",
        "./imgs/2_character_pepe/1_idle/idle/I-2.png",
        "./imgs/2_character_pepe/1_idle/idle/I-3.png",
        "./imgs/2_character_pepe/1_idle/idle/I-4.png",
        "./imgs/2_character_pepe/1_idle/idle/I-5.png",
        "./imgs/2_character_pepe/1_idle/idle/I-6.png",
        "./imgs/2_character_pepe/1_idle/idle/I-7.png",
        "./imgs/2_character_pepe/1_idle/idle/I-8.png",
        "./imgs/2_character_pepe/1_idle/idle/I-9.png",
        "./imgs/2_character_pepe/1_idle/idle/I-10.png"

    ];

    IMAGES_SLEEP = [
        "./imgs/2_character_pepe/1_idle/long_idle/I-11.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-12.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-13.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-14.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-15.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-16.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-17.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-18.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-19.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-20.png"
    ];

    /**
     * Image paths for walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        "./imgs/2_character_pepe/2_walk/W-21.png",
        "./imgs/2_character_pepe/2_walk/W-22.png",
        "./imgs/2_character_pepe/2_walk/W-23.png",
        "./imgs/2_character_pepe/2_walk/W-24.png",
        "./imgs/2_character_pepe/2_walk/W-25.png",
        "./imgs/2_character_pepe/2_walk/W-26.png"
    ];

    /**
     * Image paths for jumping animation.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        "./imgs/2_character_pepe/3_jump/J-31.png",
        "./imgs/2_character_pepe/3_jump/J-32.png",
        "./imgs/2_character_pepe/3_jump/J-33.png",
        "./imgs/2_character_pepe/3_jump/J-34.png",
        "./imgs/2_character_pepe/3_jump/J-35.png",
        "./imgs/2_character_pepe/3_jump/J-36.png",
        "./imgs/2_character_pepe/3_jump/J-37.png",
        "./imgs/2_character_pepe/3_jump/J-38.png",
        "./imgs/2_character_pepe/3_jump/J-39.png",
        "./imgs/2_character_pepe/2_walk/W-26.png"
    ];

    /**
     * Image paths for hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        "./imgs/2_character_pepe/4_hurt/H-41.png",
        "./imgs/2_character_pepe/4_hurt/H-42.png",
        "./imgs/2_character_pepe/4_hurt/H-43.png"
    ];

    /**
     * Image paths for death animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        "./imgs/2_character_pepe/5_dead/D-51.png",
        "./imgs/2_character_pepe/5_dead/D-52.png",
        "./imgs/2_character_pepe/5_dead/D-53.png",
        "./imgs/2_character_pepe/5_dead/D-54.png",
        "./imgs/2_character_pepe/5_dead/D-55.png",
        "./imgs/2_character_pepe/5_dead/D-56.png",
        "./imgs/2_character_pepe/5_dead/D-57.png"
    ];

    /** @type {number} Interval ID for animation loop. */
    animationInterval;

    /** @type {number} Number of collected bottles. */
    collectedBottles = 0;

    /** @type {number} Stores the previous bottom position for stomp detection. */
    prevBottom = 0;

    /**
     * Creates a new Character instance.
     */
    constructor() {
        super();
        this.initImages();
        this.applyGravity();
        this.setOffsets();
        this.energy = 5;
        this.prevBottom = this.getBox(this).bottom;
    }

    /** Load all sprite images for the character. */
    initImages() {
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_DEAD);
    }

    /** Sets collision offsets for the character. */
    setOffsets() {
        this.offsetTop = 100;
        this.offsetBottom = 10;
        this.offsetLeft = 10;
        this.offsetRight = 10;
    }

    /**
     * Connects the character with the game world.
     * @param {World} world - The game world instance.
     */
    setWorld(world) { 
        this.world = world; 
    }

    /** Adds a collected bottle to the character’s inventory. */
    addBottle() { 
        this.collectedBottles++; 
    }

    /** Starts the main animation loop. */
    animate() {
        this.animationInterval = setInterval(() => {
            SoundManager.pauseSound("walking");
            this.handleMovement();
            this.updateCamera();
            this.updateAnimation();
            this.checkCollisionWithEnemies();
            this.prevBottom = this.getBox(this).bottom;
        }, 1000 / 30);
    }

    /** Pauses the animation loop. */
    pauseAnimation() { 
        clearInterval(this.animationInterval); 
    }

    /** Resumes the animation loop. */
    resumeAnimation() { 
        this.animate(); 
    }

    /** Handles player movement based on input. */
    handleMovement() {
        if (!this.world?.running) return;
        this.handleRightMovement();
        this.handleLeftMovement();
        this.handleJump();
    }

    /** Handles movement to the right. */
    handleRightMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            SoundManager.playSound("walking");
        }
    }

    /** Handles movement to the left. */
    handleLeftMovement() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            SoundManager.playSound("walking");
        }
    }

    /** Handles jump movement. */
    handleJump() {
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            SoundManager.playSound("jumping");
        }
    }

    /** Updates the camera position relative to the character. */
    updateCamera() { this.world.camera_x = -this.x + 100; }

    /**
     * Selects and plays the appropriate animation for the current state.
     * Priority order: dead → hurt → jump → idle/sleep → walking.
     * Idle starts immediately when no action is pressed.
     * Sleep replaces idle after 15s of uninterrupted idle.
     */
    updateAnimation() {
        if (this.isDead()) {
            this.handleDeath();
            return;
        }
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.idleStartAt = 0;
            return;
        }
        if (this.isAboveGround()) {
            this.playAnimIfDue(this.IMAGES_JUMPING, "_lastJumpFrameAt", this.jumpAnimMs);
            this.idleStartAt = 0;
            return;
        }

        if (this.shouldPlayIdle()) {
            if (!this.idleStartAt) this.idleStartAt = Date.now();
            const idleElapsed = Date.now() - this.idleStartAt;
            const idlePhaseMs = 15000; // 15 seconds of idle before sleep
            if (idleElapsed >= idlePhaseMs) {
                this.playAnimIfDue(this.IMAGES_SLEEP, "_lastIdleFrameAt", this.idleAnimMs);
            } else {
                this.playAnimIfDue(this.IMAGES_IDLE, "_lastIdleFrameAt", this.idleAnimMs);
            }
        } else {
            this.idleStartAt = 0;
            this.handleWalkingAnimation();
        }
    }

    /**
     * Returns whether idle is allowed right now.
     * Idle is allowed when no action key is currently pressed.
     * Idle starts immediately (no delay).
     * @returns {boolean}
     */
    shouldPlayIdle() {
        const kb = this.world?.keyboard;
        if (!kb) return false;
        if (kb.isAnyActionPressed()) return false;
        return true; // immediate idle when nothing is pressed
    }

    /** Plays walking animation when moving horizontally. */
    handleWalkingAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Plays an animation only if the per-channel throttle has elapsed.
     * @param {string[]} images - frames list
     * @param {"_lastIdleFrameAt"|"*"_} lastProp - timestamp field to use
     * @param {number} ms - throttle in ms
     */
    playAnimIfDue(images, lastProp, ms) {
        const now = Date.now();
        const last = this[lastProp] || 0;
        if (now - last < ms) return;
        this[lastProp] = now;
        this.playAnimation(images);
    }

    /** Handles the death sequence of the character. */
    handleDeath() {
        if (!this.deadAnimationPlayed) {
            this.playAnimation(this.IMAGES_DEAD);
            SoundManager.playSound("dead");
            /* world continues to tick animations, but movement is locked via handleMovement() */
            setTimeout(() => {
                this.deadAnimationPlayed = true;
                showRestartPrompt();
                this.world.running = false; /* ensure stopped state for inputs and game loop */
            }, 1000);
        }
    }

    /** Initiates a jump. */
    jump() { 
        this.speedY = 33; 
    }

    /**
     * Returns collision box of an object.
     * @param {MovableObject} o - The object to get the box for.
     * @returns {{left: number, right: number, top: number, bottom: number}}
     */
    getBox(o) {
        return {
            left: o.x + (o.offsetLeft || 0),
            right: o.x + o.width - (o.offsetRight || 0),
            top: o.y + (o.offsetTop || 0),
            bottom: o.y + o.height - (o.offsetBottom || 0)
        };
    }

    /**
     * Determines if the character stomps an enemy.
     * @param {MovableObject} enemy - The enemy to check against.
     * @returns {boolean} True if stomping, false otherwise.
     */
    isStomping(enemy) {
        const meNow = this.getBox(this);
        const en = this.getBox(enemy);
        const xOverlap = meNow.right > en.left && meNow.left < en.right;
        const wasAbove = this.prevBottom <= en.top;
        const hitTop = meNow.bottom >= en.top; 
        const result = xOverlap && wasAbove && hitTop;
        return result;
    }

    /** Checks collision with all enemies in the world. */
    checkCollisionWithEnemies() {
        this.world.enemies.forEach((enemy, i) => {
            if (this.isStomping(enemy)) this.handleStomp(enemy, i);
            else if (this.isColliding(enemy) && !this.isHurt()) {
                this.takeDamage();
            }
        });

        const boss = this.world.level.boss;
        if (boss) this.checkCollisionWithBoss(boss);
    }

    /**
     * Checks collision with the boss.
     * @param {MovableObject} boss - The boss enemy.
     */
    checkCollisionWithBoss(boss) {
        if (this.isStomping(boss)) this.handleBossStomp(boss);
        else if (this.isColliding(boss) && !this.isHurt()) {
            this.takeDamage();
        }
    }

    /**
     * Handles stomping a normal enemy.
     * @param {MovableObject} enemy - The enemy that was stomped.
     * @param {number} index - Index of the enemy in the array.
     */
    handleStomp(enemy, index) {
        if (typeof enemy.die === "function") enemy.die();
        this.world.enemies.splice(index, 1);
        this.speedY = 20;
        this.y = enemy.y - this.height;
    }

    /**
     * Handles stomping the boss.
     * @param {MovableObject} boss - The boss enemy.
     */
    handleBossStomp(boss) {
        if (typeof boss.hitByBottle === "function") boss.hitByBottle();
        this.speedY = 20;
        this.y = boss.y - this.height;
    }

    /** Handles character taking damage. */
    takeDamage() {
        this.hit();
        this.world.statusBar.setPersentageHealth(this.energy);
    }
}
