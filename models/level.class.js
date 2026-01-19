/**
 * Represents a game level with all its entities and assets.
 * Holds references to enemies, background elements, collectibles, and the boss.
 */
class Level {
  /** @type {MovableObject[]} All enemies in the level. */
  enemies;

  /** @type {Cloud[]} Clouds in the background of the level. */
  clouds;

  /** @type {BackgroundObject[]} Static background objects (e.g., scenery). */
  backgroundObjects;

  /** @type {number} X-axis position where the level ends. */
  level_end_x = 3600;

  /** @type {Coins[]} Collectible coins placed in the level. */
  coins;

  /** @type {Bottle[]} Collectible bottles placed in the level. */
  bottles;

  /** @type {Endboss} The level’s boss enemy. */
  boss;

  /** @type {World} Reference to the world this level belongs to. */
  world;

  /**
   * Creates a new Level instance with the provided assets.
   * @param {MovableObject[]} enemies - Enemies present in the level.
   * @param {Cloud[]} clouds - Clouds in the background.
   * @param {BackgroundObject[]} backgroundObjects - Static background objects.
   * @param {Coins[]} coins - Collectible coins.
   * @param {Bottle[]} bottles - Collectible bottles.
   * @param {Endboss} boss - The level’s endboss.
   */
  constructor(enemies, clouds, backgroundObjects, coins, bottles, boss) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
    this.boss = boss;
  }
}
