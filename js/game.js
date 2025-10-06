/** 
 * Global game state
 */
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
 * @param {Level} [level=level1] - Level to start.
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
    init(createLevel1());
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
    if (world && world.character?.animationInterval) {
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
 * Utilities for restart prompt (static HTML). 
 * Deprecated: direct DOM visibility checks replaced by GameOverScreen.isVisible().
 */
function getRestartPromptEl() { return document.getElementById("restartPrompt"); }

/**
 * Displays the restart confirmation overlay (delegated to GameOverScreen).
 */
function showRestartPrompt() {
    GameOverScreen.show();
}

/**
 * Returns whether the game over overlay is visible.
 * Uses GameOverScreen state; keeps legacy DOM check as fallback.
 * @returns {boolean} True if visible, otherwise false.
 */
function isRestartPromptVisible() {
    if (typeof GameOverScreen !== "undefined" && GameOverScreen.isVisible) {
        return GameOverScreen.isVisible();
    }
    /* Deprecated: legacy DOM-based visibility check kept for fallback. */
    const el = getRestartPromptEl();
    if (!el) return false;
    return el.classList ? !el.classList.contains("is-hidden") : el.style.display !== "none";
}

/**
 * Derives a stable numeric key code for both real and synthetic events.
 * Handles deprecated keyCode by falling back to e.key.
 */
function getKeyCode(e) {
    /* Prefer legacy keyCode if present */
    if (typeof e.keyCode === "number" && e.keyCode !== 0) return e.keyCode;
    /* Fallback: derive from key string for letters */
    if (e.key && typeof e.key === "string" && e.key.length === 1) {
        const ch = e.key.toUpperCase();
        const code = ch.charCodeAt(0);
        if (code >= 65 && code <= 90) return code; /* A-Z */
    }
    /* Special-case J/N when coming from GameOverScreen buttons that might lack keyCode */
    if (e.key && e.key.toLowerCase() === "j") return 74;
    if (e.key && e.key.toLowerCase() === "n") return 78;
    /* No reliable mapping available */
    return undefined;
}

/**
 * Global keydown handler that gates inputs during pause or while prompts are open.
 * Professional: P is blocked when game over is visible.
 */
window.addEventListener("keydown", (e) => {
    const code = getKeyCode(e); /* NEW: robust mapping for synthetic events */
    const promptVisible = isRestartPromptVisible();

    /* New gating using derived code */
    if (world && !world.running) {
        if (promptVisible) {
            if (![74, 78].includes(code)) return; // J, N only
        } else {
            if (code !== 80) return; // only P
        }
    }

    if (gamePaused && code !== 80) return;
    handleKeyDownEvents_code(code); /* NEW: route via code-based handler */
});

/**
 * Processes keydown events by numeric code.
 * @param {number|undefined} code - Derived key code.
 */
function handleKeyDownEvents_code(code) {
    switch (code) {
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
        default: break;
    }
}

/* Deprecated: original handler kept for compatibility, not used anymore. */
/**
 * Processes keydown events and maps to actions.
 * @param {KeyboardEvent} e - The keyboard event.
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

/** Handles the space key (throwing). */
function handleSpaceKey() {
    if (!keyboard.SPACE) {
        keyboard.SPACE = true;
        if (world) world.tryThrowObject();
    }
} 

/** 
 * Global keyup handler. 
 */
window.addEventListener("keyup", (e) => {
    const code = getKeyCode(e); /* NEW: robust mapping */
    handleKeyUpEvents_code(code); /* NEW: route via code-based handler */
});

/**
 * Processes keyup events by numeric code.
 * @param {number|undefined} code - Derived key code.
 */
function handleKeyUpEvents_code(code) {
    switch (code) {
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
        default: break;
    }
}

/* Deprecated: original keyup handler kept for compatibility, not used anymore. */
/**
 * Processes keyup events and maps to actions.
 * @param {KeyboardEvent} e - The keyboard event.
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
 * Keeps original structure; delegates overlay/countdown to PauseScreen.
 */
function togglePause() {
    if (!gamePaused) pauseGame();
    else if (!countdownActive) {
        startCountdown();
    }
}

/**
 * Pauses the game and shows the pause overlay.
 * Freezes world via World.pauseGame().
 */
function pauseGame() {
    gamePaused = true;
    if (world) world.pauseGame();
    PauseScreen.showOverlay();
}

/**
 * Starts countdown to resume game via PauseScreen.
 * Uses ~2 seconds total (400 ms steps for 5→1 plus 'GO!').
 */
function startCountdown() {
    countdownActive = true;
    if (world) world.pauseGame();
    PauseScreen.showCountdown(() => {
        resumeAfterCountdown();
    });
}

/**
 * Resumes game after countdown finishes.
 * Hides overlay and restores world loop.
 */
function resumeAfterCountdown() {
    speak("GO!");
    if (world) world.resumeGame();
    gamePaused = false;
    countdownActive = false;
    PauseScreen.clearOverlay();
}

/**
 * Speaks given text with speech synthesis.
 * @param {string|number} text - The text or number to speak in German.
 */
function speak(text) {
    const speech = new SpeechSynthesisUtterance(String(text));
    speech.lang = "de-DE";
    window.speechSynthesis.speak(speech);
}

/**
 * Draws pause screen overlay on canvas.
 * Replaced by HTML overlay for responsiveness and styling flexibility.
 */
function drawPauseScreen() {
    PauseScreen.showOverlay();
}

/**
 * Clears pause overlay.
 * Previously forced a redraw; now delegates to PauseScreen.
 */
function clearPauseScreen() {
    PauseScreen.clearOverlay();
}

/**
 * Wraps a handler so it always calls preventDefault first.
 * @param {Function} fn - Callback to wrap.
 * @returns {Function} Wrapped handler.
 */
function withPrevent(fn) {
    return (e) => { e.preventDefault(); fn(); };
}

/**
 * Attaches touchstart/touchend to a button if it exists.
 * @param {HTMLElement|null} btn - The button element.
 * @param {Function} onStart - Touchstart callback.
 * @param {Function} onEnd - Touchend callback.
 */
function attachTouch(btn, onStart, onEnd) {
    if (!btn) return;
    btn.addEventListener("touchstart", onStart, { passive: false });
    btn.addEventListener("touchend", onEnd, { passive: false });
}

/**
 * Initialises mobile controls for touch devices.
 * Maps on-screen buttons to keyboard flags.
 */
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

/**
 * Checks device orientation and updates UI visibility.
 * Shows rotate warning in portrait mode on mobile.
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
