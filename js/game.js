/**
 * Central game state and lifecycle.
 * All mutable state lives on the Game instance; global functions delegate to it.
 */
const Game = (function () {
  const state = {
    canvas: null,
    world: null,
    keyboard: new Keyboard(),
    restartTimeout: null,
    gamePaused: false,
    countdownActive: false,
    intervalIds: [],
  };

  function setStoppableInterval(fn, time) {
    const id = setInterval(fn, time);
    state.intervalIds.push(id);
  }

  function clearAllIntervals() {
    const highestId = setTimeout(() => {}, 0);
    for (let id = 0; id <= highestId; id++) {
      clearTimeout(id);
      clearInterval(id);
    }
  }

  function resizeCanvas() {
    if (!state.canvas) return;
    const scaleX = window.innerWidth / state.canvas.width;
    const scaleY = window.innerHeight / state.canvas.height;
    const scale = Math.min(scaleX, scaleY);
    state.canvas.style.width = state.canvas.width * scale + "px";
    state.canvas.style.height = state.canvas.height * scale + "px";
  }

  function stopAnimations() {
    if (state.world && state.world.character?.animationInterval) {
      clearInterval(state.world.character.animationInterval);
    }
  }

  function removeEventListeners() {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  }

  function getRestartPromptEl() {
    return document.getElementById("restartPrompt");
  }

  function isRestartPromptVisible() {
    if (typeof GameOverScreen !== "undefined" && GameOverScreen.isVisible) {
      return GameOverScreen.isVisible();
    }
    const el = getRestartPromptEl();
    return !!(el && !el.classList.contains("is-hidden"));
  }

  function handleSpaceKey() {
    if (!state.keyboard.SPACE) {
      state.keyboard.SPACE = true;
      if (state.world) state.world.tryThrowObject();
    }
  }

  function noteActivity() {
    if (state.keyboard) state.keyboard.lastActivity = Date.now();
  }

  function getKeyCode(e) {
    if (typeof e.keyCode === "number" && e.keyCode !== 0) return e.keyCode;
    if (e.key && typeof e.key === "string" && e.key.length === 1) {
      const ch = e.key.toUpperCase();
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) return code;
    }
    return undefined;
  }

  function handleKeyDownEvents_code(code) {
    const k = state.keyboard;
    switch (code) {
      case 39:
        k.RIGHT = true;
        break;
      case 37:
        k.LEFT = true;
        break;
      case 38:
        k.UP = true;
        break;
      case 40:
        k.DOWN = true;
        break;
      case 32:
        handleSpaceKey();
        break;
      case 68:
        k.D = true;
        break;
      case 70:
        k.F = true;
        break;
      case 74:
        k.J = true;
        break;
      case 78:
        k.N = true;
        break;
      case 45:
        k.ZERO = true;
        break;
      case 77:
        k.M = true;
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

  function handleKeyDown(e) {
    noteActivity();
    const code = getKeyCode(e);
    const promptVisible = isRestartPromptVisible();

    if (state.world && !state.world.running) {
      if (promptVisible) {
        if (![74, 78].includes(code)) return;
      } else {
        if (code !== 80) return;
      }
    }

    if (state.gamePaused && code !== 80) return;
    handleKeyDownEvents_code(code);
  }

  function handleKeyUpEvents(e) {
    const k = state.keyboard;
    switch (e.keyCode) {
      case 39:
        k.RIGHT = false;
        break;
      case 37:
        k.LEFT = false;
        break;
      case 38:
        k.UP = false;
        break;
      case 40:
        k.DOWN = false;
        break;
      case 32:
        k.SPACE = false;
        break;
      case 68:
        k.D = false;
        break;
      case 77:
        k.M = false;
        break;
      case 74:
        k.J = false;
        break;
      case 78:
        k.N = false;
        break;
      case 45:
        k.ZERO = false;
        break;
      case 80:
        k.PAUSE = false;
        break;
      default:
        break;
    }
  }

  function togglePause() {
    if (!state.gamePaused) pauseGame();
    else if (!state.countdownActive) startCountdown();
  }

  function pauseGame() {
    state.gamePaused = true;
    if (state.world) state.world.pauseGame();
    PauseScreen.showOverlay();
    SoundManager.pauseAllSounds();
    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  function startCountdown() {
    state.countdownActive = true;
    if (state.world) state.world.pauseGame();
    PauseScreen.showCountdown(() => resumeAfterCountdown());
  }

  function resumeAudioForWorld() {
    if (SoundManager.isMuted) return;
    const boss = state.world?.level?.boss;
    const playBoss = !!(boss && boss.contactWithCharacter && !boss.isDead);
    SoundManager.stopBackground();
    SoundManager.playBackground(playBoss ? "bossMusic" : "music");
  }

  function resumeAfterCountdown() {
    if (!SoundManager.isMuted) speak("GO!");
    if (state.world) state.world.resumeGame();
    state.gamePaused = false;
    state.countdownActive = false;
    PauseScreen.clearOverlay();
    resumeAudioForWorld();
    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  function speak(text) {
    const speech = new SpeechSynthesisUtterance(String(text));
    speech.lang = "de-DE";
    window.speechSynthesis.speak(speech);
  }

  function isElementVisible(id, hiddenClass) {
    const el = document.getElementById(id);
    return !!(el && !el.classList.contains(hiddenClass));
  }

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

  function init(level = level1) {
    clearAllIntervals();
    state.canvas = document.getElementById("canvas");
    state.canvas.width = 720;
    state.canvas.height = 480;
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    state.world = new World(state.canvas, state.keyboard, level);
    if (typeof CancelOverlay !== "undefined" && CancelOverlay.updateAbortButtonVisibility)
      CancelOverlay.updateAbortButtonVisibility();
  }

  function resetGame() {
    clearAllIntervals();
    stopAnimations();
    removeEventListeners();
    state.world = null;
    init(createLevel1());
  }

  function updateUiVisibility() {
    updateOrientationBodyClass();
    updateMobileControlsVisibility();
    if (typeof CancelOverlay !== "undefined" && CancelOverlay.updateAbortButtonVisibility)
      CancelOverlay.updateAbortButtonVisibility();
  }

  function updateOrientationBodyClass() {
    const mq = window.matchMedia("(orientation: landscape)");
    const isLandscapeByMedia = mq.matches;
    const isPortraitByRatio = window.innerHeight > window.innerWidth;
    const treatAsPortrait = !isLandscapeByMedia && isPortraitByRatio;
    document.body.classList.toggle("is-portrait", treatAsPortrait);
  }

  function isTouchDevice() {
    return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  }

  function isLandscapeViewport() {
    return (
      window.matchMedia("(orientation: landscape)").matches ||
      window.innerWidth >= window.innerHeight
    );
  }

  function updateMobileControlsVisibility() {
    const mobileControls = document.getElementById("mobileControls");
    if (!mobileControls) return;
    const shouldShow =
      isTouchDevice() &&
      isLandscapeViewport() &&
      !document.body.classList.contains("is-portrait") &&
      !isOverlayBlockingMobileControls() &&
      !!(state.world && state.world.running === true) &&
      !state.gamePaused &&
      !state.countdownActive;
    mobileControls.classList.toggle("overlay-hidden", !shouldShow);
  }

  function withPrevent(fn) {
    return (e) => {
      e.preventDefault();
      noteActivity();
      fn();
    };
  }

  function attachTouch(btn, onStart, onEnd) {
    if (!btn) return;
    btn.addEventListener("touchstart", onStart, { passive: false });
    btn.addEventListener("touchend", onEnd, { passive: false });
  }

  function initMobileControls() {
    const map = [
      ["btn-left", "LEFT"],
      ["btn-right", "RIGHT"],
      ["btn-jump", "UP"],
    ];
    map.forEach(([id, key]) =>
      attachTouch(
        document.getElementById(id),
        withPrevent(() => (state.keyboard[key] = true)),
        withPrevent(() => (state.keyboard[key] = false))
      )
    );
    attachTouch(
      document.getElementById("btn-throw"),
      withPrevent(() => handleSpaceKey()),
      withPrevent(() => (state.keyboard.SPACE = false))
    );
  }

  window.addEventListener("keydown", (e) => handleKeyDown(e));
  window.addEventListener("keyup", (e) => handleKeyUpEvents(e));

  document.addEventListener("DOMContentLoaded", () => {
    SoundManager.init();
    EndScreen.init();
    if (typeof AssetLoader !== "undefined" && AssetLoader.preloadImages) {
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

  return {
    get state() {
      return state;
    },
    get canvas() {
      return state.canvas;
    },
    get world() {
      return state.world;
    },
    get keyboard() {
      return state.keyboard;
    },
    get gamePaused() {
      return state.gamePaused;
    },
    get countdownActive() {
      return state.countdownActive;
    },
    setStoppableInterval,
    clearAllIntervals,
    init,
    resetGame,
    resizeCanvas,
    updateUiVisibility,
    resumeAudioForWorld,
    togglePause,
  };
})();

window.game = Game;

/**
 * Initialises the game with the given level. Exposed globally for HTML/event handlers.
 * @param {Level} [level=level1] - Level instance to run.
 */
function init(level = level1) {
  Game.init(level);
}

/** Resets the game and restarts level 1. */
function resetGame() {
  Game.resetGame();
}

function showRestartPrompt() {
  GameOverScreen.show();
}

function isRestartPromptVisible() {
  if (typeof GameOverScreen !== "undefined" && GameOverScreen.isVisible) {
    return GameOverScreen.isVisible();
  }
  const el = document.getElementById("restartPrompt");
  return !!(el && !el.classList.contains("is-hidden"));
}

function showPauseScreen() {
  PauseScreen.showOverlay();
}

function clearPauseScreen() {
  PauseScreen.clearOverlay();
}

function updateUiVisibility() {
  Game.updateUiVisibility();
}

function checkOrientation() {
  Game.updateUiVisibility();
}

function resumeAudioForWorld() {
  Game.resumeAudioForWorld();
}

function clearAllIntervals() {
  Game.clearAllIntervals();
}

function setStoppableInterval(fn, time) {
  Game.setStoppableInterval(fn, time);
}

function togglePause() {
  Game.togglePause();
}
