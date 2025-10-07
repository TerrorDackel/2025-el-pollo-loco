/**
 * Creates Level 1 with predefined enemies, clouds, background objects and endboss.
 * Coins and bottles start empty and will be spawned later in the game.
 * @returns {Level} Level 1 instance
 */
function createLevel1() {
    const enemies = createEnemies();
    const clouds = createClouds();
    const bgObjects = createBackgroundObjects();
    const coins = [];
    const bottles = [];
    const boss = new Endboss();

    return new Level(enemies, clouds, bgObjects, coins, bottles, boss);
}

/**
 * Provides the enemy lineup for Level 1.
 * @returns {(Chicken|Chickensmall|ChickenBig)[]} Enemy instances
 */
function createEnemies() {
    const enemies = [
        new Chicken(),
        new Chicken(),
        new Chickensmall(),
        new Chicken(),
        new Chicken(),
        new Chickensmall(),
        new Chicken(),
        new ChickenBig(),
        new Chicken(),
        new Chicken()
    ];
    return enemies;
}

/**
 * Provides the clouds for Level 1.
 * @returns {Cloud[]} Cloud instances
 */
function createClouds() {
    const clouds = [new Cloud(), new Cloud(), new Cloud(), new Cloud()];
    return clouds;
}

/**
 * Provides the background objects for Level 1.
 * Explicitly listed for full control and clarity.
 * @returns {BackgroundObject[]} Background elements
 */
function createBackgroundObjects() {

    const bg = [
        new BackgroundObject("./imgs/5_background/layers/air.png", -100, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/1.png", -100, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/1.png", -100, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/1.png", -100, -300, 800, 720),

        new BackgroundObject("./imgs/5_background/layers/air.png", 620, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/2.png", 620, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/2.png", 620, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/2.png", 620, -300, 800, 720),

        new BackgroundObject("./imgs/5_background/layers/air.png", 620 + 720, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/1.png", 620 + 720, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/1.png", 620 + 720, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/1.png", 620 + 720, -300, 800, 720),

        new BackgroundObject("./imgs/5_background/layers/air.png", 620 + 720 * 2, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/2.png", 620 + 720 * 2, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/2.png", 620 + 720 * 2, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/2.png", 620 + 720 * 2, -300, 800, 720),

        new BackgroundObject("./imgs/5_background/layers/air.png", 620 + 720 * 3, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/1.png", 620 + 720 * 3, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/1.png", 620 + 720 * 3, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/1.png", 620 + 720 * 3, -300, 800, 720),

        new BackgroundObject("./imgs/5_background/layers/air.png", 620 + 720 * 4, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/2.png", 620 + 720 * 4, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/2.png", 620 + 720 * 4, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/2.png", 620 + 720 * 4, -300, 800, 720)
    ];
    return bg;
}

/**
 * Exposes Level 1 as a global constant.
 * This keeps compatibility with existing game code.
 * @type {Level}
 */
const level1 = createLevel1();
