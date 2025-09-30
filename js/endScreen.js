/**
 * EndScreen handles displaying the end screen overlay
 * with game statistics and navigation buttons.
 */
class EndScreen {
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
        const overlay = document.getElementById("endscreen-overlay");
        overlay.classList.remove("overlay-hidden");

        /* Update stats */
        document.getElementById("stat-chickens").textContent = `🐔 Normale Hühner: ${stats.chickens}`;
        document.getElementById("stat-chickenBigs").textContent = `🐓 Große Hühner: ${stats.chickenBigs}`;
        document.getElementById("stat-chickenSmalls").textContent = `🐥 Kleine Hühner: ${stats.chickenSmalls}`;
        document.getElementById("stat-hearts").textContent = `❤️ Leben: ${stats.hearts}`;
        document.getElementById("stat-coins").textContent = `🪙 Münzen: ${stats.coins}`;
        document.getElementById("stat-time").textContent = `⏱️ Zeit: ${stats.time} Sekunden`;

        /* Find button container */
        const buttonContainer = overlay.querySelector(".endscreen-buttons");
        buttonContainer.innerHTML = ""; // clear old buttons

        /* Back to Menu Button */
        const backBtn = document.createElement("button");
        backBtn.className = "menu-button-close";
        backBtn.textContent = "⬅️ Zurück";
        backBtn.onclick = goToStart;
        buttonContainer.appendChild(backBtn);

    }
        static backBtn() {
        const buttonContainer = document.querySelector(".endscreen-buttons");
        buttonContainer.innerHTML = ""; // Alte Buttons löschen

        // Erstelle den "Zurück zum Start"-Button
        const backBtn = document.createElement("button");
        backBtn.className = "menu-button-close";
        backBtn.textContent = "⬅️ Zurück";

        // Event Listener für den Button
        backBtn.addEventListener("click", EndScreen.goToStart);

        // Button in den Container einfügen
        buttonContainer.appendChild(backBtn);
    }

    static goToStart() {
        const startScreen = document.getElementById("startScreen");
        if (startScreen) {
            startScreen.classList.remove("overlay-hidden");
        }

        // Optional: Blende das Endscreen aus
        const endScreen = document.getElementById("endscreen-overlay");
        if (endScreen) {
            endScreen.classList.add("overlay-hidden");
        }
    }
}
