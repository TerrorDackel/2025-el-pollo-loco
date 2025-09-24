/**
 * Represents the endboss enemy in the game world.
 * Extends MovableObject to inherit movement, collision and animation.
 */
class Endboss extends MovableObject {
    height = 260;
    width = 260;
    y = 0;
    speed = 0.45;
    energy = 5;
    isAngry = false;
    isHurt = false;
    contactWithCharacter = false;
    isDead = false;
    offsetTop = 50;
    offsetBottom = 0;
    offsetLeft = 50;
    offsetRight = 50;
    _moveIntervalStarted = false;

    IMAGES_WALK = [
        "./imgs/4_enemie_boss_chicken/1_walk/G1.png",
        "./imgs/4_enemie_boss_chicken/1_walk/G2.png",
        "./imgs/4_enemie_boss_chicken/1_walk/G3.png",
        "./imgs/4_enemie_boss_chicken/1_walk/G4.png"
    ];

    IMAGES_HURTING = [
        "./imgs/4_enemie_boss_chicken/4_hurt/G21.png",
        "./imgs/4_enemie_boss_chicken/4_hurt/G22.png",
        "./imgs/4_enemie_boss_chicken/4_hurt/G23.png"
    ];

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

    /** Triggers contact with the character and switches music. */
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

    /** Plays the hurt animation and then transitions to angry state. */
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

    /** Checks distance to character to trigger anger. */
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
