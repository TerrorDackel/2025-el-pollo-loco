/**
 * Starts the game by hiding the start screen,
 * initialising the world, and enabling mobile controls if applicable.
 */
function startGame() {
  const startScreen = document.getElementById("startScreen");
  if (startScreen) startScreen.classList.add("overlay-hidden");
  init(createLevel1());
  if (typeof updateUiVisibility === "function") updateUiVisibility();
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
