/**
 * Represents the central game world containing the character, enemies, items and logic.
 * Manages collisions, rendering, animations and the main game loop.
 */
class World {
  /** @type {Character} The main player character. */
  character = new Character();

  /** @type {Level} Current level instance. */
  level = level1;

  /** @type {HTMLCanvasElement} Rendering surface. */
  canvas;

  /** @type {CanvasRenderingContext2D} Rendering context for the canvas. */
  ctx;

  /** @type {Keyboard} Keyboard input handler. */
  keyboard;

  /** @type {number} Camera offset along the x-axis. */
  camera_x = 0;

  /** @type {StatusBar} Displays health, coins, bottles and boss health. */
  statusBar = new StatusBar();

  /** @type {ThrowableObjects[]} Active thrown bottles in the world. */
  throwableObjects = [];

  /** @type {boolean} Indicates if the game loop is running. */
  running = true;

  /** @type {Coins[]} Coins currently placed in the level. */
  coins = [];

  /** @type {number} Current coin score. */
  score = 0;

  /** @type {Bottle[]} Bottles currently placed in the level. */
  bottles = [];

  /** @type {number} Count of killed normal chickens. */
  killedChickens = 0;

  /** @type {number} Count of killed big chickens. */
  killedChickenBigs = 0;

  /** @type {number} Count of killed small chickens. */
  killedChickenSmalls = 0;

  /** @type {number} Timestamp when the game started (ms since epoch). */
  startTime = Date.now();

  /** @type {number} ID of the current requestAnimationFrame loop. */
  _rafId = 0;

  /**
   * Creates a new World instance and initialises all game elements.
   * @param {HTMLCanvasElement} canvas - The rendering surface.
   * @param {Keyboard} keyboard - Keyboard input handler.
   * @param {Level} [level=level1] - Current level object.
   */
  constructor(canvas, keyboard, level = level1) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.statusBar = new StatusBar();
    this.level = level;
    this.setWorld();
    this.spawnCoins();
    this.spawnBottles();
    this.run();
    this.draw();
    this.character.animate();
    if (!SoundManager.isMuted) SoundManager.playBackground("music");
  }

  /** Connects the world with character, enemies and the boss. */
  setWorld() {
    this.linkCharacter();
    this.cacheEnemies();
    this.enemies.forEach((e) => this.attachWorld(e));
    this.attachWorld(this.level?.boss);
    this.enemies.forEach((e) => this.startAI(e));
    this.startAI(this.level?.boss);
  }

  /** Links the character to this world. */
  linkCharacter() {
    this.character.world = this;
  }

  /** Copies enemies array from the level for easier access. */
  cacheEnemies() {
    this.enemies = this.level?.enemies || [];
  }

  /**
   * Attaches this world instance to a given object.
   * @param {object} obj - Enemy, boss or any movable.
   */
  attachWorld(obj) {
    if (!obj) return;
    if (typeof obj.setWorld === "function") obj.setWorld(this);
    else obj.world = this;
  }

  /**
   * Starts the AI of a given object if available.
   * @param {object} obj - Object with animate() method.
   */
  startAI(obj) {
    if (!obj || obj._aiStarted || typeof obj.animate !== "function") return;
    obj._aiStarted = true;
    obj.animate();
  }

  /** Starts the main game loop and performs collision checks. */
  run() {
    this.interval = setInterval(() => {
      if (!this.running) return;
      this.checkCollisionCoins();
      this.checkCollisionBottles();
      if (this.character?.checkCollisionWithEnemies) this.character.checkCollisionWithEnemies();
      this.handleBossLogic();
    }, 50);
  }

  /** Handles proximity logic for the boss and switches background music. */
  handleBossLogic() {
    if (!this.level.boss) return;
    const boss = this.level.boss;
    const d = Math.abs(this.character.x - boss.x);

    if (d < 600 && !boss.contactWithCharacter) boss.letEndbossTouch();
    if (d >= 800 && boss.contactWithCharacter && !boss.isDead) {
      boss.contactWithCharacter = false;
      SoundManager.stopBackground();
      SoundManager.playBackground("music");
    }
  }

  /** Pauses the game loop, animations and all movables. */
  pauseGame() {
    this.running = false;
    this.character.pauseAnimation();
    this.freezeAllMovables();
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = 0;
    }
  }

  /** Resumes the game loop and all animations. */
  resumeGame() {
    this.running = true;
    this.unfreezeAllMovables();
    this.character.resumeAnimation();
    this.draw();
  }

  /** Restarts the game by creating a new world instance. */
  restartGame() {
    clearAllIntervals();
    Object.assign(this, new World(this.canvas, this.keyboard, createLevel1()));
  }

  /**
   * Creates a new set of default enemies.
   * @returns {MovableObject[]} Enemy array.
   */
  createEnemies() {
    return [new Chicken(), new ChickenBig(), new Chickensmall()];
  }

  /** Attempts to throw a bottle if inventory allows. */
  tryThrowObject() {
    if (!this.hasBottles()) return;
    const bottle = this.makeBottleForCharacter();
    this.registerBottleThrow(bottle);
    this.checkBossHit(bottle);
  }

  /** @returns {boolean} True if the character has bottles left. */
  hasBottles() {
    return this.character.collectedBottles > 0;
  }

  /**
   * Creates a new bottle at the character’s position.
   * @returns {ThrowableObjects} New throwable bottle.
   */
  makeBottleForCharacter() {
    const facingLeft = this.character.otherDirection === true;
    const x = this.character.x + (facingLeft ? -20 : 100);
    const y = this.character.y + 100;
    return new ThrowableObjects(x, y, this, facingLeft);
  }

  /**
   * Registers a thrown bottle, updates UI and plays sound.
   * @param {ThrowableObjects} bottle - The thrown bottle.
   */
  registerBottleThrow(bottle) {
    this.throwableObjects.push(bottle);
    SoundManager.playSound("whisleBottle");
    this.character.collectedBottles--;
    this.statusBar.setPersentageBottles(this.character.collectedBottles);
  }

  /**
   * Immediately checks if a thrown bottle hit the boss.
   * @param {ThrowableObjects} bottle - The thrown bottle.
   */
  checkBossHit(bottle) {
    const boss = this.level?.boss;
    if (boss && bottle.isBottleColliding(boss)) boss.hitByBottle();
  }

  /** Checks collisions between character and bottles on the map. */
  checkCollisionBottles() {
    this.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        SoundManager.playSound("collectingBottle");
        this.bottles.splice(index, 1);
        this.character.addBottle();
        this.statusBar.setPersentageBottles(this.character.collectedBottles);
      }
    });
  }

  /** Checks collisions between character and coins. */
  checkCollisionCoins() {
    this.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        SoundManager.playSound("coin");
        this.score++;
        this.statusBar.setPersentageCoins(this.score);
        this.coins.splice(index, 1);
      }
    });
  }

  /** Randomly spawns coins throughout the level. */
  spawnCoins() {
    for (let i = 0; i < 20; i++) {
      const x = 100 + Math.random() * 3000;
      const y = 100 + Math.random() * 150;
      const coin = new Coins();
      coin.x = x;
      coin.y = y;
      this.coins.push(coin);
    }
  }

  /** Randomly spawns bottles throughout the level. */
  spawnBottles() {
    for (let i = 0; i < 10; i++) {
      const x = 1000 + Math.random() * 2000;
      const y = 330;
      const bottle = new Bottle();
      bottle.x = x;
      bottle.y = y;
      this.bottles.push(bottle);
    }
  }

  /** Draws all objects in the world onto the canvas. */
  draw() {
    if (!this.running) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.statusBar.drawStatusBars(this.ctx);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.coins);
    if (this.level.boss) this.addToMap(this.level.boss);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.bottles);
    this.ctx.translate(-this.camera_x, 0);
    this._rafId = requestAnimationFrame(() => this.draw());
  }

  /**
   * Adds a list of drawable objects to the canvas.
   * @param {DrawableObject[]} objects - Objects to render.
   */
  addObjectsToMap(objects) {
    if (!objects || objects.length === 0) return;
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * Adds a single object to the canvas and applies flipping if necessary.
   * @param {DrawableObject} obj - Object to render.
   */
  addToMap(obj) {
    if (!obj) return;
    const isThrowable = obj instanceof ThrowableObjects;
    const needFlip = obj.otherDirection && !isThrowable;
    if (needFlip) this.flipImage(obj);
    else this.ctx.save();
    obj.draw(this.ctx);
    if (needFlip) this.flipImageBack(obj);
    else this.ctx.restore();
  }

  /**
   * Flips an image horizontally before drawing.
   * @param {DrawableObject} obj - Object to flip.
   */
  flipImage(obj) {
    this.ctx.save();
    this.ctx.translate(obj.width, 0);
    this.ctx.scale(-1, 1);
    obj.x = obj.x * -1;
  }

  /**
   * Restores the image orientation after drawing.
   * @param {DrawableObject} obj - Object to restore.
   */
  flipImageBack(obj) {
    obj.x = obj.x * -1;
    this.ctx.restore();
  }

  /** Displays the endscreen with collected statistics. */
  showEndScreen() {
    this.running = false;
    clearAllIntervals();
    const endTime = Date.now();
    const playTimeSec = Math.floor((endTime - this.startTime) / 1000);
    const stats = {
      chickens: Number(this.killedChickens ?? 0),
      chickenBigs: Number(this.killedChickenBigs ?? 0),
      chickenSmalls: Number(this.killedChickenSmalls ?? 0),
      hearts: this.character.energy,
      coins: this.score,
      time: playTimeSec,
    };
    EndScreen.show(stats);
  }

  /** Ends the current level (not yet implemented). */
  completeLevel() {}

  /** Destroys the world and stops character animation. */
  destroy() {
    this.running = false;
    this.character?.pauseAnimation?.();
  }

  /* ===== Helpers for pause/resume functionality ===== */

  /**
   * Collects all movable objects in the world.
   * @returns {MovableObject[]} Array of movable objects.
   */
  getAllMovables() {
    const list = [];
    if (this.character) list.push(this.character);
    if (this.level?.enemies) list.push(...this.level.enemies);
    if (this.level?.boss) list.push(this.level.boss);
    if (this.throwableObjects) list.push(...this.throwableObjects);
    return list;
  }

  /** Freezes all movable objects (stops their motion). */
  freezeAllMovables() {
    this.getAllMovables().forEach((o) => this.freezeMovable(o));
  }

  /** Unfreezes all movable objects and restores their speed. */
  unfreezeAllMovables() {
    this.getAllMovables().forEach((o) => this.unfreezeMovable(o));
    this.recoverZeroSpeeds();
  }

  /**
   * Freezes a single movable object and saves its speed state.
   * @param {MovableObject} o - Object to freeze.
   */
  freezeMovable(o) {
    if (!o) return;
    if (!o.__paused) o.__paused = {};
    if (typeof o.speed === "number" && o.__paused.speed === undefined) o.__paused.speed = o.speed;
    if (typeof o.speedY === "number" && o.__paused.speedY === undefined)
      o.__paused.speedY = o.speedY;
    if (typeof o.vx === "number" && o.__paused.vx === undefined) o.__paused.vx = o.vx;
    if (typeof o.speed === "number") o.speed = 0;
    if (typeof o.speedY === "number") o.speedY = 0;
    if (typeof o.vx === "number") o.vx = 0;
    if (typeof o.pauseAnimation === "function" && o !== this.character) o.pauseAnimation();
  }

  /**
   * Unfreezes a single movable object and restores saved values.
   * @param {MovableObject} o - Object to unfreeze.
   */
  unfreezeMovable(o) {
    if (!o) return;
    const s = o.__paused || {};
    if (typeof o.speed === "number" && s.speed !== undefined) o.speed = s.speed;
    if (typeof o.speedY === "number" && s.speedY !== undefined) o.speedY = s.speedY;
    if (typeof o.vx === "number" && s.vx !== undefined) o.vx = s.vx;
    o.__paused = null;
    if (typeof o.resumeAnimation === "function" && o !== this.character) o.resumeAnimation();
  }

  /** Recovers sensible default speeds if objects resume with speed 0. */
  recoverZeroSpeeds() {
    if (this.character && typeof this.character.speed === "number" && this.character.speed === 0) {
      this.character.speed = 12;
    }
    (this.level?.enemies || []).forEach((e) => {
      if (typeof e.speed === "number" && e.speed === 0 && !e.isDead) {
        if (typeof e.setRandomSpeed === "function") e.setRandomSpeed();
        else e.speed = 0.25;
      }
    });
    const b = this.level?.boss;
    if (b && typeof b.speed === "number" && b.speed === 0 && !b.isDead) b.speed = 0.45;
  }
}
