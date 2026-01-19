/**
 * Handles the pause overlay and countdown logic.
 * Provides methods to show, hide and update the pause screen.
 */
class PauseScreen {
  /**
   * Displays the pause overlay.
   * Clears residual countdown text.
   */
  static showOverlay() {
    const overlay = document.getElementById("pauseOverlay");
    if (!overlay) return;
    overlay.classList.remove("pause-overlay-hidden");
    const el = document.getElementById("pauseCountdown");
    if (el) el.innerText = "";
  }

  /**
   * Starts the countdown to resume the game.
   * Counts from 5 to "GO!" within ~2 seconds (400 ms per step).
   * Hides the resume button during the countdown for mobile safety.
   * @param {Function} onFinish - Callback executed once the countdown completes.
   */
  static showCountdown(onFinish) {
    const el = document.getElementById("pauseCountdown");
    const btn = document.querySelector(".back-to-game-btn");
    if (!el || !btn) return;

    btn.style.display = "none";

    let count = 5;
    el.innerText = count;

    const it = setInterval(() => {
      count--;
      if (count > 0) { el.innerText = count; return; }
      if (count === 0) { el.innerText = "GO!"; return; }
      clearInterval(it);
      btn.style.display = "inline-block";
      if (typeof onFinish === "function") onFinish();
  }, 400);
  }

  /**
   * Hides the pause overlay and clears countdown text.
   */
  static clearOverlay() {
    const overlay = document.getElementById("pauseOverlay");
    if (!overlay) return;
    overlay.classList.add("pause-overlay-hidden");
    const el = document.getElementById("pauseCountdown");
    if (el) el.innerText = "";
  }

  /**
   * Returns the resume button element if available.
   * @returns {HTMLButtonElement|null} The resume button or null.
   */
  static getResumeButton() {
    return document.querySelector(".back-to-game-btn") || null;
  }

  /**
   * Registers the button click handler for mobile usage.
   * Simulates pressing the "p" key to resume via keyboard path.
   */
  static initButtonHandler() {
    const btn = PauseScreen.getResumeButton();
    if (!btn) return;
    btn.addEventListener("click", () => {
      if (typeof togglePause === "function") togglePause();
    });
  }
}

/* Initialise mobile resume button once DOM is ready. */
document.addEventListener("DOMContentLoaded", () => {
  PauseScreen.initButtonHandler();
});
