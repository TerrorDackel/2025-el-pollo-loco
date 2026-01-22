/**
 * CancelOverlay shows a confirmation dialog to abort the current run.
 * J = Yes (abort to start), N = No (continue).
 */
class CancelOverlay {
  static _visible = false;

  static show() {
    if (!CancelOverlay.canOpen()) return;

    const overlay = document.getElementById("cancelOverlay");
    if (!overlay) return;

    overlay.classList.remove("is-hidden");
    CancelOverlay._visible = true;

    CancelOverlay.resetMovementFlags();

    if (typeof world !== "undefined" && world && world.running) {
      try { world.pauseGame(); } catch (_) {}
    }

    if (typeof SoundManager !== "undefined") {
      SoundManager.pauseAllSounds();
    }

    CancelOverlay.bindKeys();
    CancelOverlay.bindButtons();

    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  static hide() {
    const overlay = document.getElementById("cancelOverlay");
    if (!overlay) return;

    overlay.classList.add("is-hidden");
    CancelOverlay._visible = false;

    document.removeEventListener("keydown", CancelOverlay.handleKeyEvent);

    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  static isVisible() {
    return !!CancelOverlay._visible;
  }

  static canOpen() {
    if (typeof world === "undefined" || !world) return false;
    if (world.running !== true) return false;
    if (typeof gamePaused !== "undefined" && gamePaused) return false;
    if (typeof countdownActive !== "undefined" && countdownActive) return false;
    if (typeof GameOverScreen !== "undefined" && GameOverScreen.isVisible && GameOverScreen.isVisible()) return false;
    return true;
  }

  static resetMovementFlags() {
    if (typeof keyboard === "undefined" || !keyboard) return;
    keyboard.RIGHT = false;
    keyboard.LEFT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.D = false;
  }

  static bindKeys() {
    document.removeEventListener("keydown", CancelOverlay.handleKeyEvent);
    document.addEventListener("keydown", CancelOverlay.handleKeyEvent);
  }

  static handleKeyEvent(e) {
    if (!CancelOverlay.isVisible()) return;

    e.preventDefault();
    e.stopPropagation();

    const key = (e.key || "").toLowerCase();
    if (key === "j") {
      CancelOverlay.abortToStart();
    } else if (key === "n" || key === "escape") {
      CancelOverlay.continueGame();
    }
  }

  static bindButtons() {
    const overlay = document.getElementById("cancelOverlay");
    if (!overlay) return;
    if (overlay._cancelBound) return;

    const buttons = overlay.querySelectorAll(".cancel-btn");
    buttons.forEach((btn) => {
      const run = () => {
        const key = (btn.textContent || "").trim().toLowerCase();
        if (key === "j") CancelOverlay.abortToStart();
        if (key === "n") CancelOverlay.continueGame();
      };

      btn.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); run(); });
      btn.addEventListener("touchend", (e) => { e.preventDefault(); e.stopPropagation(); run(); }, { passive: false });
    });

    overlay._cancelBound = true;
  }

  static continueGame() {
    CancelOverlay.hide();
    if (typeof world !== "undefined" && world) {
      try { world.resumeGame(); } catch (_) {}
    }
    if (typeof resumeAudioForWorld === "function") resumeAudioForWorld();
    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  static abortToStart() {
    CancelOverlay.hide();

    if (typeof gamePaused !== "undefined") gamePaused = false;
    if (typeof countdownActive !== "undefined") countdownActive = false;

    if (typeof clearAllIntervals === "function") clearAllIntervals();

    if (typeof world !== "undefined" && world) {
      try { world.pauseGame(); } catch (_) {}
      world.running = false;
    }

    if (typeof SoundManager !== "undefined" && !SoundManager.isMuted) {
      SoundManager.stopBackground();
      SoundManager.playBackground("music");
    }

    if (typeof returnToStart === "function") returnToStart();

    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  static updateAbortButtonVisibility() {
    const btn = document.getElementById("abortToStart");
    if (!btn) return;

    const shouldShow = !!(typeof world !== "undefined" && world && world.running === true);
    btn.classList.toggle("overlay-hidden", !shouldShow);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("abortToStart");
  if (!btn) return;

  btn.addEventListener("click", () => CancelOverlay.show());
  CancelOverlay.updateAbortButtonVisibility();
});
