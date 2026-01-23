/**
 * Represents a small chicken enemy in the game world.
 * Extends MovableObject to inherit movement and collision behaviour.
 */
class Chickensmall extends MovableObject {
  /** @type {number} Height of the small chicken. */
  height = 50;
  /** @type {number} Width of the small chicken. */
  width = 50;
  /** @type {boolean} Whether the small chicken is dead. */
  isDead = false;
  /** @type {World|null} World reference injected by World.setWorld(). */
  world = null;

  /**
   * Sprite images used for the walking animation of the small chicken.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "imgs/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "imgs/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "imgs/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Sprite image used for the dead state of the small chicken.
   * @type {string[]}
   */
  IMAGES_DEAD = ["./imgs/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /** Creates a new Chickensmall instance. */
  constructor() {
    super();
    this.initImages();
    this.setInitialPosition();
    this.setRandomSpeed();
    this.setOffsets();
    this.animate();
  }

  /** Loads all images required for walking and dead states. */
  initImages() {
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
  }

  /** Sets the initial spawn position of the small chicken on the game map. */
  setInitialPosition() {
    this.x = 600 + Math.random() * 3500;
    this.y = 340;
  }

  /** Assigns a random movement speed for the small chicken. */
  setRandomSpeed() {
    this.speed = 0.9 + Math.random() * 0.9;
  }

  /** Configures the hitbox offsets of the small chicken for collisions. */
  setOffsets() {
    this.offsetTop = -10;
    this.offsetBottom = -10;
    this.offsetLeft = -10;
    this.offsetRight = -10;
  }

  /** Inject world reference (called by World.setWorld()). */
  setWorld(world) {
    this.world = world;
  }

  /**
   * Kills the small chicken and triggers the death animation.
   * Increments the small chicken kill counter in {@link World}.
   */
  die() {
    this.isDead = true;
    this.playAnimation(this.IMAGES_DEAD);
    SoundManager.playSound("chickenDead");
    if (this.world) this.world.killedChickenSmalls++;
    setTimeout(() => this.removeFromGame(), 500);
  }

  /** Removes the small chicken instance from the game world enemy array. */
  removeFromGame() {
    const index = this.world?.level?.enemies.indexOf(this);
    if (index > -1) this.world.level.enemies.splice(index, 1);
  }

  /** Starts both the walking and animation loops of the small chicken. */
  animate() {
    this.startWalkingLoop();
    this.startAnimationLoop();
  }

  /** Handles continuous walking movement and animation playback. */
  startWalkingLoop() {
    this.walkingInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

  /** Handles animation frame switching depending on the state (alive or dead). */
  startAnimationLoop() {
    this.animationInterval = setInterval(() => {
      if (this.isDead) this.playAnimation(this.IMAGES_DEAD);
      else this.playAnimation(this.IMAGES_WALKING);
    }, 130);
  }
}

const ChickenSmall = Chickensmall;
