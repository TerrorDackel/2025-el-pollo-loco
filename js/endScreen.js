/**
 * Handles showing the endscreen after the boss is defeated.
 */
class EndScreen {
    /**
     * Show the overlay with statistics.
     * @param {Object} stats - Game stats.
     * @param {number} stats.enemies - Number of defeated enemies.
     * @param {number} stats.hearts - Remaining hearts (0–5).
     * @param {number} stats.coins - Collected coins.
     * @param {number} stats.time - Elapsed time in seconds.
     */
    static show(stats) {
        const overlay = document.getElementById("endscreen-overlay");
        overlay.classList.remove("overlay-hidden");

        document.getElementById("stat-enemies").textContent = `Getötete Gegner: ${stats.enemies}`;
        document.getElementById("stat-hearts").textContent = `Verbleibende Herzen: ${stats.hearts}`;
        document.getElementById("stat-coins").textContent = `Gesammelte Coins: ${stats.coins}`;
        document.getElementById("stat-time").textContent = `Spielzeit: ${stats.time}s`;
    }

    /** Hide the overlay again */
    static hide() {
        document.getElementById("endscreen-overlay").classList.add("overlay-hidden");
    }
}
