/**
 * Creates Level 1 with predefined enemies, clouds, background objects and endboss.
 * Coins and bottles start empty and will be spawned later in the game.
 * @returns {Level} Level 1 instance
 */
function createLevel1() {
    return new Level(
        createEnemies(),
        createClouds(),
        createBackgroundObjects(),
        [], // Coins: none at start
        [], // Bottles: none at start
        new Endboss()
    );
}

/**
 * Provides the enemy lineup for Level 1.
 * @returns {(Chicken|Chickensmall|ChickenBig)[]} Enemy instances
 */
function createEnemies() {
    return [
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
}

/**
 * Provides the clouds for Level 1.
 * @returns {Cloud[]} Cloud instances
 */
function createClouds() {
    return [new Cloud(), new Cloud(), new Cloud(), new Cloud()];
}

/**
 * Provides the background objects for Level 1.
 * Explicitly listed for full control and clarity.
 * @returns {BackgroundObject[]} Background elements
 */
function createBackgroundObjects() {
    return [
        new BackgroundObject("./imgs/5_background/layers/air.png", -100, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/1.png", -100, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/1.png", -100, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/1.png", -100, -300, 800, 720),

        new BackgroundObject("./imgs/5_background/layers/air.png", 619, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/2.png", 619, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/2.png", 619, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/2.png", 619, -300, 800, 720),

        new BackgroundObject("./imgs/5_background/layers/air.png", 619 + 720, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/1.png", 619 + 720, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/1.png", 619 + 720, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/1.png", 619 + 720, -300, 800, 720),

        new BackgroundObject("./imgs/5_background/layers/air.png", 619 + 720 * 2, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/2.png", 619 + 720 * 2, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/2.png", 619 + 720 * 2, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/2.png", 619 + 720 * 2, -300, 800, 720),

        new BackgroundObject("./imgs/5_background/layers/air.png", 619 + 720 * 3, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/1.png", 619 + 720 * 3, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/1.png", 619 + 720 * 3, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/1.png", 619 + 720 * 3, -300, 800, 720),

        new BackgroundObject("./imgs/5_background/layers/air.png", 619 + 720 * 4, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/2.png", 619 + 720 * 4, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/2.png", 619 + 720 * 4, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/2.png", 619 + 720 * 4, -300, 800, 720)
    ];
}

/**
 * Exposes Level 1 as a global constant.
 * This keeps compatibility with existing game code.
 * @type {Level}
 */
const level1 = createLevel1();
