/** 
 * Manages the game over overlay (formerly restartPrompt).
 * Encapsulates visibility state, keyboard handling and button wiring.
 */
class GameOverScreen {
  /**
   * Shows the game over overlay and binds inputs.
   * Pauses the world defensively if still running.
   */
  static show() {
    const overlay = document.getElementById("restartPrompt");
    if (!overlay) return;

    overlay.classList.remove("is-hidden");
    GameOverScreen._visible = true;

    if (typeof updateUiVisibility === "function") updateUiVisibility();

    if (typeof world !== "undefined" && world && world.running) {
        try { world.pauseGame(); } catch (_) {}
    }

    GameOverScreen.bindKeys();
    GameOverScreen.bindButtons();
  }

  /**
   * Hides the overlay and removes keyboard handler.
   */
  static hide() {
    const overlay = document.getElementById("restartPrompt");
    if (!overlay) return;

    overlay.classList.add("is-hidden");
    GameOverScreen._visible = false;

    if (typeof updateUiVisibility === "function") updateUiVisibility();

    document.removeEventListener("keydown", GameOverScreen.handleKeyEvent);
  }

  /**
   * Returns whether the game over screen is visible.
   * @returns {boolean} True if visible, otherwise false.
   */
  static isVisible() {
    return !!GameOverScreen._visible;
  }

  /**
   * Binds J/N key handling idempotently.
   */
  static bindKeys() {
    document.removeEventListener("keydown", GameOverScreen.handleKeyEvent);
    document.addEventListener("keydown", GameOverScreen.handleKeyEvent);
  }

  /**
   * Handles J/N for restart or back to start.
   * @param {KeyboardEvent} e - The keyboard event.
   */
  static handleKeyEvent(e) {
    if (!GameOverScreen.isVisible()) return;

    e.preventDefault();
    e.stopPropagation();

    const key = (e.key || "").toLowerCase();
    if (key === "j") {
      GameOverScreen.restart();
    } else if (key === "n") {
      GameOverScreen.backToStart();
    }
  }

  /**
   * Restarts the game from level 1.
   */
  static restart() {
    GameOverScreen.hide();
    try { init(createLevel1()); } catch (_) { location.reload(); }
    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  /**
   * Returns to the start screen.
   */
  static backToStart() {
    GameOverScreen.hide();
    returnToStart();
    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  /**
   * Wires buttons once; calls actions directly (no synthetic keyboard events).
   */
  static bindButtons() {
    const overlay = document.getElementById("restartPrompt");
    if (!overlay) return;
    if (overlay._goBound) return;

    const buttons = overlay.querySelectorAll(".restart-btn");
    buttons.forEach((btn) => {
      const run = () => {
        const key = (btn.textContent || "").trim().toLowerCase();
        if (key === "j") GameOverScreen.restart();
        if (key === "n") GameOverScreen.backToStart();
      };

      btn.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); run(); });
      btn.addEventListener("touchend", (e) => { e.preventDefault(); e.stopPropagation(); run(); }, { passive: false });
    });

    overlay._goBound = true;
  }
}

/* Initialise visibility flag. */
GameOverScreen._visible = false;
