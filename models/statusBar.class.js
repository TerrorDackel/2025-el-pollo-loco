/**
 * Represents the status bar of the game, displaying health, coins, bottles and endboss health.
 * Extends {@link DrawableObject} so it can be drawn on the canvas.
 */
class StatusBar extends DrawableObject {
  /** @type {string[]} Image set for player health (0–100%). */
  IMAGES_HEALTHBAR = [
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
  ];

  /** @type {string[]} Image set for collected coins (0–100%). */
  IMAGES_COINSBAR = [
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png"
  ];

  /** @type {string[]} Image set for collected bottles (0–100%). */
  IMAGES_BOTTLESBAR = [
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png"
  ];

  /** @type {string[]} Image set for endboss health (0–100%). */
  IMAGES_ENDBOSSBAR = [
    "./imgs/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "./imgs/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "./imgs/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "./imgs/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "./imgs/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "./imgs/7_statusbars/2_statusbar_endboss/blue/blue100.png"
  ];

  /** @type {number} Current player health (0–5 hearts). */
  persentageHealth = 5;

  /** @type {number} Current collected coins (0–5). */
  amountCoins = 0;

  /** @type {number} Current collected bottles (0–10). */
  amountBottles = 0;

  /** @type {number} Maximum bottle capacity (default 10). */
  maxBottles = 10;

  /** @type {number} Current endboss health (0–5 hearts). */
  endbossHealth = 5;

  /** @type {Record<string,HTMLImageElement>} Cache for health images. */
  imageCacheHealth = {};

  /** @type {Record<string,HTMLImageElement>} Cache for coin images. */
  imageCacheCoins = {};

  /** @type {Record<string,HTMLImageElement>} Cache for bottle images. */
  imageCacheBottles = {};

  /** @type {Record<string,HTMLImageElement>} Cache for endboss images. */
  imageCacheEndboss = {};

  /**
   * Creates a new StatusBar instance and loads all status bar images.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTHBAR, "health");
    this.loadImages(this.IMAGES_COINSBAR, "coins");
    this.loadImages(this.IMAGES_BOTTLESBAR, "bottles");
    this.loadImages(this.IMAGES_ENDBOSSBAR, "endboss");
    this.x = 30;
    this.y = 0;
    this.height = 50;
    this.width = 155;
    this.setPersentageHealth(5);
    this.setPersentageCoins(0);
    this.setPersentageBottles(0);
    this.setPersentageEndboss(5);
  }

  /**
   * Loads a set of images into the cache based on category.
   * @param {string[]} imageArray - Array of image paths.
   * @param {"health"|"coins"|"bottles"|"endboss"} category - Target cache.
   */
  loadImages(imageArray, category) {
    imageArray.forEach((path) => {
      const img = new Image();
      img.src = path;
      if (category === "health") this.imageCacheHealth[path] = img;
      if (category === "coins") this.imageCacheCoins[path] = img;
      if (category === "bottles") this.imageCacheBottles[path] = img;
      if (category === "endboss") this.imageCacheEndboss[path] = img;
    });
  }

  /**
   * Draws all status bars (health, coins, bottles, endboss) on the canvas.
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   */
  drawStatusBars(ctx) {
    this.drawBar(ctx, this.imgHealth, this.x, this.y);
    this.drawBar(ctx, this.imgCoins, this.x + 1.15 * this.width, this.y);
    this.drawBar(ctx, this.imgBottles, this.x + 2.25 * this.width, this.y);
    this.drawBar(ctx, this.imgEndboss, this.x + 3.35 * this.width, this.y);
  }

  /**
   * Draws a single bar image on the canvas.
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   * @param {HTMLImageElement} img - Bar image.
   * @param {number} x - X position.
   * @param {number} y - Y position.
   */
  drawBar(ctx, img, x, y) {
    ctx.drawImage(img, x, y, this.width, this.height);
  }

  /**
   * Updates health bar according to current hearts (0–5).
   * @param {number} persentageHealth - Player health.
   */
  setPersentageHealth(persentageHealth) {
    this.persentageHealth = persentageHealth;
    const index = this.resolveIndex(persentageHealth);
    this.imgHealth = this.imageCacheHealth[this.IMAGES_HEALTHBAR[index]];
  }

  /**
   * Updates coin bar according to collected coins (0–5).
   * @param {number} amountCoins - Number of coins.
   */
  setPersentageCoins(amountCoins) {
    this.amountCoins = amountCoins;
    const index = this.resolveIndex(Math.floor(amountCoins / 4));
    this.imgCoins = this.imageCacheCoins[this.IMAGES_COINSBAR[index]];
  }

  /**
   * Updates bottle bar according to collected bottles (0–5).
   * @param {number} amountBottles - Number of bottles.
   */
  setPersentageBottles(amountBottles) {
    this.amountBottles = amountBottles;
    const fraction = Math.min(amountBottles / this.maxBottles, 1);
    let index;
    if (fraction >= 1) index = 5;
    else if (fraction >= 0.8) index = 4;
    else if (fraction >= 0.6) index = 3;
    else if (fraction >= 0.4) index = 2;
    else if (fraction >= 0.2) index = 1;
    else index = 0;
    this.imgBottles = this.imageCacheBottles[this.IMAGES_BOTTLESBAR[index]];
  }

  /**
   * Sets bottle capacity for this level.
   * @param {number} max - Max bottles available in level.
   */
  setBottleCapacity(max) {
    this.maxBottles = max;
  }

  /**
   * Updates endboss bar according to current hearts (0–5).
   * @param {number} hearts - Endboss health.
   */
  setPersentageEndboss(hearts) {
    this.endbossHealth = hearts;
    this.imgEndboss = this.imageCacheEndboss[this.IMAGES_ENDBOSSBAR[hearts]];
  }

  /**
   * Resolves a numeric value (0–5) into the correct image index.
   * @param {number} value - Input value.
   * @returns {number} Index for image arrays (0–5).
   */
  resolveIndex(value) {
    if (value >= 5) return 5;
    if (value >= 4) return 4;
    if (value >= 3) return 3;
    if (value >= 2) return 2;
    if (value >= 1) return 1;
    return 0;
  }
}
