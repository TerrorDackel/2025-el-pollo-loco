/**
 * Starts the game: hides start screen, shows loading overlay, preloads core assets
 * with progress, then initialises the world. Idle pulse on the start button is cancelled.
 * @async
 * @returns {Promise<void>}
 */
async function startGame() {
  cancelStartButtonIdle();
  const startScreen = document.getElementById("startScreen");
  if (startScreen) startScreen.classList.add("overlay-hidden");

  showLoadingOverlay();

  if (typeof preloadCoreAssetsWithProgress === "function") {
    await preloadCoreAssetsWithProgress((ratio) => updateLoadingBar(ratio));
  } else if (typeof preloadCoreAssets === "function") {
    await preloadCoreAssets();
    updateLoadingBar(1);
  }

  hideLoadingOverlay();
  if (
    typeof AssetLoader !== "undefined" &&
    AssetLoader.failedPaths &&
    AssetLoader.failedPaths.size > 0
  ) {
    console.warn(
      "[El Pollo Loco]",
      AssetLoader.failedPaths.size,
      "image(s) failed to load. See console for paths."
    );
  }
  init(createLevel1());
  if (typeof updateUiVisibility === "function") updateUiVisibility();
}

let startIdleTimeoutId;

/**
 * Schedules a gentle idle pulse on the primary start button after 4s of no interaction.
 * Resets the timer on mousemove, keydown, click, or touchstart.
 */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-start-primary");
  if (!btn) return;
  btn.classList.add("primary-start");

  const schedule = () => {
    clearTimeout(startIdleTimeoutId);
    startIdleTimeoutId = setTimeout(() => {
      btn.classList.add("is-idle");
    }, 4000);
  };

  ["mousemove", "keydown", "click", "touchstart"].forEach((evt) => {
    window.addEventListener(
      evt,
      () => {
        btn.classList.remove("is-idle");
        schedule();
      },
      { passive: true }
    );
  });

  schedule();
});

/**
 * Cancels the start-button idle pulse and removes the is-idle class.
 */
function cancelStartButtonIdle() {
  clearTimeout(startIdleTimeoutId);
  const btn = document.getElementById("btn-start-primary");
  if (btn) btn.classList.remove("is-idle");
}

/**
 * Shows the loading overlay and resets the progress bar to 0.
 */
function showLoadingOverlay() {
  const overlay = document.getElementById("loadingOverlay");
  const fill = document.getElementById("loadingBarFill");
  if (fill) fill.style.width = "0%";
  if (overlay) overlay.classList.remove("overlay-hidden");
}

/**
 * Updates the loading bar fill width from 0 to 100% based on ratio.
 * @param {number} ratio - Progress from 0 to 1 (clamped).
 */
function updateLoadingBar(ratio) {
  const fill = document.getElementById("loadingBarFill");
  if (!fill) return;
  const clamped = Math.max(0, Math.min(1, ratio || 0));
  fill.style.width = `${clamped * 100}%`;
}

/**
 * Hides the loading overlay (adds overlay-hidden class).
 */
function hideLoadingOverlay() {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) overlay.classList.add("overlay-hidden");
}

/**
 * Shows the rules overlay and hides rules/impressum overlays.
 */
function showRules() {
  hideAllOverlays();
  document.getElementById("rulesOverlay").classList.remove("overlay-hidden");
  if (typeof updateUiVisibility === "function") updateUiVisibility();
}

/**
 * Shows the legal notice (Impressum) overlay and hides other overlays.
 */
function showImpressum() {
  hideAllOverlays();
  document.getElementById("impressumOverlay").classList.remove("overlay-hidden");
  if (typeof updateUiVisibility === "function") updateUiVisibility();
}

/**
 * Returns to the start screen: hides rules/impressum and shows start screen.
 */
function returnToStart() {
  hideAllOverlays();
  document.getElementById("startScreen")?.classList.remove("overlay-hidden");
  if (typeof updateUiVisibility === "function") updateUiVisibility();
}

/**
 * Hides rules and impressum overlays (adds overlay-hidden to both).
 */
function hideAllOverlays() {
  document.getElementById("rulesOverlay").classList.add("overlay-hidden");
  document.getElementById("impressumOverlay").classList.add("overlay-hidden");
}
