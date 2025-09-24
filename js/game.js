let canvas;
let world;
let keyboard = new Keyboard();
let restartTimeout;
let gamePaused = false;
let countdownActive = false;
let musicOn = false;
let intervalIds = [];
let i = 1;

/**
 * Creates a stoppable interval and stores its id.
 * @param {Function} fn - Function to execute.
 * @param {number} time - Interval time in ms.
 */
function setStoppableInterval(fn, time) {
    const id = setInterval(fn, time);
    intervalIds.push(id);
}

document.addEventListener("DOMContentLoaded", () => {
    // Startscreen ist jetzt im HTML, also KEIN showStartScreen() mehr
    addSoundIcon();
    initMobileControls();
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
});

/** Initialises the game. */
function init() {
    clearAllIntervals();
    canvas = document.getElementById("canvas");
    const baseWidth = 720;
    const baseHeight = 480;
    canvas.width = baseWidth;
    canvas.height = baseHeight;

    resizeCanvas(); // gleich beim Start anpassen
    window.addEventListener("resize", resizeCanvas);
    world = new World(canvas, keyboard);
}

function resizeCanvas() {
    const scaleX = window.innerWidth / canvas.width;
    const scaleY = window.innerHeight / canvas.height;
    const scale = Math.min(scaleX, scaleY); // proportionaler Faktor

    // CSS-Größe anpassen
    canvas.style.width = canvas.width * scale + "px";
    canvas.style.height = canvas.height * scale + "px";
}

/** Resets the game state. */
function resetGame() {
    clearAllIntervals();
    stopAnimations();
    removeEventListeners();
    world = null;
    world = new World(canvas, keyboard);
}

/** Clears all running intervals and timeouts. */
function clearAllIntervals() {
    const highestId = setTimeout(() => {}, 0);
    for (let id = 0; id <= highestId; id++) {
        clearTimeout(id);
        clearInterval(id);
    }
}

/** Stops running animations of the character. */
function stopAnimations() {
    if (world && world.character.animationInterval) {
        clearInterval(world.character.animationInterval);
    }
}

/** Removes key event listeners. */
function removeEventListeners() {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
}

/** Shows a restart prompt overlay. */
function showRestartPrompt() {
    if (document.getElementById("restartPrompt")) return;
    const prompt = createRestartPrompt();
    document.body.appendChild(prompt);
    document.removeEventListener("keydown", this.handleRestartEvent);
    this.handleRestartEvent = (e) => handleRestartKeys(e, this);
    document.addEventListener("keydown", this.handleRestartEvent);
}

/** Creates the restart prompt element. */
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
 * @param {KeyboardEvent} event - Key event.
 * @param {object} ctx - Context object for prompt.
 */
function handleRestartKeys(event, ctx) {
    const key = event.key.toLowerCase();
    if (key === "n") window.location.reload();
    else if (key === "j") ctx.closeRestartPrompt();
}

/** Closes the restart prompt and reinitialises the game. */
function closeRestartPrompt() {
    const restartPrompt = document.getElementById("restartPrompt");
    if (restartPrompt) {
        restartPrompt.remove();
        document.removeEventListener("keydown", this.handleRestartEvent);
        init();
    }
}

/** Adds a sound toggle icon to the DOM. */
function addSoundIcon() {
    const soundIcon = document.createElement("img");
    soundIcon.id = "sound-toggle";
    soundIcon.src = "imgs/logos/musicOff.png";
    Object.assign(soundIcon.style, {
        position: "fixed", right: "10px", width: "30px",
        cursor: "pointer", zIndex: "100"
    });
    document.body.appendChild(soundIcon);
    soundIcon.addEventListener("click", () => SoundManager.toggleSound());
}

/** Toggles game music on/off. */
function toggleMusic() {
    const soundIcon = document.getElementById("sound-toggle");
    if (!musicPlay.paused) disableMusic(soundIcon);
    else enableMusicPlay(soundIcon);
    musicOn = !musicOn;
}

/**
 * Disables music and updates icon.
 * @param {HTMLElement} icon - Sound icon.
 */
function disableMusic(icon) {
    musicPlay.pause();
    icon.src = "imgs/logos/musicOff.png";
}

/**
 * Enables music and updates icon.
 * @param {HTMLElement} icon - Sound icon.
 */
function enableMusicPlay(icon) {
    musicPlay.currentTime = 0;
    musicPlay.play();
    icon.src = "imgs/logos/musicOn.png";
}

/** Global keydown listener. */
window.addEventListener("keydown", (e) => {
    if (gamePaused && e.keyCode !== 80) return;
    handleKeyDownEvents(e);
});

/**
 * Handles keydown events.
 * @param {KeyboardEvent} e - Key event.
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
        case 90: if (!musicOn) toggleMusic(); break;
        case 84: if (musicOn) toggleMusic(); break;
    }
}

/** Handles space key action (throw bottle). */
function handleSpaceKey() {
    if (!keyboard.SPACE) {
        keyboard.SPACE = true;
        if (world) world.tryThrowObject();
    }
}

/** Global keyup listener. */
window.addEventListener("keyup", (e) => handleKeyUpEvents(e));

/**
 * Handles keyup events.
 * @param {KeyboardEvent} e - Key event.
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

/** Toggles game pause/resume with countdown. */
function togglePause() {
    if (!gamePaused) pauseGame();
    else if (!countdownActive) {
        clearPauseScreen();
        startCountdown();
    }
}

/** Pauses the game and shows overlay. */
function pauseGame() {
    gamePaused = true;
    world.pauseGame();
    drawPauseScreen();
}

/** Starts countdown before resuming game. */
function startCountdown() {
    countdownActive = true;
    let count = 5;
    const countDownStep = () => {
        if (count > 0) {
            console.log(count);
            speak(count);
            count--;
            setTimeout(countDownStep, 2300);
        } else resumeAfterCountdown();
    };
    countDownStep();
}

/** Resumes the game after countdown. */
function resumeAfterCountdown() {
    console.log("GO!");
    speak("GO!");
    world.resumeGame();
    gamePaused = false;
    countdownActive = false;
}

/**
 * Speaks a given text using speech synthesis.
 * @param {string} text - Text to speak.
 */
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "de-DE";
    window.speechSynthesis.speak(speech);
}

/** Draws the pause overlay. */
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

/** Enables music playback. */
function enableMusic() {
    if (!musicOn) {
        musicOn = true;
        musicPlay.play();
    }
}

/** Mobile Controls initialisieren */
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
            e.preventDefault();
            keyboard[key] = true;
        }, { passive: false });

        btn.addEventListener("touchend", (e) => {
            e.preventDefault();
            keyboard[key] = false;
        }, { passive: false });
    });

    // Flaschenwurf → direkt Spiellogik triggern
    const throwBtn = document.getElementById("btn-throw");
    if (throwBtn) {
        throwBtn.addEventListener("touchstart", (e) => {
            e.preventDefault();
            handleSpaceKey();
        }, { passive: false });
        throwBtn.addEventListener("touchend", (e) => {
            e.preventDefault();
            keyboard.SPACE = false;
        }, { passive: false });
    }
}

/** Prüft, ob das Gerät im Quer- oder Hochformat ist */
function checkOrientation() {
    const warning = document.getElementById("rotate-warning");
    const canvasEl = document.getElementById("canvas");

    if (window.innerHeight > window.innerWidth) {
        // Hochformat → Hinweis zeigen, Spiel verstecken
        warning.style.display = "flex";
        canvasEl.style.display = "none";
    } else {
        // Querformat → Spiel zeigen
        warning.style.display = "none";
        canvasEl.style.display = "block";
    }
}
