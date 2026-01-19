/**
 * Represents a big chicken enemy (mini-boss) in the game world.
 * Extends MovableObject to inherit movement and collision behaviour.
 */
class ChickenBig extends MovableObject {
  /** @type {number} Height of the big chicken. */
  height = 150;
  /** @type {number} Width of the big chicken. */
  width = 150;
  /** @type {boolean} Whether the big chicken is dead. */
  isDead = false;
  /** @type {World|null} World reference injected by World.setWorld(). */
  world = null;

  /**
   * Sprite images used for the walking animation of the big chicken.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "/imgs/4_enemie_boss_chicken/1_walk/G1.png",
    "/imgs/4_enemie_boss_chicken/1_walk/G2.png",
    "/imgs/4_enemie_boss_chicken/1_walk/G3.png",
    "/imgs/4_enemie_boss_chicken/1_walk/G4.png"
  ];

  /**
   * Sprite image used for the dead state of the big chicken.
   * @type {string[]}
   */
  IMAGES_DEAD = ["imgs/4_enemie_boss_chicken/5_dead/G26.png"];

  /** Creates a new ChickenBig instance. */
  constructor() {
    super();
    this.initImages();
    this.setInitialPosition();
    this.speed = 1;
    this.animate();
    this.moveLeft();
    this.setOffsets();
  }

  /** Loads all images required for walking and dead states. */
  initImages() {
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
  }

  /** Sets the initial spawn position of the big chicken on the game map. */
  setInitialPosition() {
    this.x = 3500;
    this.y = 255;
  }

  /** Configures the hitbox offsets of the big chicken for collisions. */
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
   * Kills the big chicken and triggers the death animation.
   * Increments the big chicken kill counter in {@link World}.
   */
  die() {
    this.isDead = true;
    this.playAnimation(this.IMAGES_DEAD);
    SoundManager.playSound("chickenDead");
    if (this.world) this.world.killedChickenBigs++;
    setTimeout(() => this.removeFromGame(), 500);
  }

  /** Removes the big chicken instance from the game world enemy array. */
  removeFromGame() {
    const index = this.world?.level?.enemies.indexOf(this);
    if (index > -1) this.world.level.enemies.splice(index, 1);
  }

  /** Starts both the walking and animation loops of the big chicken. */
  animate() {
    this.startWalkingLoop();
    this.startAnimationLoop();
  }

  /** Continuously moves the big chicken to the left while it is alive. */
  startWalkingLoop() {
    this.walkingInterval = setInterval(() => {
      if (!this.isDead) this.moveLeft();
    }, 1000 / 60);
  }

  /** Handles the animation frames depending on the state (alive or dead). */
  startAnimationLoop() {
    this.animationInterval = setInterval(() => {
      if (this.isDead) this.playAnimation(this.IMAGES_DEAD);
      else this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
