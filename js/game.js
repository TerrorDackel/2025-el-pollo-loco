// ===============================
// Global game state
// ===============================
let canvas;
let world;
let keyboard = new Keyboard();
let restartTimeout;
let gamePaused = false;
let countdownActive = false;
let intervalIds = [];
let i = 1;

/**
 * Creates a stoppable interval and stores its id.
 * @param {Function} fn - Function to execute repeatedly.
 * @param {number} time - Interval duration in milliseconds.
 */
function setStoppableInterval(fn, time) {
    const id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * Initialises global systems once the DOM is ready.
 */
document.addEventListener("DOMContentLoaded", () => {
    SoundManager.init();
    initMobileControls();
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
});

/**
 * Initialises the game world and canvas.
 * @param {Level} [level=level1] - Level to start
 */
function init(level = level1) {
    clearAllIntervals();
    canvas = document.getElementById("canvas");
    canvas.width = 720;
    canvas.height = 480;
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    world = new World(canvas, keyboard, level);
    window.world = world;
}

/**
 * Resizes the canvas proportionally to the window.
 */
function resizeCanvas() {
    const scaleX = window.innerWidth / canvas.width;
    const scaleY = window.innerHeight / canvas.height;
    const scale = Math.min(scaleX, scaleY);
    canvas.style.width = canvas.width * scale + "px";
    canvas.style.height = canvas.height * scale + "px";
}

/**
 * Resets the game to its initial state.
 */
function resetGame() {
    clearAllIntervals();
    stopAnimations();
    removeEventListeners();
    world = null;
    init(level1);
}

/**
 * Clears all active intervals and timeouts.
 */
function clearAllIntervals() {
    const highestId = setTimeout(() => {}, 0);
    for (let id = 0; id <= highestId; id++) {
        clearTimeout(id);
        clearInterval(id);
    }
}

/**
 * Stops character animations if active.
 */
function stopAnimations() {
    if (world && world.character.animationInterval) {
        clearInterval(world.character.animationInterval);
    }
}

/**
 * Removes global keyboard event listeners.
 */
function removeEventListeners() {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
}

/**
 * Displays the restart confirmation overlay.
 */
function showRestartPrompt() {
    if (document.getElementById("restartPrompt")) return;
    const prompt = createRestartPrompt();
    document.body.appendChild(prompt);
    document.removeEventListener("keydown", this.handleRestartEvent);
    this.handleRestartEvent = (e) => handleRestartKeys(e, this);
    document.addEventListener("keydown", this.handleRestartEvent);
}

/**
 * Creates the restart overlay element.
 * @returns {HTMLDivElement} Restart prompt element.
 */
function createRestartPrompt() {
    return Object.assign(document.createElement("div"), {
        id: "restartPrompt",
        innerHTML: "Spiel Neustarten: J=Ja, N=Nein",
        style: `position:absolute;top:50%;left:50%;
                transform:translate(-50%,-50%);
                background:rgba(0,0,0,0.8);color:white;
                padding:50px;font-size:20px;border-radius:10px;`
    });
}

/**
 * Handles restart key inputs.
 * @param {KeyboardEvent} event - The pressed key.
 * @param {object} ctx - Context object with closeRestartPrompt.
 */
function handleRestartKeys(event, ctx) {
    const key = event.key.toLowerCase();
    if (key === "n") window.location.reload();
    else if (key === "j") ctx.closeRestartPrompt();
}

/**
 * Closes restart overlay and reinitialises the game.
 */
function closeRestartPrompt() {
    const restartPrompt = document.getElementById("restartPrompt");
    if (restartPrompt) {
        restartPrompt.remove();
        document.removeEventListener("keydown", this.handleRestartEvent);
        init(level1);
    }
}

/**
 * Global keydown handler.
 */
window.addEventListener("keydown", (e) => {
    if (gamePaused && e.keyCode !== 80) return;
    handleKeyDownEvents(e);
});

/**
 * Processes keydown events and maps to actions.
 * @param {KeyboardEvent} e - The keydown event.
 */
function handleKeyDownEvents(e) {
    switch (e.keyCode) {
        case 39: keyboard.RIGHT = true; break;
        case 37: keyboard.LEFT = true; break;
        case 38: keyboard.UP = true; break;
        case 40: keyboard.DOWN = true; break;
        case 32: handleSpaceKey(); break;
        case 68: keyboard.D = true; break;
        case 70: keyboard.F = true; break;
        case 74: keyboard.J = true; break;
        case 78: keyboard.N = true; break;
        case 45: keyboard.ZERO = true; break;
        case 77: keyboard.M = true; break;
        case 80: togglePause(); break;
        case 90: SoundManager.unmuteAll(); break;
        case 84: SoundManager.muteAll(); break;
    }
}

/**
 * Handles the space key (throwing).
 */
function handleSpaceKey() {
    if (!keyboard.SPACE) {
        keyboard.SPACE = true;
        if (world) world.tryThrowObject();
    }
}

/**
 * Global keyup handler.
 */
window.addEventListener("keyup", (e) => handleKeyUpEvents(e));

/**
 * Processes keyup events and maps to actions.
 * @param {KeyboardEvent} e - The keyup event.
 */
function handleKeyUpEvents(e) {
    switch (e.keyCode) {
        case 39: keyboard.RIGHT = false; break;
        case 37: keyboard.LEFT = false; break;
        case 38: keyboard.UP = false; break;
        case 40: keyboard.DOWN = false; break;
        case 32: keyboard.SPACE = false; break;
        case 68: keyboard.D = false; break;
        case 77: keyboard.M = false; break;
        case 74: keyboard.J = false; break;
        case 78: keyboard.N = false; break;
        case 45: keyboard.ZERO = false; break;
        case 80: keyboard.PAUSE = false; break;
    }
}

/**
 * Toggles game pause state.
 */
function togglePause() {
    if (!gamePaused) pauseGame();
    else if (!countdownActive) {
        clearPauseScreen();
        startCountdown();
    }
}

/**
 * Pauses the game and draws overlay.
 */
function pauseGame() {
    gamePaused = true;
    world.pauseGame();
    drawPauseScreen();
}

/**
 * Starts countdown to resume game.
 */
function startCountdown() {
    countdownActive = true;
    let count = 5;
    const countDownStep = () => {
        if (count > 0) {
            speak(count);
            count--;
            setTimeout(countDownStep, 2300);
        } else resumeAfterCountdown();
    };
    countDownStep();
}

/**
 * Resumes game after countdown.
 */
function resumeAfterCountdown() {
    speak("GO!");
    world.resumeGame();
    gamePaused = false;
    countdownActive = false;
}

/**
 * Speaks given text with speech synthesis.
 * @param {string} text - Text to pronounce.
 */
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "de-DE";
    window.speechSynthesis.speak(speech);
}

/**
 * Draws pause screen overlay.
 */
function drawPauseScreen() {
    const ctx = world.ctx;
    ctx.fillStyle = "rgba(0,0,0,0.9)";
    ctx.fillRect(canvas.width / 2 - 180, canvas.height / 2 - 120, 360, 240);
    ctx.fillStyle = "white";
    ctx.font = "20px Helvetica";
    ctx.textAlign = "center";
    ctx.fillText("Das Game wurde pausiert.", canvas.width / 2, canvas.height / 2 - 30);
    ctx.fillText("Drücke bitte P erneut.", canvas.width / 2, canvas.height / 2 + 10);
}

/**
 * Clears pause overlay by redrawing the world.
 */
function clearPauseScreen() { world.draw(); }

/**
 * Initialises mobile controls for touch devices.
 */
function initMobileControls() {
    const map = [
        { id: "btn-left", key: "LEFT" },
        { id: "btn-right", key: "RIGHT" },
        { id: "btn-jump", key: "UP" }
    ];

    map.forEach(({ id, key }) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener("touchstart", (e) => {
            e.preventDefault(); keyboard[key] = true;
        }, { passive: false });
        btn.addEventListener("touchend", (e) => {
            e.preventDefault(); keyboard[key] = false;
        }, { passive: false });
    });

    const throwBtn = document.getElementById("btn-throw");
    if (throwBtn) {
        throwBtn.addEventListener("touchstart", (e) => {
            e.preventDefault(); handleSpaceKey();
        }, { passive: false });
        throwBtn.addEventListener("touchend", (e) => {
            e.preventDefault(); keyboard.SPACE = false;
        }, { passive: false });
    }
}

/**
 * Checks device orientation and updates UI.
 */
function checkOrientation() {
    const warning = document.getElementById("rotate-warning");
    const canvasEl = document.getElementById("canvas");
    if (window.innerHeight > window.innerWidth) {
        warning.style.display = "flex";
        canvasEl.style.display = "none";
    } else {
        warning.style.display = "none";
        canvasEl.style.display = "block";
    }
}
