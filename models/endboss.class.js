/**
 * Represents the endboss enemy in the game world.
 * Extends MovableObject to inherit movement, collision and animation behaviour.
 */
class Endboss extends MovableObject {
    /** @type {number} Height of the endboss. */
    height = 260;

    /** @type {number} Width of the endboss. */
    width = 260;

    /** @type {number} Y-coordinate of the endboss on the canvas. */
    y = 0;

    /** @type {number} Movement speed of the endboss. */
    speed = 0.45;

    /** @type {number} Energy level of the endboss (health points). */
    energy = 5;

    /** @type {boolean} Whether the endboss is in angry state. */
    isAngry = false;

    /** @type {boolean} Whether the endboss is currently hurt. */
    isHurt = false;

    /** @type {boolean} Whether the endboss has made contact with the character. */
    contactWithCharacter = false;

    /** @type {boolean} Whether the endboss is dead. */
    isDead = false;

    /** @type {number} Top offset of the collision box. */
    offsetTop = 50;

    /** @type {number} Bottom offset of the collision box. */
    offsetBottom = 0;

    /** @type {number} Left offset of the collision box. */
    offsetLeft = 50;

    /** @type {number} Right offset of the collision box. */
    offsetRight = 50;

    /** @type {boolean} Internal flag to prevent duplicate move intervals. */
    _moveIntervalStarted = false;

    /** @type {string[]} Walk animation image paths. */
    IMAGES_WALK = [
        "./imgs/4_enemie_boss_chicken/1_walk/G1.png",
        "./imgs/4_enemie_boss_chicken/1_walk/G2.png",
        "./imgs/4_enemie_boss_chicken/1_walk/G3.png",
        "./imgs/4_enemie_boss_chicken/1_walk/G4.png"
    ];

    /** @type {string[]} Hurt animation image paths. */
    IMAGES_HURTING = [
        "./imgs/4_enemie_boss_chicken/4_hurt/G21.png",
        "./imgs/4_enemie_boss_chicken/4_hurt/G22.png",
        "./imgs/4_enemie_boss_chicken/4_hurt/G23.png"
    ];

    /** @type {string[]} Angry animation image paths. */
    IMAGES_ANGRY = [
        "./imgs/4_enemie_boss_chicken/2_alert/G5.png",
        "./imgs/4_enemie_boss_chicken/2_alert/G6.png",
        "./imgs/4_enemie_boss_chicken/2_alert/G7.png",
        "./imgs/4_enemie_boss_chicken/2_alert/G8.png",
        "./imgs/4_enemie_boss_chicken/2_alert/G9.png",
        "./imgs/4_enemie_boss_chicken/2_alert/G10.png",
        "./imgs/4_enemie_boss_chicken/2_alert/G11.png",
        "./imgs/4_enemie_boss_chicken/2_alert/G12.png"
    ];

    /** @type {string[]} Dead animation image paths. */
    IMAGES_DEAD = [
        "./imgs/4_enemie_boss_chicken/5_dead/G24.png",
        "./imgs/4_enemie_boss_chicken/5_dead/G25.png",
        "./imgs/4_enemie_boss_chicken/5_dead/G26.png"
    ];

    /**
     * Creates a new Endboss instance and loads all resources.
     */
    constructor() {
        super();
        this.initImages();
        this.setInitialPosition();
        this.speed = 0.1;
        this.debugMode = true;
        this.animate();
    }

    /** Loads all image sets for the endboss. */
    initImages() {
        this.loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_ANGRY);
        this.loadImages(this.IMAGES_DEAD);
    }

    /** Sets the initial position of the endboss. */
    setInitialPosition() {
        this.x = 3400;
        this.y = 160;
    }

    /**
     * Assigns the game world reference.
     * @param {object} world - The current game world instance.
     */
    setWorld(world) { this.world = world; }

    /** Triggers contact with the character and switches to boss music. */
    letEndbossTouch() {
        this.contactWithCharacter = true;
        SoundManager.stopBackground();
        SoundManager.playBackground("bossMusic");
        this.isAngry = true;
        this.playAngryAnimation();
    }

    /** Starts moving the boss to the left continuously. */
    endbossMoveLeft() {
        if (this._moveIntervalStarted) return;
        this._moveIntervalStarted = true;
        this._moveIntervalId = setInterval(() => {
            if (!this.isDead) this.moveLeft();
        }, 1000 / 250);
    }

    /** Handles the boss being hit by a bottle. */
    hitByBottle() {
        if (this.energy > 1) {
            this.energy--;
            this.isHurt = true;
            if (this.world?.statusBar) this.world.statusBar.setPersentageEndboss(this.energy);
            this.playHurtAnimation();
            SoundManager.playSound("endbossHit");
        } else {
            this.die();
        }
    }

    /** Plays the hurt animation and transitions to angry state. */
    playHurtAnimation() {
        const intervalId = setInterval(() => this.playAnimation(this.IMAGES_HURTING), 250);
        setTimeout(() => {
            clearInterval(intervalId);
            this.isHurt = false;
            this.isAngry = true;
            this.playAngryAnimation();
        }, this.IMAGES_HURTING.length * 250);
    }

    /** Starts the angry animation loop. */
    playAngryAnimation() {
        if (this._angryAnimStarted) return;
        this._angryAnimStarted = true;

        this._angryAnimId = setInterval(() => {
            if (!this.isHurt && this.energy > 0 && !this.isDead) {
                this.playAnimation(this.IMAGES_ANGRY);

                if (!this._angrySoundPlaying) {
                    this._angrySoundPlaying = true;
                    setTimeout(() => this._angrySoundPlaying = false, 1000);
                }
            }
        }, 200);
    }

    /** Handles death of the endboss and plays death animation. */
    die() {
        this.isDead = true;
        if (this.world?.statusBar) this.world.statusBar.setPersentageEndboss(0);
        SoundManager.playSound("endbossDead");
        SoundManager.stopBackground();
        this.startDeathAnimation();
    }

    /** Starts the death animation and reloads the game after it finishes. */
    startDeathAnimation() {
        const intervalId = setInterval(() => this.playAnimation(this.IMAGES_DEAD), 250);
        setTimeout(() => {
            clearInterval(intervalId);
            window.location.reload();
        }, this.IMAGES_DEAD.length * 250);
    }

    /** Starts the idle walking/angry animation loop. */
    animate() {
        this._walkAnimId = setInterval(() => {
            if (this.isDead) return;
            if (!this.isHurt) this.playAnimation(this.IMAGES_WALK);
            if (this.contactWithCharacter) {
                this.playAnimation(this.IMAGES_ANGRY);
                this.endbossMoveLeft();
            }
            this.checkProximityToCharacter();
        }, 200);
    }

    /** Checks distance to character and triggers angry state when close. */
    checkProximityToCharacter() {
        if (this.world?.character) {
            const distance = Math.abs(this.x - this.world.character.x);
            if (distance < 150 && !this.isHurt) {
                this.isAngry = true;
                this.playAngryAnimation();
            }
        }
    }
}
