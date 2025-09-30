/**
 * Central game world containing character, enemies, items and logic.
 * Responsible for collisions, rendering, animations and main game loop.
 */
class World {
    /** @type {Character} Main player character. */
    character = new Character();

    /** @type {Level} Current level instance. */
    level = level1;

    /** @type {HTMLCanvasElement} Rendering surface. */
    canvas;

    /** @type {CanvasRenderingContext2D} 2D rendering context. */
    ctx;

    /** @type {Keyboard} Keyboard input handler. */
    keyboard;

    /** @type {number} Camera offset along the x-axis. */
    camera_x = 0;

    /** @type {StatusBar} Status bar for health, coins and bottles. */
    statusBar = new StatusBar();

    /** @type {ThrowableObjects[]} Active thrown bottles. */
    throwableObjects = [];

    /** @type {boolean} Running state of the game loop. */
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

    /** @type {number} Timestamp when the game started (ms). */
    startTime = Date.now();

    /** @type {number} requestAnimationFrame id */
    _rafId = 0;

    /**
     * Initializes the game world with canvas and keyboard input.
     * @param {HTMLCanvasElement} canvas - Rendering surface.
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
        if (!SoundManager.isMuted) {
            SoundManager.playBackground("music");
        }
    }
    
    /** Links world with character and all enemies. */
    setWorld() {
        this.linkCharacter();
        this.cacheEnemies();
        this.enemies.forEach(e => this.attachWorld(e));
        this.attachWorld(this.level?.boss);
        this.enemies.forEach(e => this.startAI(e));
        this.startAI(this.level?.boss);
    }

    /** Assigns this world to the character. */
    linkCharacter() { this.character.world = this; }

    /** Caches enemies array from level. */
    cacheEnemies() { this.enemies = this.level?.enemies || []; }

    /** Attaches world to an actor (enemy/boss). */
    attachWorld(obj) {
        if (!obj) return;
        if (typeof obj.setWorld === "function") obj.setWorld(this);
        else obj.world = this;
    }

    /** Starts an actor’s AI once. */
    startAI(obj) {
        if (!obj || obj._aiStarted || typeof obj.animate !== "function") return;
        obj._aiStarted = true;
        obj.animate();
    }


    /** Starts the main game loop with collision checks. */
    run() {
        this.interval = setInterval(() => {
            if (!this.running) return;
            this.checkCollisionCoins();
            this.checkCollisionBottles();
            if (this.character?.checkCollisionWithEnemies) {
                this.character.checkCollisionWithEnemies();
            }
            this.handleBossLogic();
        }, 50);
    }

    /** Handles boss proximity logic and music switching. */
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

    /** Pauses all game updates. */
    pauseGame() {
        this.running = false;
        this.character.pauseAnimation();
        this.freezeAllMovables();
        if (this._rafId) { cancelAnimationFrame(this._rafId); this._rafId = 0; }
    }

    /** Resumes game updates. */
    resumeGame() {
        this.running = true;
        this.unfreezeAllMovables();
        this.character.resumeAnimation();
        this.draw();
    }

    /** Restarts the game by reinitializing world. */
    restartGame() {
        clearAllIntervals();
        Object.assign(this, new World(this.canvas, this.keyboard, createLevel1()));
    }

    /**
     * Creates enemies for the level.
     * @returns {MovableObject[]} Enemy array.
     */
    createEnemies() {
        return [new Chicken(), new ChickenBig(), new Chickensmall()];
    }


    /** Tries to throw a bottle if inventory allows. */
    tryThrowObject() {
        if (!this.hasBottles()) return;
        const bottle = this.makeBottleForCharacter();
        this.registerBottleThrow(bottle);
        this.checkBossHit(bottle);
    }

    /** Returns whether the character has bottles to throw. */
    hasBottles() { return this.character.collectedBottles > 0; }

    /** Creates a bottle at the character’s hand with correct direction. */
    makeBottleForCharacter() {
        const facingLeft = this.character.otherDirection === true;
        const x = this.character.x + (facingLeft ? -20 : 100);
        const y = this.character.y + 100;
        return new ThrowableObjects(x, y, this, facingLeft);
    }

    /** Adds the bottle to world and updates sound and UI. */
    registerBottleThrow(bottle) {
        this.throwableObjects.push(bottle);
        SoundManager.playSound("whisleBottle");
        this.character.collectedBottles--;
        this.statusBar.setPersentageBottles(this.character.collectedBottles);
    }

    /** Checks immediate bottle hit against the boss. */
    checkBossHit(bottle) {
        const boss = this.level?.boss;
        if (boss && bottle.isBottleColliding(boss)) boss.hitByBottle();
    }


    /** Checks collisions between character and bottles. */
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

    /** Spawns random coins in the level. */
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

    /** Spawns random bottles in the level. */
    spawnBottles() {
        for (let i = 0; i < 10; i++) {
            const x = 1000 + Math.random() * 2000;
            const y = 300;
            const bottle = new Bottle();
            bottle.x = x;
            bottle.y = y;
            this.bottles.push(bottle);
        }
    }

    /** Draws all objects in the world. */
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
     * Adds an array of objects to the map.
     * @param {DrawableObject[]} objects - Objects to render.
     */
    addObjectsToMap(objects) {
        if (!objects || objects.length === 0) return;
        objects.forEach((o) => this.addToMap(o));
    }

    /**
     * Adds a single object to the map with flipping if needed.
     * @param {DrawableObject} obj - Object to render.
     */
    addToMap(obj) {
        if (!obj) return;
        const isThrowable = obj instanceof ThrowableObjects;
        const needFlip = obj.otherDirection && !isThrowable;
        if (needFlip) this.flipImage(obj); else this.ctx.save();
        obj.draw(this.ctx);
        if (obj.drawFrame) obj.drawFrame(this.ctx);
        if (needFlip) this.flipImageBack(obj); else this.ctx.restore();
    }

    /**
     * Flips image horizontally for rendering.
     * @param {DrawableObject} obj - Object to flip.
     */
    flipImage(obj) {
        this.ctx.save();
        this.ctx.translate(obj.width, 0);
        this.ctx.scale(-1, 1);
        obj.x = obj.x * -1;
    }

    /**
     * Restores image orientation after flip.
     * @param {DrawableObject} obj - Object to restore.
     */
    flipImageBack(obj) {
        obj.x = obj.x * -1;
        this.ctx.restore();
    }

    /**
     * Shows the endscreen overlay with stats after boss death.
     * Uses data gathered during the run (time, coins, hearts, kills).
     */
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
            time: playTimeSec
        };

        EndScreen.show(stats);
    }

    completeLevel() {}
    destroy() { this.running = false; this.character?.pauseAnimation?.(); }

    /* ===== Pause helpers ===== */

    getAllMovables() {
        const list = [];
        if (this.character) list.push(this.character);
        if (this.level?.enemies) list.push(...this.level.enemies);
        if (this.level?.boss) list.push(this.level.boss);
        if (this.throwableObjects) list.push(...this.throwableObjects);
        if (this.level?.clouds) list.push(...this.level.clouds);
        return list;
    }

    freezeAllMovables() { this.getAllMovables().forEach(o => this.freezeMovable(o)); }

    unfreezeAllMovables() {
        this.getAllMovables().forEach(o => this.unfreezeMovable(o));
        this.recoverZeroSpeeds(); // Fallbacks, falls keine Sicherung existierte
    }

    freezeMovable(o) {
        if (!o) return;
        if (!o.__paused) o.__paused = {};
        if (typeof o.speed === "number" && o.__paused.speed === undefined) o.__paused.speed = o.speed;
        if (typeof o.speedY === "number" && o.__paused.speedY === undefined) o.__paused.speedY = o.speedY;
        if (typeof o.vx === "number" && o.__paused.vx === undefined) o.__paused.vx = o.vx;
        if (typeof o.speed === "number") o.speed = 0;
        if (typeof o.speedY === "number") o.speedY = 0;
        if (typeof o.vx === "number") o.vx = 0;
        if (typeof o.pauseAnimation === "function" && o !== this.character) o.pauseAnimation();
    }

    unfreezeMovable(o) {
        if (!o) return;
        const s = o.__paused || {};
        if (typeof o.speed === "number" && s.speed !== undefined) o.speed = s.speed;
        if (typeof o.speedY === "number" && s.speedY !== undefined) o.speedY = s.speedY;
        if (typeof o.vx === "number" && s.vx !== undefined) o.vx = s.vx;
        o.__paused = null;
        if (typeof o.resumeAnimation === "function" && o !== this.character) o.resumeAnimation();
    }

    /** Setzt sinnvolle Defaults, falls speed nach dem Auftauen 0 geblieben ist. */
    recoverZeroSpeeds() {
        if (this.character && typeof this.character.speed === "number" && this.character.speed === 0) {
            this.character.speed = 12;
        }
        (this.level?.enemies || []).forEach(e => {
            if (typeof e.speed === "number" && e.speed === 0 && !e.isDead) {
                if (typeof e.setRandomSpeed === "function") e.setRandomSpeed();
                else e.speed = 0.25;
            }
        });
        const b = this.level?.boss;
        if (b && typeof b.speed === "number" && b.speed === 0 && !b.isDead) b.speed = 0.45;
    }
}
