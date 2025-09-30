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
    EndScreen.init();
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

/** Resizes the canvas proportionally to the window. */
function resizeCanvas() {
    const scaleX = window.innerWidth / canvas.width;
    const scaleY = window.innerHeight / canvas.height;
    const scale = Math.min(scaleX, scaleY);
    canvas.style.width = canvas.width * scale + "px";
    canvas.style.height = canvas.height * scale + "px";
}

/** Resets the game to its initial state. */
function resetGame() {
    clearAllIntervals();
    stopAnimations();
    removeEventListeners();
    world = null;
    init(createLevel1());
}

/** Clears all active intervals and timeouts. */
function clearAllIntervals() {
    const highestId = setTimeout(() => {}, 0);
    for (let id = 0; id <= highestId; id++) {
        clearTimeout(id);
        clearInterval(id);
    }
}

/** Stops character animations if active. */
function stopAnimations() {
    if (world && world.character?.animationInterval) {
        clearInterval(world.character.animationInterval);
    }
}

/** Removes global keyboard event listeners. */
function removeEventListeners() {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
}

/** Utilities for restart prompt (static HTML). */
function getRestartPromptEl() { return document.getElementById("restartPrompt"); }
function showRestartEl(el) {
    if (!el) return;
    if (el.classList) el.classList.remove("is-hidden");
    else el.style.display = "block";
}
function hideRestartEl(el) {
    if (!el) return;
    if (el.classList) el.classList.add("is-hidden");
    else el.style.display = "none";
}
function isRestartPromptVisible() {
    const el = getRestartPromptEl();
    if (!el) return false;
    return el.classList ? !el.classList.contains("is-hidden") : el.style.display !== "none";
}

/** Displays the restart confirmation overlay. */
function showRestartPrompt() {
    const prompt = createRestartPrompt(); // muss weiterhin aufgerufen werden
    if (!prompt) return;
    document.removeEventListener("keydown", this.handleRestartEvent);
    this.handleRestartEvent = (e) => handleRestartKeys(e, this);
    document.addEventListener("keydown", this.handleRestartEvent);
}

/** Creates the restart overlay element (now: reveals static element). */
function createRestartPrompt() {
    const el = getRestartPromptEl();
    bindRestartButtons(el);
    showRestartEl(el);
    return el || null;
}

/** Handles restart key inputs. */
function handleRestartKeys(event, ctx) {
    const key = event.key.toLowerCase();
    if (key === "n") {
        EndScreen.goToStart();
        hideRestartEl(getRestartPromptEl());
        document.removeEventListener("keydown", this.handleRestartEvent);
    } else if (key === "j") {
        ctx.closeRestartPrompt();
    }
}

function bindRestartButtons(el) {
    if (!el || el._restartBound) return;
    el.addEventListener("click", (e) => {
        const btn = e.target.closest(".restart-btn");
        if (!btn) return;
        const key = btn.textContent.trim().toLowerCase(); // "j" oder "n"
        if (key === "j" || key === "n") {
            document.dispatchEvent(new KeyboardEvent("keydown", {
                key, bubbles: true, cancelable: true
            }));
        }
    });
    el._restartBound = true;
}

/** Closes restart overlay and reinitialises the game. */
function closeRestartPrompt() {
    hideRestartEl(getRestartPromptEl());
    document.removeEventListener("keydown", this.handleRestartEvent);
    init(createLevel1());
}

/** Global keydown handler. */
window.addEventListener("keydown", (e) => {
    const promptVisible = isRestartPromptVisible();

    // World stopped: allow P; with visible prompt also J/N
    if (world && !world.running) {
        if (promptVisible) {
            if (![80, 74, 78].includes(e.keyCode)) return; // P, J, N
        } else {
            if (e.keyCode !== 80) return; // only P
        }
    }

    // In pause/countdown only P
    if (gamePaused && e.keyCode !== 80) return;

    handleKeyDownEvents(e);
});

/** Processes keydown events and maps to actions. */
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

/** Handles the space key (throwing). */
function handleSpaceKey() {
    if (!keyboard.SPACE) {
        keyboard.SPACE = true;
        if (world) world.tryThrowObject();
    }
}

/** Global keyup handler. */
window.addEventListener("keyup", (e) => handleKeyUpEvents(e));

/** Processes keyup events and maps to actions. */
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

/** Toggles game pause state. */
function togglePause() {
    if (!gamePaused) pauseGame();
    else if (!countdownActive) {
        clearPauseScreen();
        startCountdown();
    }
}

/** Pauses the game and draws overlay. */
function pauseGame() {
    gamePaused = true;
    world.pauseGame();
    drawPauseScreen();
}

/** Starts countdown to resume game. */
function startCountdown() {
    countdownActive = true;
    if (world) world.pauseGame(); // hard stop during countdown

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

/** Resumes game after countdown. */
function resumeAfterCountdown() {
    speak("GO!");
    world.resumeGame();
    gamePaused = false;
    countdownActive = false;
}

/** Speaks given text with speech synthesis. */
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "de-DE";
    window.speechSynthesis.speak(speech);
}

/** Draws pause screen overlay. */
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

/** Clears pause overlay by redrawing the world. */
function clearPauseScreen() { world.draw(); }

/** Wraps a handler so it always calls preventDefault first. */
function withPrevent(fn) {
    return (e) => { e.preventDefault(); fn(); };
}

/** Attaches touchstart/touchend to a button if it exists. */
function attachTouch(btn, onStart, onEnd) {
    if (!btn) return;
    btn.addEventListener("touchstart", onStart, { passive: false });
    btn.addEventListener("touchend", onEnd, { passive: false });
}

/** Initialises mobile controls for touch devices. */
function initMobileControls() {
    const map = [["btn-left","LEFT"], ["btn-right","RIGHT"], ["btn-jump","UP"]];
    map.forEach(([id, key]) => attachTouch(
        document.getElementById(id),
        withPrevent(() => keyboard[key] = true),
        withPrevent(() => keyboard[key] = false)
    ));
    attachTouch(
        document.getElementById("btn-throw"),
        withPrevent(() => handleSpaceKey()),
        withPrevent(() => keyboard.SPACE = false)
    );
}

/** Checks device orientation and updates UI. */
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
