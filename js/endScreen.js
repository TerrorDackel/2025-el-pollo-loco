/**
 * Handles the victory/end screen overlay: shows stats and wires back/restart buttons.
 * Stats and labels use the current i18n language when available.
 */
class EndScreen {
  /**
   * Wires back and restart buttons once when DOM is ready. No dynamic DOM creation.
   */
  static init() {
    const back = document.getElementById("btn-end-back");
    const restart = document.getElementById("btn-end-restart");
    if (back) back.addEventListener("click", () => EndScreen.goToStart());
    if (restart) restart.addEventListener("click", () => EndScreen.restartGame());
  }

  /**
   * Shows the end screen overlay and fills stat placeholders from the given stats.
   * Uses window.t (i18n) for labels when available.
   * @param {Object} stats - Game statistics to display.
   * @param {number} stats.chickens - Normal chickens defeated.
   * @param {number} stats.chickenBigs - Big chickens defeated.
   * @param {number} stats.chickenSmalls - Small chickens defeated.
   * @param {number} stats.hearts - Remaining hearts (energy).
   * @param {number} stats.coins - Coins collected.
   * @param {number} stats.time - Total play time in seconds.
   */
  static show(stats) {
    const overlay = document.getElementById("endscreenOverlay");
    overlay.classList.remove("overlay-hidden");
    if (typeof updateUiVisibility === "function") updateUiVisibility();

    /* Update stats (use t() from i18n when available) */
    const t = typeof window !== "undefined" && window.t ? window.t : (k) => k;
    document.getElementById("stat-chickens").textContent = `${t("stat_chickens")} ${stats.chickens}`;
    document.getElementById("stat-chickenBigs").textContent =
      `${t("stat_chickenBigs")} ${stats.chickenBigs}`;
    document.getElementById("stat-chickenSmalls").textContent =
      `${t("stat_chickenSmalls")} ${stats.chickenSmalls}`;
    document.getElementById("stat-hearts").textContent = `${t("stat_hearts")} ${stats.hearts}`;
    document.getElementById("stat-coins").textContent = `${t("stat_coins")} ${stats.coins}`;
    document.getElementById("stat-time").textContent = t("stat_time").replace("%s", stats.time);
  }

  /**
   * Deprecated; kept for compatibility. Static buttons are wired in init().
   */
  static backBtn() {
    /* no-op */
  }

  /**
   * Hides the end screen and shows the start screen again.
   */
  static goToStart() {
    const startScreen = document.getElementById("startScreen");
    if (startScreen) startScreen.classList.remove("overlay-hidden");
    const endScreen = document.getElementById("endscreenOverlay");
    if (endScreen) endScreen.classList.add("overlay-hidden");
    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  /**
   * Hides the end screen, clears intervals, and restarts level 1 (no page reload).
   */
  static restartGame() {
    const endScreen = document.getElementById("endscreenOverlay");
    if (endScreen) endScreen.classList.add("overlay-hidden");
    clearAllIntervals();
    init(createLevel1());
    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }
}
