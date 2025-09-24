/**
 * Starts the game by removing the start screen,
 * initialising the world, and enabling mobile controls if applicable.
 */
function startGame() {
    const startScreen = document.getElementById("startScreen");
    if (startScreen) startScreen.remove();
    init();
    toggleMobileControls(shouldShowMobileControls());
}

/**
 * Displays the rules overlay and hides other overlays.
 */
function showRules() {
    hideAllOverlays();
    document.getElementById("rules-overlay").classList.remove("overlay-hidden");
    toggleMobileControls(false);
}

/**
 * Displays the legal notice overlay and hides other overlays.
 */
function showImpressum() {
    hideAllOverlays();
    document.getElementById("impressum-overlay").classList.remove("overlay-hidden");
    toggleMobileControls(false);
}

/**
 * Returns to the start screen and hides overlays.
 */
function returnToStart() {
    hideAllOverlays();
    document.getElementById("startScreen")?.classList.remove("overlay-hidden");
    toggleMobileControls(false);
}

/**
 * Hides all overlays (rules and impressum).
 */
function hideAllOverlays() {
    document.getElementById("rules-overlay").classList.add("overlay-hidden");
    document.getElementById("impressum-overlay").classList.add("overlay-hidden");
}

/**
 * Determines whether mobile controls should be displayed
 * based on device input type and orientation.
 * @returns {boolean} True if mobile controls should be shown.
 */
function shouldShowMobileControls() {
    return window.matchMedia("(hover: none) and (pointer: coarse) and (orientation: landscape)").matches;
}

/**
 * Toggles the visibility of the mobile controls.
 * @param {boolean} show - Whether to show or hide the controls.
 */
function toggleMobileControls(show) {
    const el = document.getElementById("mobile-controls");
    if (!el) return;
    el.classList.toggle("overlay-hidden", !show);
}
