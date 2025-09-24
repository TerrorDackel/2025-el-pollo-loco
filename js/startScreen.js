/** Startet das Spiel */
function startGame() {
    const startScreen = document.getElementById("startScreen");

    if (startScreen) startScreen.remove();
    
    init();

    const controls = document.getElementById("mobile-controls");
    if (controls) {
        if (window.matchMedia("(hover: none) and (pointer: coarse) and (orientation: landscape)").matches) {
            controls.classList.remove("hidden"); // Mobile-Controls einblenden (Querformat)
        } else {
            controls.classList.add("hidden"); // Ansonsten versteckt lassen
        }
    }
}

/** Zeigt Regeln */
function showRules() {
    const rules = document.getElementById("rules-overlay");
    rules.classList.remove("hidden");
    document.addEventListener("click", closeOverlay, { once: true });
}

/** Zeigt Impressum */
function showImpressum() {
    const impressum = document.getElementById("impressum-overlay");
    impressum.classList.remove("hidden");
    document.addEventListener("click", closeOverlay, { once: true });
}

/** Schließt ein Overlay */
function closeOverlay() {
    document.getElementById("rules-overlay").classList.add("hidden");
    document.getElementById("impressum-overlay").classList.add("hidden");
}
