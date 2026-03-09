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
  if (typeof AssetLoader !== "undefined" && AssetLoader.preloadImages) {
    // leichter Hintergrund-Preload: ein paar zentrale Sprites
    AssetLoader.preloadImages([
      "./imgs/2_character_pepe/1_idle/idle/I-1.png",
      "./imgs/2_character_pepe/2_walk/W-21.png",
      "./imgs/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    ]);
  }
  initMobileControls();
  updateUiVisibility();
  window.addEventListener("resize", updateUiVisibility);
  window.addEventListener("orientationchange", updateUiVisibility);
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
  if (typeof CancelOverlay !== "undefined" && CancelOverlay.updateAbortButtonVisibility)
    CancelOverlay.updateAbortButtonVisibility();
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
function getRestartPromptEl() {
  return document.getElementById("restartPrompt");
}

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
  const el = getRestartPromptEl();
  return !!(el && !el.classList.contains("is-hidden"));
}

/**
 * Shows the pause overlay (delegated to PauseScreen).
 */
function showPauseScreen() {
  PauseScreen.showOverlay();
}

/**
 * Clears pause overlay (delegated to PauseScreen).
 */
function clearPauseScreen() {
  PauseScreen.clearOverlay();
}

/** Handles the space key (throwing). */
function handleSpaceKey() {
  if (!keyboard.SPACE) {
    keyboard.SPACE = true;
    if (world) world.tryThrowObject();
  }
}

/**
 * Keeps idle timing consistent for both keyboard and touch.
 */
function noteActivity() {
  if (keyboard) keyboard.lastActivity = Date.now();
}

/**
 * Derives a stable numeric key code for both real and synthetic events.
 * Handles deprecated keyCode by falling back to e.key.
 * @param {KeyboardEvent} e - The keyboard event.
 * @returns {number|undefined} A numeric key code or undefined if not derivable.
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
  /* No code derivable */
  return undefined;
}

/**
 * Global keydown handler that gates inputs during pause or while prompts are open.
 * Professional: P is blocked when game over is visible.
 */
window.addEventListener("keydown", (e) => {
  noteActivity();
  const code = getKeyCode(e);
  const promptVisible = isRestartPromptVisible();

  /* New gating: when prompt visible → only J or N allowed. */
  if (world && !world.running) {
    if (promptVisible) {
      if (![74, 78].includes(code)) return; // J, N only
    } else {
      if (code !== 80) return; // only P
    }
  }

  if (gamePaused && code !== 80) return;
  handleKeyDownEvents_code(code);
});

/**
 * Processes keydown events by numeric code.
 * @param {number|undefined} code - Derived key code.
 */
function handleKeyDownEvents_code(code) {
  switch (code) {
    case 39:
      keyboard.RIGHT = true;
      break;
    case 37:
      keyboard.LEFT = true;
      break;
    case 38:
      keyboard.UP = true;
      break;
    case 40:
      keyboard.DOWN = true;
      break;
    case 32:
      handleSpaceKey();
      break;
    case 68:
      keyboard.D = true;
      break;
    case 70:
      keyboard.F = true;
      break;
    case 74:
      keyboard.J = true;
      break;
    case 78:
      keyboard.N = true;
      break;
    case 45:
      keyboard.ZERO = true;
      break;
    case 77:
      keyboard.M = true;
      break;
    case 80:
      togglePause();
      break;
    case 90:
      SoundManager.unmuteAll();
      break;
    case 84:
      SoundManager.muteAll();
      break;
    case 27:
      if (typeof CancelOverlay !== "undefined" && CancelOverlay.show) CancelOverlay.show();
      break;
    default:
      break;
  }
}

/* Deprecated: original handler kept for compatibility, not used anymore. */
/**
 * Processes keydown events and maps to actions.
 * @param {KeyboardEvent} e - The keyboard event.
 */
function handleKeyDownEvents(e) {
  switch (e.keyCode) {
    case 39:
      keyboard.RIGHT = true;
      break;
    case 37:
      keyboard.LEFT = true;
      break;
    case 38:
      keyboard.UP = true;
      break;
    case 40:
      keyboard.DOWN = true;
      break;
    case 32:
      handleSpaceKey();
      break;
    case 68:
      keyboard.D = true;
      break;
    case 77:
      keyboard.M = true;
      break;
    case 74:
      keyboard.J = true;
      break;
    case 78:
      keyboard.N = true;
      break;
    case 45:
      keyboard.ZERO = true;
      break;
    case 80:
      keyboard.PAUSE = true;
      break;
    default:
      break;
  }
}

/**
 * Global keyup handler.
 */
window.addEventListener("keyup", (e) => handleKeyUpEvents(e));

/**
 * Sets keyboard flags for keyup events.
 * @param {KeyboardEvent} e - The keyboard event.
 */
function handleKeyUpEvents(e) {
  switch (e.keyCode) {
    case 39:
      keyboard.RIGHT = false;
      break;
    case 37:
      keyboard.LEFT = false;
      break;
    case 38:
      keyboard.UP = false;
      break;
    case 40:
      keyboard.DOWN = false;
      break;
    case 32:
      keyboard.SPACE = false;
      break;
    case 68:
      keyboard.D = false;
      break;
    case 77:
      keyboard.M = false;
      break;
    case 74:
      keyboard.J = false;
      break;
    case 78:
      keyboard.N = false;
      break;
    case 45:
      keyboard.ZERO = false;
      break;
    case 80:
      keyboard.PAUSE = false;
      break;
    default:
      break;
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
  SoundManager.pauseAllSounds();
  if (typeof updateUiVisibility === "function") updateUiVisibility();
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
 * Resumes background audio based on current world state.
 * Plays boss music when the boss is in contact and alive, otherwise normal music.
 * Respects global mute via SoundManager.isMuted.
 */
function resumeAudioForWorld() {
  if (SoundManager.isMuted) return;
  const boss = world?.level?.boss;
  const playBoss = !!(boss && boss.contactWithCharacter && !boss.isDead);
  SoundManager.stopBackground();
  SoundManager.playBackground(playBoss ? "bossMusic" : "music");
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
  resumeAudioForWorld();
  if (typeof updateUiVisibility === "function") updateUiVisibility();
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
  return (e) => {
    e.preventDefault();
    noteActivity();
    fn();
  };
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
  const map = [
    ["btn-left", "LEFT"],
    ["btn-right", "RIGHT"],
    ["btn-jump", "UP"],
  ];
  map.forEach(([id, key]) =>
    attachTouch(
      document.getElementById(id),
      withPrevent(() => (keyboard[key] = true)),
      withPrevent(() => (keyboard[key] = false))
    )
  );
  attachTouch(
    document.getElementById("btn-throw"),
    withPrevent(() => handleSpaceKey()),
    withPrevent(() => (keyboard.SPACE = false))
  );
}

/**
 * Updates all UI visibility rules that depend on viewport, orientation and overlay state.
 * This is the single entry point for resize/orientation events.
 * It also synchronises the abort button visibility with the running world state.
 */
function updateUiVisibility() {
  updateOrientationBodyClass();
  updateMobileControlsVisibility();
  if (typeof CancelOverlay !== "undefined" && CancelOverlay.updateAbortButtonVisibility)
    CancelOverlay.updateAbortButtonVisibility();
}

/**
 * Applies an orientation marker class to the body.
 * Used to drive CSS rules for rotate warning and canvas visibility.
 */
function updateOrientationBodyClass() {
  document.body.classList.toggle("is-portrait", window.innerHeight > window.innerWidth);
}

/**
 * Detects whether the current device is a touch-first device.
 * @returns {boolean} True if coarse pointer and no hover are detected.
 */
function isTouchDevice() {
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

/**
 * Determines whether the viewport should be treated as landscape.
 * Uses orientation media query and falls back to width/height comparison.
 * @returns {boolean} True if landscape conditions are met.
 */
function isLandscapeViewport() {
  return (
    window.matchMedia("(orientation: landscape)").matches || window.innerWidth >= window.innerHeight
  );
}

/**
 * Checks whether an element is currently visible by verifying it does not carry a given hidden class.
 * @param {string} id - Element id.
 * @param {string} hiddenClass - Class name that indicates hidden state.
 * @returns {boolean} True if the element exists and is not hidden.
 */
function isElementVisible(id, hiddenClass) {
  const el = document.getElementById(id);
  return !!(el && !el.classList.contains(hiddenClass));
}

/**
 * Returns whether any overlay is currently blocking mobile controls.
 * This prevents accidental input while modals or full-screen overlays are active.
 * @returns {boolean} True if any blocking overlay is visible.
 */
function isOverlayBlockingMobileControls() {
  return (
    isElementVisible("cancelOverlay", "is-hidden") ||
    isElementVisible("startScreen", "overlay-hidden") ||
    isElementVisible("rulesOverlay", "overlay-hidden") ||
    isElementVisible("impressumOverlay", "overlay-hidden") ||
    isElementVisible("endscreenOverlay", "overlay-hidden") ||
    isElementVisible("pauseOverlay", "pause-overlay-hidden") ||
    isElementVisible("restartPrompt", "is-hidden")
  );
}

/**
 * Updates the visibility of the on-screen mobile control buttons.
 * Shows controls only on touch devices, in landscape, while the world is running,
 * and only when no blocking overlays are visible and no pause/countdown is active.
 */
function updateMobileControlsVisibility() {
  const mobileControls = document.getElementById("mobileControls");
  if (!mobileControls) return;
  const shouldShow =
    isTouchDevice() &&
    isLandscapeViewport() &&
    !document.body.classList.contains("is-portrait") &&
    !isOverlayBlockingMobileControls() &&
    !!(world && world.running === true) &&
    !gamePaused &&
    !countdownActive;
  mobileControls.classList.toggle("overlay-hidden", !shouldShow);
}

/**
 * Compatibility helper for any existing orientation handlers.
 * Delegates to updateUiVisibility() to keep behaviour consistent.
 */
function checkOrientation() {
  updateUiVisibility();
}
