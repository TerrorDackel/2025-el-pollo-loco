/**
 * Starts the game by hiding the start screen,
 * showing a loading overlay, preloading core assets with progress
 * and then initialising the world.
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
  init(createLevel1());
  if (typeof updateUiVisibility === "function") updateUiVisibility();
}

let startIdleTimeoutId;

/**
 * Sets up a gentle idle pulse for the primary start button
 * after a short period of inactivity on the start screen.
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
 * Cancels the idle pulse when the game actually starts.
 */
function cancelStartButtonIdle() {
  clearTimeout(startIdleTimeoutId);
  const btn = document.getElementById("btn-start-primary");
  if (btn) btn.classList.remove("is-idle");
}

/**
 * Shows the loading overlay and resets the bar.
 */
function showLoadingOverlay() {
  const overlay = document.getElementById("loadingOverlay");
  const fill = document.getElementById("loadingBarFill");
  if (fill) fill.style.width = "0%";
  if (overlay) overlay.classList.remove("overlay-hidden");
}

/**
 * Updates the width of the loading bar based on ratio 0..1.
 * @param {number} ratio
 */
function updateLoadingBar(ratio) {
  const fill = document.getElementById("loadingBarFill");
  if (!fill) return;
  const clamped = Math.max(0, Math.min(1, ratio || 0));
  fill.style.width = `${clamped * 100}%`;
}

/**
 * Hides the loading overlay.
 */
function hideLoadingOverlay() {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) overlay.classList.add("overlay-hidden");
}

/**
 * Displays the rules overlay and hides other overlays.
 */
function showRules() {
  hideAllOverlays();
  document.getElementById("rulesOverlay").classList.remove("overlay-hidden");
  if (typeof updateUiVisibility === "function") updateUiVisibility();
}

/**
 * Displays the legal notice overlay and hides other overlays.
 */
function showImpressum() {
  hideAllOverlays();
  document.getElementById("impressumOverlay").classList.remove("overlay-hidden");
  if (typeof updateUiVisibility === "function") updateUiVisibility();
}

/**
 * Returns to the start screen and hides overlays.
 */
function returnToStart() {
  hideAllOverlays();
  document.getElementById("startScreen")?.classList.remove("overlay-hidden");
  if (typeof updateUiVisibility === "function") updateUiVisibility();
}

/**
 * Hides all overlays (rules and impressum).
 */
function hideAllOverlays() {
  document.getElementById("rulesOverlay").classList.add("overlay-hidden");
  document.getElementById("impressumOverlay").classList.add("overlay-hidden");
}
