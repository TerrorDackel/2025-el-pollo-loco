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

    /**
     * Initializes the game world with canvas and keyboard input.
     * @param {HTMLCanvasElement} canvas - Rendering surface.
     * @param {Keyboard} keyboard - Keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.statusBar = new StatusBar();
        this.level = level1;
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
        this.character.world = this;
        this.enemies = this.level.enemies;

        this.enemies.forEach(e => {
            e.setWorld?.(this);
            if (!e._aiStarted && typeof e.animate === "function") {
                e._aiStarted = true;
                e.animate();
            }
        });

        if (this.level.boss) {
            const b = this.level.boss;
            b.setWorld(this);
            if (!b._aiStarted && typeof b.animate === "function") {
                b._aiStarted = true;
                b.animate();
            }
        }
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

        if (d < 600 && !boss.contactWithCharacter) {
            boss.letEndbossTouch();
        }

        if (d >= 800 && boss.contactWithCharacter && !boss.isDead) {
            boss.contactWithCharacter = false;
            SoundManager.stopBackground();
            SoundManager.playBackground("music");
        }
    }

    /** Pauses all game updates and animations. */
    pauseGame() {
        this.running = false;
        this.character.pauseAnimation();
    }

    /** Resumes game updates and animations. */
    resumeGame() {
        this.running = true;
        this.character.resumeAnimation();
        this.draw();
    }

    /** Restarts the game by reinitializing the world. */
    restartGame() {
        clearAllIntervals();
        Object.assign(this, new World(this.canvas, this.keyboard));
    }

    /**
     * Creates default enemies for the level.
     * @returns {MovableObject[]} Array of enemy instances.
     */
    createEnemies() {
        return [new Chicken(), new ChickenBig(), new Chickensmall()];
    }

    /** Throws a bottle if available in the inventory. */
    tryThrowObject() {
        if (this.character.collectedBottles <= 0) return;

        const facingLeft = this.character.otherDirection === true;
        const offsetX = facingLeft ? -20 : 100;
        const offsetY = 100;
        let bottle = new ThrowableObjects(
            this.character.x + offsetX,
            this.character.y + offsetY,
            this,
            facingLeft
        );
        this.throwableObjects.push(bottle);
        SoundManager.playSound("whisleBottle");
        this.character.collectedBottles--;
        this.statusBar.setPersentageBottles(this.character.collectedBottles);

        if (this.level.boss && bottle.isBottleColliding(this.level.boss)) {
            this.level.boss.hitByBottle();
        }
    }

    /** Checks collisions between character and collectible bottles. */
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

    /** Checks collisions between character and collectible coins. */
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

    /** Spawns random coins across the level. */
    spawnCoins() {
        for (let i = 0; i < 20; i++) {
            let x = 100 + Math.random() * 3000;
            let y = 100 + Math.random() * 150;
            let coin = new Coins();
            coin.x = x;
            coin.y = y;
            this.coins.push(coin);
        }
    }

    /** Spawns random bottles across the level. */
    spawnBottles() {
        for (let i = 0; i < 10; i++) {
            let x = 1000 + Math.random() * 2000;
            let y = 300;
            let bottle = new Bottle();
            bottle.x = x;
            bottle.y = y;
            this.bottles.push(bottle);
        }
    }

    /** Draws all objects in the world recursively. */
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

        /* Thrown bottles render after boss → on top */
        this.addObjectsToMap(this.throwableObjects);

        this.addObjectsToMap(this.bottles);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Adds an array of drawable objects to the canvas.
     * @param {DrawableObject[]} objects - Objects to render.
     */
    addObjectsToMap(objects) {
        if (!objects || objects.length === 0) return;
        objects.forEach((o) => this.addToMap(o));
    }

    /**
     * Adds a single object to the canvas with optional flipping.
     * @param {DrawableObject} obj - Object to render.
     */
    addToMap(obj) {
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
     * Restores image orientation after flipping.
     * @param {DrawableObject} obj - Object to restore.
     */
    flipImageBack(obj) {
        obj.x = obj.x * -1;
        this.ctx.restore();
    }
}
