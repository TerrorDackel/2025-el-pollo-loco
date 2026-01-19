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
    const key = e.key.toLowerCase();
    if (key === "j") {
      GameOverScreen.hide();
      try { init(createLevel1()); } catch (_) { location.reload(); }
    } else if (key === "n") {
      GameOverScreen.hide();
      returnToStart();
    }
  }

  /**
   * Wires buttons once; converts clicks to keyboard events.
   */
  static bindButtons() {
    const overlay = document.getElementById("restartPrompt");
    if (!overlay) return;
    if (overlay._goBound) return;

    const buttons = overlay.querySelectorAll(".restart-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.textContent.trim().toLowerCase(); // "j" or "n"
        document.dispatchEvent(new KeyboardEvent("keydown", { key }));
      });
    });

    overlay._goBound = true;
  }
}

/* Initialise visibility flag. */
GameOverScreen._visible = false;
