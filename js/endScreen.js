/**
 * EndScreen handles displaying the end screen overlay
 * with game statistics and navigation buttons.
 */
class EndScreen {
    /**
     * Wires up static buttons once after DOM is ready.
     * Uses static HTML buttons; no dynamic creation.
     */
    static init() {
        const back = document.getElementById("btn-end-back");
        const restart = document.getElementById("btn-end-restart");
        if (back) back.addEventListener("click", () => EndScreen.goToStart());
        if (restart) restart.addEventListener("click", () => EndScreen.restartGame());
    }

    /**
     * Shows the end screen with stats and buttons.
     * @param {Object} stats - Game statistics.
     * @param {number} stats.chickens - Number of chickens killed.
     * @param {number} stats.chickenBigs - Number of big chickens killed.
     * @param {number} stats.chickenSmalls - Number of small chickens killed.
     * @param {number} stats.hearts - Remaining player hearts (energy).
     * @param {number} stats.coins - Collected coins.
     * @param {number} stats.time - Total play time in seconds.
     */
    static show(stats) {
        const overlay = document.getElementById("endscreenOverlay");
        overlay.classList.remove("overlay-hidden");

        /* Update stats */
        document.getElementById("stat-chickens").textContent = `🐓 Normale Hühner: ${stats.chickens}`;
        document.getElementById("stat-chickenBigs").textContent = `🐔 Große Hühner: ${stats.chickenBigs}`;
        document.getElementById("stat-chickenSmalls").textContent = `🐥 Kleine Hühner: ${stats.chickenSmalls}`;
        document.getElementById("stat-hearts").textContent = `❤️ Leben: ${stats.hearts}`;
        document.getElementById("stat-coins").textContent = `🪙 Münzen: ${stats.coins}`;
        document.getElementById("stat-time").textContent = `⏱️ Zeit: ${stats.time} Sekunden`;
    }

    /**
     * Deprecated helper kept for compatibility. No dynamic creation anymore.
     * Leaves static HTML buttons in place.
     */
    static backBtn() {
        /* intentionally left minimal: static buttons are wired in init() */
    }

    /**
     * Returns to the start screen and hides the endscreen.
     */
    static goToStart() {
        const startScreen = document.getElementById("startScreen");
        if (startScreen) startScreen.classList.remove("overlay-hidden");
        const endScreen = document.getElementById("endscreenOverlay");
        if (endScreen) endScreen.classList.add("overlay-hidden");
    }

    /**
     * Hides the endscreen and restarts level 1 without page reload.
     */
    static restartGame() {
        const endScreen = document.getElementById("endscreenOverlay");
        if (endScreen) endScreen.classList.add("overlay-hidden");
        clearAllIntervals();
        init(createLevel1());
    }
}
