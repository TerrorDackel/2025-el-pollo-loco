/**
 * Preloads core image assets (sprites) before the game starts.
 * Ensures that first-time animations (z. B. erste Flasche) nicht „unsichtbar“ sind.
 */
class AssetLoader {
  /** @type {Promise<void> | null} */
  static _corePromise = null;

  /**
   * Preloads all given image paths once.
   * @param {string[]} paths
   * @returns {Promise<void>}
   */
  static preloadImages(paths) {
    const unique = [...new Set(paths)];
    const jobs = unique.map(
      (path) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = path;
        })
    );
    return Promise.all(jobs).then(() => {});
  }

  /**
   * Preloads all zentralen Spiel-Sprites (Charakter, Gegner, Flaschen, Coins).
   * Idempotent: bei Mehrfachaufruf wird immer dieselbe Promise verwendet.
   * @returns {Promise<void>}
   */
  static preloadCoreAssets() {
    if (this._corePromise) return this._corePromise;

    const characterImages = [
      "./imgs/2_character_pepe/1_idle/idle/I-1.png",
      "./imgs/2_character_pepe/1_idle/idle/I-2.png",
      "./imgs/2_character_pepe/1_idle/idle/I-3.png",
      "./imgs/2_character_pepe/1_idle/idle/I-4.png",
      "./imgs/2_character_pepe/1_idle/idle/I-5.png",
      "./imgs/2_character_pepe/1_idle/idle/I-6.png",
      "./imgs/2_character_pepe/1_idle/idle/I-7.png",
      "./imgs/2_character_pepe/1_idle/idle/I-8.png",
      "./imgs/2_character_pepe/1_idle/idle/I-9.png",
      "./imgs/2_character_pepe/1_idle/idle/I-10.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-11.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-12.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-13.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-14.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-15.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-16.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-17.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-18.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-19.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-20.png",
      "./imgs/2_character_pepe/2_walk/W-21.png",
      "./imgs/2_character_pepe/2_walk/W-22.png",
      "./imgs/2_character_pepe/2_walk/W-23.png",
      "./imgs/2_character_pepe/2_walk/W-24.png",
      "./imgs/2_character_pepe/2_walk/W-25.png",
      "./imgs/2_character_pepe/2_walk/W-26.png",
      "./imgs/2_character_pepe/3_jump/J-31.png",
      "./imgs/2_character_pepe/3_jump/J-32.png",
      "./imgs/2_character_pepe/3_jump/J-33.png",
      "./imgs/2_character_pepe/3_jump/J-34.png",
      "./imgs/2_character_pepe/3_jump/J-35.png",
      "./imgs/2_character_pepe/3_jump/J-36.png",
      "./imgs/2_character_pepe/3_jump/J-37.png",
      "./imgs/2_character_pepe/3_jump/J-38.png",
      "./imgs/2_character_pepe/3_jump/J-39.png",
      "./imgs/2_character_pepe/4_hurt/H-41.png",
      "./imgs/2_character_pepe/4_hurt/H-42.png",
      "./imgs/2_character_pepe/4_hurt/H-43.png",
      "./imgs/2_character_pepe/5_dead/D-51.png",
      "./imgs/2_character_pepe/5_dead/D-52.png",
      "./imgs/2_character_pepe/5_dead/D-53.png",
      "./imgs/2_character_pepe/5_dead/D-54.png",
      "./imgs/2_character_pepe/5_dead/D-55.png",
      "./imgs/2_character_pepe/5_dead/D-56.png",
      "./imgs/2_character_pepe/5_dead/D-57.png",
    ];

    const bottleImages = [
      "./imgs/6_salsa_bottle/1_salsa_bottle_on_ground.png",
      "./imgs/6_salsa_bottle/2_salsa_bottle_on_ground.png",
      "./imgs/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
      "./imgs/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
      "./imgs/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
      "./imgs/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    const coinImages = [
      "./imgs/8_coin/Gold_1.png",
      "./imgs/8_coin/Gold_2.png",
      "./imgs/8_coin/Gold_3.png",
      "./imgs/8_coin/Gold_4.png",
      "./imgs/8_coin/Gold_5.png",
      "./imgs/8_coin/Gold_6.png",
      "./imgs/8_coin/Gold_7.png",
      "./imgs/8_coin/Gold_8.png",
      "./imgs/8_coin/Gold_9.png",
      "./imgs/8_coin/Gold_10.png",
    ];

    const chickenImages = [
      "imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "imgs/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "imgs/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
      "./imgs/3_enemies_chicken/chicken_normal/2_dead/dead.png",
      "imgs/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "imgs/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "imgs/3_enemies_chicken/chicken_small/1_walk/3_w.png",
      "./imgs/3_enemies_chicken/chicken_small/2_dead/dead.png",
    ];

    const bigChickenImages = [
      "/imgs/4_enemie_boss_chicken/1_walk/G1.png",
      "/imgs/4_enemie_boss_chicken/1_walk/G2.png",
      "/imgs/4_enemie_boss_chicken/1_walk/G3.png",
      "/imgs/4_enemie_boss_chicken/1_walk/G4.png",
      "imgs/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    const endbossImages = [
      "./imgs/4_enemie_boss_chicken/1_walk/G1.png",
      "./imgs/4_enemie_boss_chicken/1_walk/G2.png",
      "./imgs/4_enemie_boss_chicken/1_walk/G3.png",
      "./imgs/4_enemie_boss_chicken/1_walk/G4.png",
      "./imgs/4_enemie_boss_chicken/4_hurt/G21.png",
      "./imgs/4_enemie_boss_chicken/4_hurt/G22.png",
      "./imgs/4_enemie_boss_chicken/4_hurt/G23.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G5.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G6.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G7.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G8.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G9.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G10.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G11.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G12.png",
      "./imgs/4_enemie_boss_chicken/5_dead/G24.png",
      "./imgs/4_enemie_boss_chicken/5_dead/G25.png",
      "./imgs/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    const all = [
      ...characterImages,
      ...bottleImages,
      ...coinImages,
      ...chickenImages,
      ...bigChickenImages,
      ...endbossImages,
    ];

    this._corePromise = this.preloadImages(all);
    return this._corePromise;
  }
}

/**
 * Globale Hilfsfunktion, damit startScreen.js kein Klassenwissen benötigt.
 * @returns {Promise<void>}
 */
function preloadCoreAssets() {
  return AssetLoader.preloadCoreAssets();
}

