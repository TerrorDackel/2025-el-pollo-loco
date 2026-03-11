// === js/i18n.js
/**
 * Simple i18n for UI strings. Supports German (DE) and English (EN).
 * Mark elements with data-i18n="key" for textContent and data-i18n-aria="key" for aria-label;
 * applyTranslations() runs on DOMContentLoaded and when setLanguage() is called.
 * Language is persisted in localStorage under key "el-pollo-loco-lang".
 * @module i18n
 */
(function () {
  const STORAGE_KEY = "el-pollo-loco-lang";

  const I18N = {
    de: {
      skip_link: "Direkt zum Spiel springen",
      a11y_note:
        "Hinweis zur Barrierefreiheit: Dieses Spiel basiert vollständig auf einer visuellen Canvas-Darstellung. Für Nutzerinnen und Nutzer, die ausschließlich mit Screenreader arbeiten, ist das Gameplay nur eingeschränkt oder gar nicht zugänglich. Die Spielregeln und das Impressum stehen als Text zur Verfügung.",
      sound_alt: "Musik ein- oder ausschalten",
      abort_alt: "Spiel abbrechen und zum Startmenü zurückkehren",
      canvas_aria: "Spieloberfläche des Jump-and-Run Spiels El Pollo Loco",
      gameover_title: "Game over!",
      gameover_question: "Traust du dich nochmal?",
      gameover_restart_aria: "Spiel neu starten (Taste J)",
      gameover_yes: "\u00a0= Ja, diesen Chicken's werde ich's zeigen!",
      gameover_no_aria: "Spiel beenden und Spielregeln lesen (Taste N)",
      gameover_no: "\u00a0= Nein, ich check erst mal die Spielregeln.",
      cancel_title: "Spiel beenden?",
      cancel_question: "Willst du wirklich das Spiel aufgeben?",
      cancel_yes_aria: "Spiel beenden und zum Start zurückkehren (Taste J)",
      cancel_yes: "\u00a0= ja, das Spiel beenden.",
      cancel_no_aria: "Weiter spielen (Taste N)",
      cancel_no: "\u00a0= Nein auf keinen Fall, ich möchte weiter spielen!",
      start_title: "Willkommen bei\u00a0",
      start_title2: "El Pollo Loco",
      btn_start: "▶️ Spiel starten",
      btn_start_aria: "Spiel starten",
      btn_rules: "🕹️ Spielregeln",
      btn_rules_aria: "Spielregeln anzeigen",
      btn_impressum: "ℹ️ Impressum",
      btn_impressum_aria: "Impressum anzeigen",
      loading_text: "Lade Spielgrafiken…",
      rules_title: "Spielregeln:",
      rules_1: "⬅️ Pfeil links: Pepe läuft nach links.",
      rules_2: "➡️ Pfeil rechts: Pepe läuft nach rechts.",
      rules_3: "⬆️ Pfeil oben: Pepe springt.",
      rules_4: "SPACE (Leer): Pepe wirft eine Flasche.",
      rules_5: "🔇 T = Musik aus, 🔊 Z = Musik an.",
      rules_6: "⏯️ P = Pause starten/beenden.",
      rules_back: "⬅️ Zurück",
      rules_back_aria: "Zurück zum Startbildschirm",
      impressum_title: "Impressum:",
      impressum_back_aria: "Zurück zum Startbildschirm",
      pause_title: "PAUSE",
      pause_line1: "zum beenden der Pause",
      pause_line2: "und starten des Countdowns",
      pause_btn_aria: "Pause beenden (Taste P)",
      pause_line3: "drücken",
      rotate_1: "Drehe ins Querformat,",
      rotate_2: "um zu spielen.",
      mobile_aria: "Mobile Steuerung für El Pollo Loco",
      btn_left_aria: "Nach links laufen",
      btn_right_aria: "Nach rechts laufen",
      btn_throw_aria: "Flasche werfen",
      btn_jump_aria: "Springen",
      endscreen_title: "Herzlichen Glückwunsch !",
      btn_end_back: "⬅️ zurück zum Start",
      btn_end_back_aria: "Zurück zum Startbildschirm",
      btn_end_restart: "🔁 Versuch's nochmal",
      btn_end_restart_aria: "Spiel erneut starten",
      stat_chickens: "🐓 Normale Hühner:",
      stat_chickenBigs: "🐔 Große Hühner:",
      stat_chickenSmalls: "🐥 Kleine Hühner:",
      stat_hearts: "❤️ Leben:",
      stat_coins: "🪙 Münzen:",
      stat_time: "⏱️ Zeit: %s Sekunden",
      lang_de: "DE",
      lang_en: "EN",
      lang_group_aria: "Sprache wählen",
    },
    en: {
      skip_link: "Skip to game",
      a11y_note:
        "Accessibility note: This game is entirely visual (canvas). For screen-reader-only users, gameplay may be limited or unavailable. Rules and legal info are available as text.",
      sound_alt: "Toggle music on or off",
      abort_alt: "Abort game and return to start menu",
      canvas_aria: "Game canvas for jump-and-run game El Pollo Loco",
      gameover_title: "Game over!",
      gameover_question: "Want to try again?",
      gameover_restart_aria: "Restart game (key J)",
      gameover_yes: "\u00a0= Yes, I'll show those chickens!",
      gameover_no_aria: "End game and read rules (key N)",
      gameover_no: "\u00a0= No, I'll check the rules first.",
      cancel_title: "Quit game?",
      cancel_question: "Do you really want to quit?",
      cancel_yes_aria: "Quit and return to start (key J)",
      cancel_yes: "\u00a0= Yes, quit the game.",
      cancel_no_aria: "Keep playing (key N)",
      cancel_no: "\u00a0= No way, I want to keep playing!",
      start_title: "Welcome to\u00a0",
      start_title2: "El Pollo Loco",
      btn_start: "▶️ Start game",
      btn_start_aria: "Start game",
      btn_rules: "🕹️ Rules",
      btn_rules_aria: "Show rules",
      btn_impressum: "ℹ️ Legal",
      btn_impressum_aria: "Show legal / imprint",
      loading_text: "Loading game graphics…",
      rules_title: "Rules:",
      rules_1: "⬅️ Left arrow: Pepe runs left.",
      rules_2: "➡️ Right arrow: Pepe runs right.",
      rules_3: "⬆️ Up arrow: Pepe jumps.",
      rules_4: "SPACE: Pepe throws a bottle.",
      rules_5: "🔇 T = Mute, 🔊 Z = Unmute.",
      rules_6: "⏯️ P = Pause / resume.",
      rules_back: "⬅️ Back",
      rules_back_aria: "Back to start screen",
      impressum_title: "Legal / Imprint:",
      impressum_back_aria: "Back to start screen",
      pause_title: "PAUSE",
      pause_line1: "To end pause",
      pause_line2: "and start countdown",
      pause_btn_aria: "End pause (key P)",
      pause_line3: "press",
      rotate_1: "Rotate to landscape,",
      rotate_2: "to play.",
      mobile_aria: "Mobile controls for El Pollo Loco",
      btn_left_aria: "Run left",
      btn_right_aria: "Run right",
      btn_throw_aria: "Throw bottle",
      btn_jump_aria: "Jump",
      endscreen_title: "Congratulations!",
      btn_end_back: "⬅️ Back to start",
      btn_end_back_aria: "Back to start screen",
      btn_end_restart: "🔁 Try again",
      btn_end_restart_aria: "Restart game",
      stat_chickens: "🐓 Chickens:",
      stat_chickenBigs: "🐔 Big chickens:",
      stat_chickenSmalls: "🐥 Small chickens:",
      stat_hearts: "❤️ Lives:",
      stat_coins: "🪙 Coins:",
      stat_time: "⏱️ Time: %s seconds",
      lang_de: "DE",
      lang_en: "EN",
      lang_group_aria: "Choose language",
    },
  };

  let currentLang =
    (typeof localStorage !== "undefined" && localStorage.getItem(STORAGE_KEY)) || "de";
  if (I18N[currentLang] === undefined) currentLang = "de";

  /**
   * Returns the translation for key in the current language.
   * @param {string} key - Translation key.
   * @returns {string} Translated string or key if missing.
   */
  function t(key) {
    const map = I18N[currentLang];
    return (map && map[key]) || key;
  }

  /**
   * Sets the UI language and reapplies all translations.
   * @param {string} lang - 'de' or 'en'.
   */
  function setLanguage(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    if (typeof localStorage !== "undefined") localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "en" ? "en" : "de";
    applyTranslations();
  }

  /**
   * Applies current language to all elements with data-i18n or data-i18n-aria.
   */
  function applyTranslations() {
    const map = I18N[currentLang];
    if (!map) return;
    document.documentElement.lang = currentLang === "en" ? "en" : "de";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (map[key] != null) el.textContent = map[key];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (map[key] == null) return;
      el.setAttribute("aria-label", map[key]);
      if (el.alt !== undefined) el.alt = map[key];
    });
    updateLangActiveState();
  }

  /**
   * Sets .active on the current language button, removes it from the other.
   */
  function updateLangActiveState() {
    const langDe = document.getElementById("lang-de");
    const langEn = document.getElementById("lang-en");
    if (langDe) langDe.classList.toggle("active", currentLang === "de");
    if (langEn) langEn.classList.toggle("active", currentLang === "en");
  }

  if (typeof document !== "undefined" && document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyTranslations);
  } else if (typeof document !== "undefined") {
    applyTranslations();
  }

  window.I18N = I18N;
  window.t = t;
  window.setLanguage = setLanguage;
  window.getLanguage = function () {
    return currentLang;
  };
})();


// === models/keyboard.class.js
/**
 * Represents the keyboard input state for the game.
 * Each property indicates whether a specific key is currently pressed.
 */
class Keyboard {
  /** @type {boolean} Whether the Left Arrow key is pressed (move left). */
  LEFT = false;

  /** @type {boolean} Whether the Right Arrow key is pressed (move right). */
  RIGHT = false;

  /** @type {boolean} Whether the Up Arrow key is pressed (jump). */
  UP = false;

  /** @type {boolean} Whether the Down Arrow key is pressed (currently unused). */
  DOWN = false;

  /** @type {boolean} Whether the Space key is pressed (throw bottle). */
  SPACE = false;

  /** @type {boolean} Prevents bottle-throw autofire when SPACE is held down. */
  SPACE_PRESSED = false;

  /** @type {boolean} Whether the D key is pressed (custom use). */
  D = false;

  /** @type {boolean} Whether the F key is pressed (toggle fullscreen). */
  F = false;

  /** @type {boolean} Whether the P key is pressed (pause game). */
  P = false;

  /** @type {boolean} Indicates current pause state (true = paused). */
  PAUSE = false;

  /** @type {boolean} Whether the T key is pressed (turn music off). */
  T = false;

  /** @type {boolean} Whether the Z key is pressed (turn music on). */
  Z = false;

  /** @type {boolean} Whether the I key is pressed (show information, triggers pause). */
  INFO = false;

  /** @type {boolean} Whether the M key is pressed (open menu). */
  MENU = false;

  /** @type {boolean} Whether the Enter key is pressed (confirm / proceed). */
  ENTER = false;

  /** @type {boolean} Whether the E key is pressed (custom use). */
  E = false;

  /** @type {boolean} Whether the Escape key is pressed (exit / close dialog). */
  ESC = false;

  /** @type {boolean} Whether the J key is pressed (play again: yes). */
  J = false;

  /** @type {boolean} Whether the N key is pressed (play again: no). */
  N = false;

  /** @type {number} Timestamp of the last input activity (ms since epoch). */
  lastActivity = Date.now(); /* used for idle */

  /**
   * Returns whether any action key/button is currently pressed.
   * This is used to decide if idle animation is allowed.
   * @returns {boolean}
   */
  isAnyActionPressed() {
    /* keep it explicit for clarity; extend if new inputs are added */
    return !!(
      this.LEFT ||
      this.RIGHT ||
      this.UP ||
      this.DOWN ||
      this.SPACE ||
      this.D ||
      this.F ||
      this.M ||
      this.J ||
      this.N ||
      this.PAUSE
    );
  }
}


// === models/drawableObject.class.js
/**
 * Represents any drawable object in the game.
 * Provides basic image loading, drawing and debugging utilities.
 */
class DrawableObject {
  /** @type {number} X-coordinate of the object on the canvas. */
  x = 120;

  /** @type {number} Y-coordinate of the object on the canvas. */
  y = 280;

  /** @type {number} Height of the object. */
  height = 200;

  /** @type {number} Width of the object. */
  width = 100;

  /** @type {HTMLImageElement | undefined} The current image of the object. */
  img;

  /** @type {number} Top offset for collision box. */
  offsetTop = 40;

  /** @type {number} Bottom offset for collision box. */
  offsetBottom = -20;

  /** @type {number} Right offset for collision box. */
  offsetRight = 40;

  /** @type {number} Left offset for collision box. */
  offsetLeft = 15;

  /** @type {Object.<string, HTMLImageElement>} Cache for health bar images. */
  imageCacheHealth = {};

  /** @type {Object.<string, HTMLImageElement>} Cache for coin images. */
  imageCacheCoins = {};

  /** @type {Object.<string, HTMLImageElement>} Cache for bottle images. */
  imageCacheBottles = {};

  /** @type {Object.<string, HTMLImageElement>} General image cache for animations. */
  imageCache = {};

  /** @type {number} Index of the current animation frame. */
  currentImage = 0;

  /**
   * Loads a single image for the object.
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {
    const hasGlobalCache =
      typeof AssetLoader !== "undefined" && AssetLoader.imageCache && AssetLoader.imageCache[path];
    if (hasGlobalCache) {
      this.img = AssetLoader.imageCache[path];
      return;
    }
    const img = new Image();
    img.onerror = () => {
      console.warn("[DrawableObject] Image failed to load:", path);
    };
    img.src = path;
    this.img = img;
    if (typeof AssetLoader !== "undefined" && AssetLoader.imageCache) {
      AssetLoader.imageCache[path] = img;
    }
  }

  /**
   * Loads multiple images for animations and stores them in cache.
   * @param {string[]} arr - Array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img =
        typeof AssetLoader !== "undefined" && AssetLoader.imageCache
          ? AssetLoader.imageCache[path]
          : undefined;
      if (!img) {
        img = new Image();
        img.onerror = () => {
          console.warn("[DrawableObject] Image failed to load:", path);
        };
        img.src = path;
        if (typeof AssetLoader !== "undefined" && AssetLoader.imageCache) {
          AssetLoader.imageCache[path] = img;
        }
      }
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws a red rectangle around throwable objects for debugging.
   * @param {CanvasRenderingContext2D} ctx - The drawing context.
   */
  rectangleThrowableObject(ctx) {
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
    ctx.restore();
  }

  /**
   * Draws the object and optional debug frames.
   * Automatically adds debug outlines for certain object types.
   * @param {CanvasRenderingContext2D} ctx - The drawing context.
   */
  draw(ctx) {
    if (!this.img) return;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a blue frame for characters and chickens.
   * @param {CanvasRenderingContext2D} ctx - The drawing context.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(
        this.x + this.offsetLeft,
        this.y + this.offsetTop,
        this.width - this.offsetRight - this.offsetLeft,
        this.height - this.offsetBottom - this.offsetTop
      );
      ctx.stroke();
    }
  }

  /**
   * Loads images into the health cache.
   * @param {string[]} arr - Array of image paths.
   */
  loadImagesHealth(arr) {
    arr.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imageCacheHealth[path] = img;
    });
  }

  /**
   * Loads images into the coins cache.
   * @param {string[]} arr - Array of image paths.
   */
  loadImagesCoins(arr) {
    arr.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imageCacheCoins[path] = img;
    });
  }

  /**
   * Loads images into the bottles cache.
   * @param {string[]} arr - Array of image paths.
   */
  loadImagesBottles(arr) {
    arr.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imageCacheBottles[path] = img;
    });
  }
}


// === models/movable.object.class.js
/**
 * Represents a movable object in the game world.
 * Extends {@link DrawableObject} to provide movement, gravity, collision detection
 * and energy states (hit, hurt, dead).
 */
class MovableObject extends DrawableObject {
  /** @type {number} Horizontal movement speed. */
  speed = 0.25;

  /** @type {boolean} Whether the object is facing the opposite direction (mirrored). */
  otherDirection = false;

  /** @type {number} Vertical speed for jumps and gravity. */
  speedY = 20;

  /** @type {number} Acceleration applied to vertical speed (gravity). */
  acceleration = 3;

  /** @type {number} Remaining energy (health points). */
  energy = 5;

  /** @type {number} Timestamp of the last hit in ms since epoch. */
  lastHit = 0;

  /**
   * Applies gravity to the object with continuous updates.
   * Decreases {@link speedY} until the object reaches the ground.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above ground level.
   * ThrowableObjects are always treated as above ground.
   * @returns {boolean} True if above ground, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObjects) return true;
    return this.y < 100;
  }

  /**
   * Checks collision between this object and another.
   * Uses object offsets to improve hitbox accuracy.
   * @param {MovableObject} mo - The other movable object.
   * @returns {boolean} True if colliding, otherwise false.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offsetRight >= mo.x + mo.offsetLeft &&
      this.x - this.offsetLeft <= mo.x + mo.width - mo.offsetRight &&
      this.y + this.height - this.offsetBottom >= mo.y + mo.offsetTop &&
      this.y + this.offsetTop <= mo.y + mo.height - mo.offsetBottom
    );
  }

  /**
   * Handles the object being hit and reduces energy by 1.
   * Sets {@link lastHit} for later {@link isHurt} checks.
   */
  hit() {
    this.energy -= 1;
    if (this.energy < 0) this.energy = 0;
    else this.lastHit = Date.now();
  }

  /**
   * Checks if the object was recently hurt (within 3 seconds).
   * @returns {boolean} True if hurt recently.
   */
  isHurt() {
    const timepassed = (Date.now() - this.lastHit) / 3000;
    return timepassed < 1;
  }

  /**
   * Checks if the object is dead (no energy left).
   * @returns {boolean} True if dead.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Loads multiple images and stores them in the cache for animations.
   * @param {string[]} arr - Array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img =
        typeof AssetLoader !== "undefined" && AssetLoader.imageCache
          ? AssetLoader.imageCache[path]
          : undefined;
      if (!img) {
        img = new Image();
        img.src = path;
        if (typeof AssetLoader !== "undefined" && AssetLoader.imageCache) {
          AssetLoader.imageCache[path] = img;
        }
      }
      this.imageCache[path] = img;
    });
  }

  /**
   * Plays an animation by cycling through the given images.
   * Sets {@link img} to the current frame and advances {@link currentImage}.
   * @param {string[]} images - Array of image paths.
   */
  playAnimation(images) {
    const i = this.currentImage % images.length;
    const path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /** Moves the object right by increasing {@link x}. */
  moveRight() {
    this.x += this.speed;
  }

  /** Moves the object left by decreasing {@link x}. */
  moveLeft() {
    this.x -= this.speed;
  }

  /** Makes the object jump by setting {@link speedY} to a positive value. */
  jump() {
    this.speedY = 35;
  }
}


// === models/character.class.js
/**
 * Represents the main character controlled by the player.
 * Extends MovableObject to provide movement, collision and animation.
 */
class Character extends MovableObject {
  height = 300;
  width = 150;
  x = 0;
  y = 110;
  speed = 10;

  /** Independent throttle for IDLE frame rate (ms per frame). */
  idleAnimMs = 100; /* <- kleiner = schnelleres Idle-Framewechseln */

  /** Independent throttle for JUMP frame rate (ms per frame). */
  jumpAnimMs = 90; /* <- kleiner = schnelleres Jump-Framewechseln */

  /** Internal timestamp markers for throttled animations. */
  _lastIdleFrameAt = 0;
  _lastJumpFrameAt = 0;

  /**
   * Image paths for idle animation.
   * @type {string[]}
   */
  IMAGES_IDLE = [
    "./imgs/2_character_pepe/1_idle/idle/I-1.png",
    "./imgs/2_character_pepe/1_idle/idle/I-2.png",
    "./imgs/2_character_pepe/1_idle/idle/I-3.png",
    "./imgs/2_character_pepe/1_idle/idle/I-4.png",
    "./imgs/2_character_pepe/1_idle/idle/I-5.png",
    "./imgs/2_character_pepe/1_idle/idle/I-6.png",
    "./imgs/2_character_pepe/1_idle/idle/I-7.png",
    "./imgs/2_character_pepe/1_idle/idle/I-8.png",
    "./imgs/2_character_pepe/1_idle/idle/I-9.png",
    "./imgs/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_SLEEP = [
    "./imgs/2_character_pepe/1_idle/long_idle/I-11.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-12.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-13.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-14.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-15.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-16.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-17.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-18.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-19.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /**
   * Image paths for walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "./imgs/2_character_pepe/2_walk/W-21.png",
    "./imgs/2_character_pepe/2_walk/W-22.png",
    "./imgs/2_character_pepe/2_walk/W-23.png",
    "./imgs/2_character_pepe/2_walk/W-24.png",
    "./imgs/2_character_pepe/2_walk/W-25.png",
    "./imgs/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Image paths for jumping animation.
   * @type {string[]}
   */
  IMAGES_JUMPING = [
    "./imgs/2_character_pepe/3_jump/J-31.png",
    "./imgs/2_character_pepe/3_jump/J-32.png",
    "./imgs/2_character_pepe/3_jump/J-33.png",
    "./imgs/2_character_pepe/3_jump/J-34.png",
    "./imgs/2_character_pepe/3_jump/J-35.png",
    "./imgs/2_character_pepe/3_jump/J-36.png",
    "./imgs/2_character_pepe/3_jump/J-37.png",
    "./imgs/2_character_pepe/3_jump/J-38.png",
    "./imgs/2_character_pepe/3_jump/J-39.png",
    "./imgs/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Image paths for hurt animation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "./imgs/2_character_pepe/4_hurt/H-41.png",
    "./imgs/2_character_pepe/4_hurt/H-42.png",
    "./imgs/2_character_pepe/4_hurt/H-43.png",
  ];

  /**
   * Image paths for death animation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "./imgs/2_character_pepe/5_dead/D-51.png",
    "./imgs/2_character_pepe/5_dead/D-52.png",
    "./imgs/2_character_pepe/5_dead/D-53.png",
    "./imgs/2_character_pepe/5_dead/D-54.png",
    "./imgs/2_character_pepe/5_dead/D-55.png",
    "./imgs/2_character_pepe/5_dead/D-56.png",
    "./imgs/2_character_pepe/5_dead/D-57.png",
  ];

  /** @type {number} Interval ID for animation loop. */
  animationInterval;

  /** @type {number} Number of collected bottles. */
  collectedBottles = 0;

  /** @type {number} Stores the previous bottom position for stomp detection. */
  prevBottom = 0;

  /**
   * Creates a new Character instance.
   */
  constructor() {
    super();
    this.initImages();
    this.applyGravity();
    this.setOffsets();
    this.energy = 5;
    this.prevBottom = this.getBox(this).bottom;
  }

  /** Load all sprite images for the character. */
  initImages() {
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEP);
    this.loadImages(this.IMAGES_DEAD);
  }

  /** Sets collision offsets for the character. */
  setOffsets() {
    this.offsetTop = 100;
    this.offsetBottom = 10;
    this.offsetLeft = 10;
    this.offsetRight = 10;
  }

  /**
   * Connects the character with the game world.
   * @param {World} world - The game world instance.
   */
  setWorld(world) {
    this.world = world;
  }

  /** Adds a collected bottle to the character’s inventory. */
  addBottle() {
    this.collectedBottles++;
  }

  /** Starts the main animation loop. */
  animate() {
    this.animationInterval = setInterval(() => {
      SoundManager.pauseSound("walking");
      this.handleMovement();
      this.updateCamera();
      this.updateAnimation();
      this.checkCollisionWithEnemies();
      this.prevBottom = this.getBox(this).bottom;
    }, 1000 / 30);
  }

  /** Pauses the animation loop. */
  pauseAnimation() {
    clearInterval(this.animationInterval);
  }

  /** Resumes the animation loop. */
  resumeAnimation() {
    this.animate();
  }

  /** Handles player movement based on input. */
  handleMovement() {
    if (!this.world?.running) return;
    this.handleRightMovement();
    this.handleLeftMovement();
    this.handleJump();
  }

  /** Handles movement to the right. */
  handleRightMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      SoundManager.playSound("walking");
    }
  }

  /** Handles movement to the left. */
  handleLeftMovement() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      SoundManager.playSound("walking");
    }
  }

  /** Handles jump movement. */
  handleJump() {
    if (this.world.keyboard.UP && !this.isAboveGround()) {
      this.jump();
      SoundManager.playSound("jumping");
    }
  }

  /** Updates the camera position relative to the character. */
  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Selects and plays the appropriate animation for the current state.
   * Priority order: dead → hurt → jump → idle/sleep → walking.
   * Idle starts immediately when no action is pressed.
   * Sleep replaces idle after 15s of uninterrupted idle.
   */
  updateAnimation() {
    if (this.isDead()) {
      this.handleDeath();
      return;
    }
    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.idleStartAt = 0;
      return;
    }
    if (this.isAboveGround()) {
      this.playAnimIfDue(this.IMAGES_JUMPING, "_lastJumpFrameAt", this.jumpAnimMs);
      this.idleStartAt = 0;
      return;
    }

    if (this.shouldPlayIdle()) {
      if (!this.idleStartAt) this.idleStartAt = Date.now();
      const idleElapsed = Date.now() - this.idleStartAt;
      const idlePhaseMs = 15000; // 15 seconds of idle before sleep
      if (idleElapsed >= idlePhaseMs) {
        this.playAnimIfDue(this.IMAGES_SLEEP, "_lastIdleFrameAt", this.idleAnimMs);
      } else {
        this.playAnimIfDue(this.IMAGES_IDLE, "_lastIdleFrameAt", this.idleAnimMs);
      }
    } else {
      this.idleStartAt = 0;
      this.handleWalkingAnimation();
    }
  }

  /**
   * Returns whether idle is allowed right now.
   * Idle is allowed when no action key is currently pressed.
   * Idle starts immediately (no delay).
   * @returns {boolean}
   */
  shouldPlayIdle() {
    const kb = this.world?.keyboard;
    if (!kb) return false;
    if (kb.isAnyActionPressed()) return false;
    return true; // immediate idle when nothing is pressed
  }

  /** Plays walking animation when moving horizontally. */
  handleWalkingAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Plays an animation only if the per-channel throttle has elapsed.
   * @param {string[]} images - frames list
   * @param {"_lastIdleFrameAt"|"*"_} lastProp - timestamp field to use
   * @param {number} ms - throttle in ms
   */
  playAnimIfDue(images, lastProp, ms) {
    const now = Date.now();
    const last = this[lastProp] || 0;
    if (now - last < ms) return;
    this[lastProp] = now;
    this.playAnimation(images);
  }

  /** Handles the death sequence of the character. */
  handleDeath() {
    if (!this.deadAnimationPlayed) {
      this.playAnimation(this.IMAGES_DEAD);
      SoundManager.playSound("dead");
      /* world continues to tick animations, but movement is locked via handleMovement() */
      setTimeout(() => {
        this.deadAnimationPlayed = true;
        showRestartPrompt();
        this.world.running = false; /* ensure stopped state for inputs and game loop */
      }, 1000);
    }
  }

  /** Initiates a jump. */
  jump() {
    this.speedY = 33;
  }

  /**
   * Returns collision box of an object.
   * @param {MovableObject} o - The object to get the box for.
   * @returns {{left: number, right: number, top: number, bottom: number}}
   */
  getBox(o) {
    return {
      left: o.x + (o.offsetLeft || 0),
      right: o.x + o.width - (o.offsetRight || 0),
      top: o.y + (o.offsetTop || 0),
      bottom: o.y + o.height - (o.offsetBottom || 0),
    };
  }

  /**
   * Determines if the character stomps an enemy.
   * @param {MovableObject} enemy - The enemy to check against.
   * @returns {boolean} True if stomping, false otherwise.
   */
  isStomping(enemy) {
    const meNow = this.getBox(this);
    const en = this.getBox(enemy);
    const xOverlap = meNow.right > en.left && meNow.left < en.right;
    const wasAbove = this.prevBottom <= en.top;
    const hitTop = meNow.bottom >= en.top;
    const result = xOverlap && wasAbove && hitTop;
    return result;
  }

  /** Checks collision with all enemies in the world. */
  checkCollisionWithEnemies() {
    this.world.enemies.forEach((enemy, i) => {
      if (this.isStomping(enemy)) this.handleStomp(enemy, i);
      else if (this.isColliding(enemy) && !this.isHurt()) {
        this.takeDamage();
      }
    });

    const boss = this.world.level.boss;
    if (boss) this.checkCollisionWithBoss(boss);
  }

  /**
   * Checks collision with the boss.
   * @param {MovableObject} boss - The boss enemy.
   */
  checkCollisionWithBoss(boss) {
    if (this.isStomping(boss)) this.handleBossStomp(boss);
    else if (this.isColliding(boss) && !this.isHurt()) {
      this.takeDamage();
    }
  }

  /**
   * Handles stomping a normal enemy.
   * @param {MovableObject} enemy - The enemy that was stomped.
   * @param {number} index - Index of the enemy in the array.
   */
  handleStomp(enemy, index) {
    if (typeof enemy.die === "function") enemy.die();
    this.world.enemies.splice(index, 1);
    this.speedY = 20;
    this.y = enemy.y - this.height;
  }

  /**
   * Handles stomping the boss.
   * @param {MovableObject} boss - The boss enemy.
   */
  handleBossStomp(boss) {
    if (typeof boss.hitByBottle === "function") boss.hitByBottle();
    this.speedY = 20;
    this.y = boss.y - this.height;
  }

  /** Handles character taking damage. */
  takeDamage() {
    this.hit();
    this.world.statusBar.setPersentageHealth(this.energy);
  }
}


// === models/throwableObjects.class.js
/**
 * Represents a throwable salsa bottle in the game world.
 * Extends {@link MovableObject} to inherit movement, gravity, collision and animation.
 */
class ThrowableObjects extends MovableObject {
  /** @type {string[]} Image set for rotating (flying) bottles. */
  IMAGES_THROWBOTTLES = [
    "./imgs/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./imgs/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./imgs/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./imgs/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /** @type {string[]} Image set for smashing bottles (splash effect). */
  IMAGES_SMASHINGBOTTLES = [
    "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates a new throwable bottle and starts its movement/animation.
   * @param {number} x - Initial x position.
   * @param {number} y - Initial y position.
   * @param {World} world - Reference to the current game world.
   * @param {boolean} [facingLeft=false] - Direction of throw. True = left, false = right.
   */
  constructor(x, y, world, facingLeft = false) {
    super();
    this.loadImage(this.IMAGES_THROWBOTTLES[0]); // ✅ fixes undefined img
    this.loadImages(this.IMAGES_THROWBOTTLES);
    this.loadImages(this.IMAGES_SMASHINGBOTTLES);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 60;
    this.debugMode = true;
    this.world = world;
    this.hasHit = false;
    /** @type {number} Horizontal velocity (depends on facing). */
    this.vx = facingLeft ? -10 : 10;
    this.animate();
    this.throw();
  }

  /**
   * Draws the bottle on canvas while isolating state changes.
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   */
  draw(ctx) {
    if (!this.img) {
      console.warn("[ThrowableObjects.draw] WARNING: img is undefined!");
    }
    ctx.save();
    super.draw(ctx);
    ctx.restore();
  }

  /**
   * Checks if bottle is above ground level.
   * @returns {boolean} True if above ground, otherwise false.
   */
  isAboveGround() {
    return this.y < 330;
  }

  /** Starts main animation loop for throwing and smashing. */
  animate() {
    let timeoutSet = false;
    const interval = setInterval(() => {
      if (this.isAboveGround()) this.animateThrow();
      else this.animateSmash(interval, timeoutSet);
    }, 100);
  }

  /** Plays rotation animation while flying and checks collisions. */
  animateThrow() {
    this.playAnimation(this.IMAGES_THROWBOTTLES);
    this.checkBottleEnemyCollision();
  }

  /**
   * Plays smash animation and removes bottle afterwards.
   * @param {number} interval - The interval ID for clearing.
   * @param {boolean} timeoutSet - Ensures smash timeout is set only once.
   */
  animateSmash(interval, timeoutSet) {
    if (!timeoutSet) {
      timeoutSet = true;
      this.currentImage = 0;
      setTimeout(() => this.removeAfter(interval), 300);
    }
    this.playAnimation(this.IMAGES_SMASHINGBOTTLES);
    SoundManager.playSound("smashBottle");
  }

  /**
   * Removes bottle after smash animation is done.
   * @param {number} interval - The interval ID to clear.
   */
  removeAfter(interval) {
    clearInterval(interval);
    const index = this.world.throwableObjects.indexOf(this);
    if (index !== -1) this.world.throwableObjects.splice(index, 1);
  }

  /** Applies gravity and horizontal movement to the bottle. */
  throw() {
    this.speedY = 10;
    this.applyGravity();
    setInterval(() => {
      if (this.isAboveGround()) {
        this.x += this.vx;
      }
    }, 1000 / 50);
  }

  /** Checks collisions of the bottle with boss or enemies. */
  checkBottleEnemyCollision() {
    if (this.hasHit || !this.world) return;
    if (this.tryHitBoss()) return;
    this.tryHitEnemies();
  }

  /**
   * Tries to hit the endboss with the bottle.
   * @returns {boolean} True if boss was hit.
   */
  tryHitBoss() {
    const boss = this.world.level?.boss;
    if (boss && this.isBottleColliding(boss)) {
      this.hasHit = true;
      boss.hitByBottle();
      this.removeBottle();
      return true;
    }
    return false;
  }

  /** Tries to hit smaller enemies with the bottle. */
  tryHitEnemies() {
    this.world.enemies?.forEach((enemy, index) => {
      if (this.isBottleColliding(enemy)) {
        this.hasHit = true;
        if (enemy instanceof Endboss) enemy.hitByBottle();
        else {
          enemy.die();
          this.world.enemies.splice(index, 1);
        }
        this.removeBottle();
      }
    });
  }

  /** Removes this bottle from the world’s throwableObjects list. */
  removeBottle() {
    const index = this.world.throwableObjects.indexOf(this);
    if (index !== -1) this.world.throwableObjects.splice(index, 1);
  }

  /**
   * Checks bounding-box collision between bottle and enemy.
   * @param {MovableObject} enemy - The enemy to test against.
   * @returns {boolean} True if colliding.
   */
  isBottleColliding(enemy) {
    return (
      this.x + this.width > enemy.x &&
      this.x < enemy.x + enemy.width &&
      this.y + this.height > enemy.y &&
      this.y < enemy.y + enemy.height
    );
  }
}


// === models/chicken.class.js
/**
 * Represents a chicken enemy in the game world.
 * Extends MovableObject to inherit movement and collision behaviour.
 */
class Chicken extends MovableObject {
  /** @type {number} Height of the chicken. */
  height = 70;
  /** @type {number} Width of the chicken. */
  width = 70;
  /** @type {boolean} Whether the chicken is dead. */
  isDead = false;
  /** @type {World|null} World reference injected by World.setWorld(). */
  world = null;

  /**
   * Sprite images used for the walking animation of the chicken.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "imgs/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "imgs/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * Sprite image used for the dead state of the chicken.
   * @type {string[]}
   */
  IMAGES_DEAD = ["./imgs/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /** Creates a new Chicken instance. */
  constructor() {
    super();
    this.initImages();
    this.setInitialPosition();
    this.animate();
    this.moveLeft();
    this.setRandomSpeed();
    this.setOffsets();
  }

  /** Loads all images required for walking and dead states. */
  initImages() {
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
  }

  /** Sets the initial spawn position of the chicken on the game map. */
  setInitialPosition() {
    this.x = 500 + Math.random() * 3000;
    this.y = 315;
  }

  /** Assigns a random movement speed to the chicken. */
  setRandomSpeed() {
    this.speed = 0.3 + Math.random() * 0.5;
  }

  /** Configures the hitbox offsets of the chicken for collisions. */
  setOffsets() {
    this.offsetTop = -10;
    this.offsetBottom = -10;
    this.offsetLeft = -10;
    this.offsetRight = -10;
  }

  /** Inject world reference (called by World.setWorld()). */
  setWorld(world) {
    this.world = world;
  }

  /**
   * Starts the walking animation loop for the chicken.
   * Moves the chicken continuously to the left and cycles walking frames.
   */
  animate() {
    this.walkingInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 7);
  }

  /**
   * Kills the chicken and starts the death animation.
   * Increments the normal chicken kill counter in {@link World}.
   */
  die() {
    this.isDead = true;
    this.playAnimation(this.IMAGES_DEAD);
    SoundManager.playSound("chickenDead");
    if (this.world) this.world.killedChickens++;
    setTimeout(() => this.removeFromGame(), 500);
  }

  /** Removes the chicken instance from the game world enemy array. */
  removeFromGame() {
    const index = this.world?.level?.enemies.indexOf(this);
    if (index > -1) this.world.level.enemies.splice(index, 1);
  }
}


// === models/chickensmall.class.js
/**
 * Represents a small chicken enemy in the game world.
 * Extends MovableObject to inherit movement and collision behaviour.
 */
class Chickensmall extends MovableObject {
  /** @type {number} Height of the small chicken. */
  height = 50;
  /** @type {number} Width of the small chicken. */
  width = 50;
  /** @type {boolean} Whether the small chicken is dead. */
  isDead = false;
  /** @type {World|null} World reference injected by World.setWorld(). */
  world = null;

  /**
   * Sprite images used for the walking animation of the small chicken.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "imgs/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "imgs/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "imgs/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Sprite image used for the dead state of the small chicken.
   * @type {string[]}
   */
  IMAGES_DEAD = ["./imgs/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /** Creates a new Chickensmall instance. */
  constructor() {
    super();
    this.initImages();
    this.setInitialPosition();
    this.setRandomSpeed();
    this.setOffsets();
    this.animate();
  }

  /** Loads all images required for walking and dead states. */
  initImages() {
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
  }

  /** Sets the initial spawn position of the small chicken on the game map. */
  setInitialPosition() {
    this.x = 600 + Math.random() * 3500;
    this.y = 340;
  }

  /** Assigns a random movement speed for the small chicken. */
  setRandomSpeed() {
    this.speed = 0.9 + Math.random() * 0.9;
  }

  /** Configures the hitbox offsets of the small chicken for collisions. */
  setOffsets() {
    this.offsetTop = -10;
    this.offsetBottom = -10;
    this.offsetLeft = -10;
    this.offsetRight = -10;
  }

  /** Inject world reference (called by World.setWorld()). */
  setWorld(world) {
    this.world = world;
  }

  /**
   * Kills the small chicken and triggers the death animation.
   * Increments the small chicken kill counter in {@link World}.
   */
  die() {
    this.isDead = true;
    this.playAnimation(this.IMAGES_DEAD);
    SoundManager.playSound("chickenDead");
    if (this.world) this.world.killedChickenSmalls++;
    setTimeout(() => this.removeFromGame(), 500);
  }

  /** Removes the small chicken instance from the game world enemy array. */
  removeFromGame() {
    const index = this.world?.level?.enemies.indexOf(this);
    if (index > -1) this.world.level.enemies.splice(index, 1);
  }

  /** Starts both the walking and animation loops of the small chicken. */
  animate() {
    this.startWalkingLoop();
    this.startAnimationLoop();
  }

  /** Handles continuous walking movement and animation playback. */
  startWalkingLoop() {
    this.walkingInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

  /** Handles animation frame switching depending on the state (alive or dead). */
  startAnimationLoop() {
    this.animationInterval = setInterval(() => {
      if (this.isDead) this.playAnimation(this.IMAGES_DEAD);
      else this.playAnimation(this.IMAGES_WALKING);
    }, 130);
  }
}

const ChickenSmall = Chickensmall;


// === models/chickenBig.class.js
/**
 * Represents a big chicken enemy (mini-boss) in the game world.
 * Extends MovableObject to inherit movement and collision behaviour.
 */
class ChickenBig extends MovableObject {
  /** @type {number} Height of the big chicken. */
  height = 150;
  /** @type {number} Width of the big chicken. */
  width = 150;
  /** @type {boolean} Whether the big chicken is dead. */
  isDead = false;
  /** @type {World|null} World reference injected by World.setWorld(). */
  world = null;

  /**
   * Sprite images used for the walking animation of the big chicken.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "/imgs/4_enemie_boss_chicken/1_walk/G1.png",
    "/imgs/4_enemie_boss_chicken/1_walk/G2.png",
    "/imgs/4_enemie_boss_chicken/1_walk/G3.png",
    "/imgs/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /**
   * Sprite image used for the dead state of the big chicken.
   * @type {string[]}
   */
  IMAGES_DEAD = ["imgs/4_enemie_boss_chicken/5_dead/G26.png"];

  /** Creates a new ChickenBig instance. */
  constructor() {
    super();
    this.initImages();
    this.setInitialPosition();
    this.speed = 1;
    this.animate();
    this.moveLeft();
    this.setOffsets();
  }

  /** Loads all images required for walking and dead states. */
  initImages() {
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
  }

  /** Sets the initial spawn position of the big chicken on the game map. */
  setInitialPosition() {
    this.x = 3500;
    this.y = 255;
  }

  /** Configures the hitbox offsets of the big chicken for collisions. */
  setOffsets() {
    this.offsetTop = -10;
    this.offsetBottom = -10;
    this.offsetLeft = -10;
    this.offsetRight = -10;
  }

  /** Inject world reference (called by World.setWorld()). */
  setWorld(world) {
    this.world = world;
  }

  /**
   * Kills the big chicken and triggers the death animation.
   * Increments the big chicken kill counter in {@link World}.
   */
  die() {
    this.isDead = true;
    this.playAnimation(this.IMAGES_DEAD);
    SoundManager.playSound("chickenDead");
    if (this.world) this.world.killedChickenBigs++;
    setTimeout(() => this.removeFromGame(), 500);
  }

  /** Removes the big chicken instance from the game world enemy array. */
  removeFromGame() {
    const index = this.world?.level?.enemies.indexOf(this);
    if (index > -1) this.world.level.enemies.splice(index, 1);
  }

  /** Starts both the walking and animation loops of the big chicken. */
  animate() {
    this.startWalkingLoop();
    this.startAnimationLoop();
  }

  /** Continuously moves the big chicken to the left while it is alive. */
  startWalkingLoop() {
    this.walkingInterval = setInterval(() => {
      if (!this.isDead) this.moveLeft();
    }, 1000 / 60);
  }

  /** Handles the animation frames depending on the state (alive or dead). */
  startAnimationLoop() {
    this.animationInterval = setInterval(() => {
      if (this.isDead) this.playAnimation(this.IMAGES_DEAD);
      else this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}


// === models/cloud.class.js
/**
 * Represents a cloud in the background of the game world.
 * Extends MovableObject to allow slow horizontal movement across the scene.
 */
class Cloud extends MovableObject {
  /**
   * Default height of the cloud sprite.
   * @type {number}
   */
  height = 200;

  /**
   * Default width of the cloud sprite.
   * @type {number}
   */
  width = 700;

  /**
   * Creates a new Cloud instance at a randomized position in the sky.
   * Loads the cloud image, assigns random position and starts movement.
   */
  constructor() {
    super();
    this.loadImage("./imgs/5_background/layers/4_clouds/1.png");
    this.setRandomPosition();
    this.animate();
  }

  /**
   * Sets a random starting position for the cloud on the map.
   * Randomizes both horizontal (x) and vertical (y) position.
   */
  setRandomPosition() {
    this.x = -100 + Math.random() * 3400;
    this.y = -50 + Math.random() * 150;
  }

  /**
   * Starts the movement of the cloud with a continuous loop.
   * Uses requestAnimationFrame so movement is smooth and independent of World.draw().
   * Note: We intentionally do not hook into World.freeze to keep clouds unaffected by pause.
   */
  animate() {
    /* Original one-shot movement removed because it moved only once. */
    /* this.moveLeft(); this.speed = 0.15 + Math.random() * 0.15; */ /* Commented: single step was insufficient */
    this.speed = 0.15 + Math.random() * 0.15;
    const step = () => {
      this.moveLeft();
      this._rafId = requestAnimationFrame(step);
    };
    this._rafId = requestAnimationFrame(step);
  }
}


// === models/backgroundobjects.class.js
/**
 * BackgroundObject represents static scenery elements (e.g. sky, mountains, ground)
 * that move relative to the camera but are not interactive.
 * Extends MovableObject to reuse drawing and positioning logic.
 */
class BackgroundObject extends MovableObject {
  /**
   * Constructs a background object and initialises its visual representation.
   * @param {string} imagePath - File path to the image asset.
   * @param {number} xBg - Horizontal position in the world.
   * @param {number} yBg - Vertical position in the world.
   * @param {number} heightBg - Height in pixels.
   * @param {number} widthBg - Width in pixels.
   */
  constructor(imagePath, xBg, yBg, heightBg, widthBg) {
    super();
    this.loadAndSetImage(imagePath, xBg, yBg, heightBg, widthBg);
  }

  /**
   * Loads the given image and applies size and position to this object.
   * @param {string} imagePath - File path to the image asset.
   * @param {number} xBg - Horizontal position in the world.
   * @param {number} yBg - Vertical position in the world.
   * @param {number} heightBg - Height in pixels.
   * @param {number} widthBg - Width in pixels.
   */
  loadAndSetImage(imagePath, xBg, yBg, heightBg, widthBg) {
    this.loadImage(imagePath, xBg, yBg, heightBg, widthBg);
    this.x = xBg;
    this.y = yBg;
    this.height = heightBg;
    this.width = widthBg;
  }
}


// === models/coins.class.js
/**
 * Represents a collectible coin in the game world.
 * Extends DrawableObject to be drawn, animated and collected by the character.
 */
class Coins extends DrawableObject {
  /**
   * Paths to coin animation frames.
   * @type {string[]}
   */
  IMAGES_COINS = [
    "./imgs/8_coin/Gold_1.png",
    "./imgs/8_coin/Gold_2.png",
    "./imgs/8_coin/Gold_3.png",
    "./imgs/8_coin/Gold_4.png",
    "./imgs/8_coin/Gold_5.png",
    "./imgs/8_coin/Gold_6.png",
    "./imgs/8_coin/Gold_7.png",
    "./imgs/8_coin/Gold_8.png",
    "./imgs/8_coin/Gold_9.png",
    "./imgs/8_coin/Gold_10.png",
  ];

  /** @type {number} X-coordinate of the coin on the map. */
  x = 150;

  /** @type {number} Y-coordinate of the coin on the map. */
  y = 150;

  /** @type {number} Width of the coin sprite. */
  width = 25;

  /** @type {number} Height of the coin sprite. */
  height = 25;

  /** @type {number} Rotation angle (not currently used). */
  rotation = 0;

  /** @type {number} Index of the currently displayed image frame. */
  currentImage = 0;

  /** @type {HTMLImageElement[]} Loaded image frames for animation. */
  images = [];

  /** @type {number} Vertical speed (unused in static coins). */
  speedY = 20;

  /** @type {number} Gravity acceleration (unused in static coins). */
  acceleration = 3;

  /** @type {boolean} Flag indicating if all images are loaded. */
  loaded = false;

  /** @type {Promise<HTMLImageElement>[]} Promises for preloading coin images. */
  loadImagePromises = [];

  /**
   * Creates a new Coins instance and loads its images.
   * Initialises image loading and animation cycle.
   */
  constructor() {
    super();
    this.loadAllImages();
    this.initAnimation();
  }

  /**
   * Prepares image promises for all coin animation frames.
   * Each image is preloaded before animation begins.
   */
  loadAllImages() {
    this.loadImagePromises = this.IMAGES_COINS.map(
      (path) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => {
            console.warn("[Coins] Bild konnte nicht geladen werden:", path);
            resolve(null);
          };
          img.src = path;
        })
    );
  }

  /**
   * Resolves all image promises and starts animation after loading.
   * Initialises the animation cycle.
   */
  initAnimation() {
    Promise.all(this.loadImagePromises).then((images) => {
      this.images = images.filter(Boolean);
      this.currentImage = 0;
      this.loaded = true;
      this.animate();
    });
  }

  /**
   * Draws the coin on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The drawing context.
   */
  draw(ctx) {
    if (!this.loaded || this.images.length === 0) return;
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.drawImage(
      this.images[this.currentImage],
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }

  /**
   * Starts the coin animation cycle.
   * Cycles through all loaded image frames in fixed intervals.
   */
  animate() {
    setInterval(() => {
      if (this.loaded && this.images.length > 0) {
        this.currentImage = (this.currentImage + 1) % this.images.length;
      }
    }, 200);
  }

  /**
   * Checks if this coin collides with another object.
   * @param {DrawableObject} collectableObject - The object to check collision against.
   * @returns {boolean} True if colliding, otherwise false.
   */
  isColliding(collectableObject) {
    return (
      this.x + this.width > collectableObject.x &&
      this.x < collectableObject.x + collectableObject.width &&
      this.y + this.height > collectableObject.y &&
      this.y < collectableObject.y + collectableObject.height
    );
  }

  /**
   * Checks collisions between the character and coins.
   * If a collision is detected, the coin will be collected.
   */
  checkCollisionCoins() {
    this.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.collectCoin(index);
      }
    });
  }

  /**
   * Handles the collection of a coin.
   * Removes it from the array, plays sound and updates the status bar.
   * @param {number} index - The index of the coin to remove.
   */
  collectCoin(index) {
    SoundManager.playSound("coin");
    this.coins.splice(index, 1);
    this.statusBar.setPersentageCoins(this.score++);
  }

  /**
   * Empty override to prevent missing method errors.
   * @param {CanvasRenderingContext2D} ctx - Unused.
   */
  drawFrame(ctx) {
    /* not used for coins */
  }
}


// === models/bottles.class.js
/**
 * Represents a bottle item in the game world.
 * Bottles are static, collectible objects without logic.
 * Extends DrawableObject for rendering support.
 */
class Bottle extends DrawableObject {
  /**
   * Initialises a new bottle instance with size and default image.
   */
  constructor() {
    super();
    this.loadImage("./imgs/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.width = 60;
    this.height = 80;
  }
}


// === models/endboss.class.js
/**
 * Represents the endboss enemy in the game world.
 * Extends MovableObject to inherit movement, collision and animation behaviour.
 */
class Endboss extends MovableObject {
  /** @type {number} Height of the endboss. */
  height = 260;

  /** @type {number} Width of the endboss. */
  width = 260;

  /** @type {number} Y-coordinate of the endboss on the canvas. */
  y = 0;

  /** @type {number} Movement speed of the endboss. */
  speed = 5;

  /** @type {number} Energy level of the endboss (health points). */
  energy = 5;

  /** @type {boolean} Whether the endboss is in angry state. */
  isAngry = false;

  /** @type {boolean} Whether the endboss is currently hurt. */
  isHurt = false;

  /** @type {boolean} Whether the endboss has made contact with the character. */
  contactWithCharacter = false;

  /** @type {boolean} Whether the endboss is dead. */
  isDead = false;

  /** @type {number} Top offset of the collision box. */
  offsetTop = 50;

  /** @type {number} Bottom offset of the collision box. */
  offsetBottom = 0;

  /** @type {number} Left offset of the collision box. */
  offsetLeft = 50;

  /** @type {number} Right offset of the collision box. */
  offsetRight = 50;

  /** @type {boolean} Internal flag to prevent duplicate move intervals. */
  _moveIntervalStarted = false;

  /** @type {string[]} Walk animation image paths. */
  IMAGES_WALK = [
    "./imgs/4_enemie_boss_chicken/1_walk/G1.png",
    "./imgs/4_enemie_boss_chicken/1_walk/G2.png",
    "./imgs/4_enemie_boss_chicken/1_walk/G3.png",
    "./imgs/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /** @type {string[]} Hurt animation image paths. */
  IMAGES_HURTING = [
    "./imgs/4_enemie_boss_chicken/4_hurt/G21.png",
    "./imgs/4_enemie_boss_chicken/4_hurt/G22.png",
    "./imgs/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /** @type {string[]} Angry animation: alert (G5–G12) then walk (G1–G4) for a continuous “angry walking” loop. */
  IMAGES_ANGRY = [
    "./imgs/4_enemie_boss_chicken/2_alert/G5.png",
    "./imgs/4_enemie_boss_chicken/2_alert/G6.png",
    "./imgs/4_enemie_boss_chicken/2_alert/G7.png",
    "./imgs/4_enemie_boss_chicken/2_alert/G8.png",
    "./imgs/4_enemie_boss_chicken/2_alert/G9.png",
    "./imgs/4_enemie_boss_chicken/2_alert/G10.png",
    "./imgs/4_enemie_boss_chicken/2_alert/G11.png",
    "./imgs/4_enemie_boss_chicken/2_alert/G12.png",
    "./imgs/4_enemie_boss_chicken/1_walk/G1.png",
    "./imgs/4_enemie_boss_chicken/1_walk/G2.png",
    "./imgs/4_enemie_boss_chicken/1_walk/G3.png",
    "./imgs/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /** @type {string[]} Dead animation image paths. */
  IMAGES_DEAD = [
    "./imgs/4_enemie_boss_chicken/5_dead/G24.png",
    "./imgs/4_enemie_boss_chicken/5_dead/G25.png",
    "./imgs/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates a new Endboss instance and loads all resources.
   */
  constructor() {
    super();
    this.initImages();
    this.setInitialPosition();
    this.speed = 0.8;
    this.debugMode = true;
    this.animate();
  }

  /** Loads all image sets for the endboss. */
  initImages() {
    this.loadImage(this.IMAGES_WALK[0]);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_HURTING);
    this.loadImages(this.IMAGES_ANGRY);
    this.loadImages(this.IMAGES_DEAD);
  }

  /** Sets the initial position of the endboss. */
  setInitialPosition() {
    this.x = 3400;
    this.y = 160;
  }

  /**
   * Assigns the game world reference.
   * @param {object} world - The current game world instance.
   */
  setWorld(world) {
    this.world = world;
  }

  /** Triggers contact with the character and switches to boss music. */
  letEndbossTouch() {
    this.contactWithCharacter = true;
    SoundManager.stopBackground();
    SoundManager.playBackground("bossMusic");
    this.isAngry = true;
    this.playAngryAnimation();
  }

  /** Starts moving the boss to the left continuously. */
  endbossMoveLeft() {
    if (this._moveIntervalStarted) return;
    this._moveIntervalStarted = true;
    this._moveIntervalId = setInterval(() => {
      if (!this.isDead) this.moveLeft();
    }, 1000 / 25);
  }

  /** Handles the boss being hit by a bottle. */
  hitByBottle() {
    if (this.energy > 1) {
      this.energy--;
      this.isHurt = true;
      if (this.world?.statusBar) this.world.statusBar.setPersentageEndboss(this.energy);
      this.playHurtAnimation();
      SoundManager.playSound("endbossHit");
    } else {
      this.die();
    }
  }

  /** Plays the hurt animation and transitions to angry state. */
  playHurtAnimation() {
    const intervalId = setInterval(() => this.playAnimation(this.IMAGES_HURTING), 100);
    setTimeout(() => {
      clearInterval(intervalId);
      this.isHurt = false;
      this.isAngry = true;
      this.playAngryAnimation();
    }, this.IMAGES_HURTING.length * 250);
  }

  /** Starts the angry animation loop. */
  playAngryAnimation() {
    if (this._angryAnimStarted) return;
    this._angryAnimStarted = true;
    this._angryAnimId = setInterval(() => {
      if (!this.isHurt && this.energy > 0 && !this.isDead) {
        this.playAnimation(this.IMAGES_ANGRY);
        if (!this._angrySoundPlaying) {
          this._angrySoundPlaying = true;
          setTimeout(() => (this._angrySoundPlaying = false), 1000);
        }
      }
    }, 100);
  }

  /** Handles death of the endboss and plays death animation. */
  die() {
    this.isDead = true;
    if (this.world?.statusBar) this.world.statusBar.setPersentageEndboss(0);
    SoundManager.playSound("endbossDead");
    SoundManager.stopBackground();
    this.startDeathAnimation();
  }

  /** Starts the death animation and reloads the game after it finishes. */
  startDeathAnimation() {
    const intervalId = setInterval(() => this.playAnimation(this.IMAGES_DEAD), 100);
    setTimeout(() => {
      clearInterval(intervalId);
      if (this.world?.showEndScreen) this.world.showEndScreen();
    }, this.IMAGES_DEAD.length * 200);
  }

  /** Starts the idle walking/angry animation loop. */
  animate() {
    this._walkAnimId = setInterval(() => {
      if (this.isDead) return;
      if (!this.isHurt) this.playAnimation(this.IMAGES_WALK);
      if (this.contactWithCharacter) {
        this.playAnimation(this.IMAGES_ANGRY);
        this.endbossMoveLeft();
      }
      this.checkProximityToCharacter();
    }, 200);
  }

  /** Checks distance to character and triggers angry state when close. */
  checkProximityToCharacter() {
    if (this.world?.character) {
      const distance = Math.abs(this.x - this.world.character.x);
      if (distance < 150 && !this.isHurt) {
        this.isAngry = true;
        this.playAngryAnimation();
      }
    }
  }
}


// === models/statusBar.class.js
/**
 * Represents the status bar of the game, displaying health, coins, bottles and endboss health.
 * Extends {@link DrawableObject} so it can be drawn on the canvas.
 */
class StatusBar extends DrawableObject {
  /** @type {string[]} Image set for player health (0–100%). */
  IMAGES_HEALTHBAR = [
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /** @type {string[]} Image set for collected coins (0–100%). */
  IMAGES_COINSBAR = [
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  /** @type {string[]} Image set for collected bottles (0–100%). */
  IMAGES_BOTTLESBAR = [
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  /** @type {string[]} Image set for endboss health (0–100%). */
  IMAGES_ENDBOSSBAR = [
    "./imgs/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "./imgs/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "./imgs/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "./imgs/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "./imgs/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "./imgs/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  /** @type {number} Current player health (0–5 hearts). */
  persentageHealth = 5;

  /** @type {number} Current collected coins (0–5). */
  amountCoins = 0;

  /** @type {number} Current collected bottles (0–10). */
  amountBottles = 0;

  /** @type {number} Maximum bottle capacity (default 10). */
  maxBottles = 10;

  /** @type {number} Current endboss health (0–5 hearts). */
  endbossHealth = 5;

  /** @type {Record<string,HTMLImageElement>} Cache for health images. */
  imageCacheHealth = {};

  /** @type {Record<string,HTMLImageElement>} Cache for coin images. */
  imageCacheCoins = {};

  /** @type {Record<string,HTMLImageElement>} Cache for bottle images. */
  imageCacheBottles = {};

  /** @type {Record<string,HTMLImageElement>} Cache for endboss images. */
  imageCacheEndboss = {};

  /**
   * Creates a new StatusBar instance and loads all status bar images.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTHBAR, "health");
    this.loadImages(this.IMAGES_COINSBAR, "coins");
    this.loadImages(this.IMAGES_BOTTLESBAR, "bottles");
    this.loadImages(this.IMAGES_ENDBOSSBAR, "endboss");
    this.x = 30;
    this.y = 0;
    this.height = 50;
    this.width = 155;
    this.setPersentageHealth(5);
    this.setPersentageCoins(0);
    this.setPersentageBottles(0);
    this.setPersentageEndboss(5);
  }

  /**
   * Loads a set of images into the cache based on category.
   * @param {string[]} imageArray - Array of image paths.
   * @param {"health"|"coins"|"bottles"|"endboss"} category - Target cache.
   */
  loadImages(imageArray, category) {
    imageArray.forEach((path) => {
      const img = new Image();
      img.src = path;
      if (category === "health") this.imageCacheHealth[path] = img;
      if (category === "coins") this.imageCacheCoins[path] = img;
      if (category === "bottles") this.imageCacheBottles[path] = img;
      if (category === "endboss") this.imageCacheEndboss[path] = img;
    });
  }

  /**
   * Draws all status bars (health, coins, bottles, endboss) on the canvas.
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   */
  drawStatusBars(ctx) {
    this.drawBar(ctx, this.imgHealth, this.x, this.y);
    this.drawBar(ctx, this.imgCoins, this.x + 1.15 * this.width, this.y);
    this.drawBar(ctx, this.imgBottles, this.x + 2.25 * this.width, this.y);
    this.drawBar(ctx, this.imgEndboss, this.x + 3.35 * this.width, this.y);
  }

  /**
   * Draws a single bar image on the canvas.
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   * @param {HTMLImageElement} img - Bar image.
   * @param {number} x - X position.
   * @param {number} y - Y position.
   */
  drawBar(ctx, img, x, y) {
    ctx.drawImage(img, x, y, this.width, this.height);
  }

  /**
   * Updates health bar according to current hearts (0–5).
   * @param {number} persentageHealth - Player health.
   */
  setPersentageHealth(persentageHealth) {
    this.persentageHealth = persentageHealth;
    const index = this.resolveIndex(persentageHealth);
    this.imgHealth = this.imageCacheHealth[this.IMAGES_HEALTHBAR[index]];
  }

  /**
   * Updates coin bar according to collected coins (0–5).
   * @param {number} amountCoins - Number of coins.
   */
  setPersentageCoins(amountCoins) {
    this.amountCoins = amountCoins;
    const index = this.resolveIndex(Math.floor(amountCoins / 4));
    this.imgCoins = this.imageCacheCoins[this.IMAGES_COINSBAR[index]];
  }

  /**
   * Updates bottle bar according to collected bottles (0–5).
   * @param {number} amountBottles - Number of bottles.
   */
  setPersentageBottles(amountBottles) {
    this.amountBottles = amountBottles;
    const fraction = Math.min(amountBottles / this.maxBottles, 1);
    let index;
    if (fraction >= 1) index = 5;
    else if (fraction >= 0.8) index = 4;
    else if (fraction >= 0.6) index = 3;
    else if (fraction >= 0.4) index = 2;
    else if (fraction >= 0.2) index = 1;
    else index = 0;
    this.imgBottles = this.imageCacheBottles[this.IMAGES_BOTTLESBAR[index]];
  }

  /**
   * Sets bottle capacity for this level.
   * @param {number} max - Max bottles available in level.
   */
  setBottleCapacity(max) {
    this.maxBottles = max;
  }

  /**
   * Updates endboss bar according to current hearts (0–5).
   * @param {number} hearts - Endboss health.
   */
  setPersentageEndboss(hearts) {
    this.endbossHealth = hearts;
    this.imgEndboss = this.imageCacheEndboss[this.IMAGES_ENDBOSSBAR[hearts]];
  }

  /**
   * Resolves a numeric value (0–5) into the correct image index.
   * @param {number} value - Input value.
   * @returns {number} Index for image arrays (0–5).
   */
  resolveIndex(value) {
    if (value >= 5) return 5;
    if (value >= 4) return 4;
    if (value >= 3) return 3;
    if (value >= 2) return 2;
    if (value >= 1) return 1;
    return 0;
  }
}


// === models/level.class.js
/**
 * Represents a game level with all its entities and assets.
 * Holds references to enemies, background elements, collectibles, and the boss.
 */
class Level {
  /** @type {MovableObject[]} All enemies in the level. */
  enemies;

  /** @type {Cloud[]} Clouds in the background of the level. */
  clouds;

  /** @type {BackgroundObject[]} Static background objects (e.g., scenery). */
  backgroundObjects;

  /** @type {number} X-axis position where the level ends. */
  level_end_x = 3600;

  /** @type {Coins[]} Collectible coins placed in the level. */
  coins;

  /** @type {Bottle[]} Collectible bottles placed in the level. */
  bottles;

  /** @type {Endboss} The level’s boss enemy. */
  boss;

  /** @type {World} Reference to the world this level belongs to. */
  world;

  /**
   * Creates a new Level instance with the provided assets.
   * @param {MovableObject[]} enemies - Enemies present in the level.
   * @param {Cloud[]} clouds - Clouds in the background.
   * @param {BackgroundObject[]} backgroundObjects - Static background objects.
   * @param {Coins[]} coins - Collectible coins.
   * @param {Bottle[]} bottles - Collectible bottles.
   * @param {Endboss} boss - The level’s endboss.
   */
  constructor(enemies, clouds, backgroundObjects, coins, bottles, boss) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
    this.boss = boss;
  }
}


// === js/assetLoader.js
/**
 * Central asset preloader for game images (sprites). Ensures assets are loaded before play
 * so that first-time animations (e.g. first bottle throw) are visible.
 * @class
 */
class AssetLoader {
  /** @type {Promise<void> | null} Cached promise for idempotent preloadCoreAssets(). */
  static _corePromise = null;

  /** @type {Object.<string, HTMLImageElement>} Global image cache shared across game objects. */
  static imageCache = {};

  /** @type {Set<string>} Paths that failed to load (for logging / UI feedback). */
  static failedPaths = new Set();

  /**
   * Logs a load error and records the path. Call from onerror so preload flow can continue.
   * @param {string} path - Failed image path.
   * @private
   */
  static _handleLoadError(path) {
    AssetLoader.failedPaths.add(path);
    console.warn("[AssetLoader] Image failed to load:", path);
  }

  /**
   * Preloads all given image paths once; stores loaded images in imageCache.
   * @param {string[]} paths - Image URLs to load.
   * @returns {Promise<void>} Resolves when all loads (or errors) have completed.
   */
  static preloadImages(paths) {
    const unique = [...new Set(paths)];
    const jobs = unique.map(
      (path) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            AssetLoader.imageCache[path] = img;
            resolve();
          };
          img.onerror = () => {
            AssetLoader._handleLoadError(path);
            resolve();
          };
          img.src = path;
        })
    );
    return Promise.all(jobs).then(() => {});
  }

  /**
   * Preloads given image paths and reports progress via callback.
   * @param {string[]} paths - Image URLs to load.
   * @param {(ratio: number) => void} onProgress - Called with 0..1 as each image completes.
   * @returns {Promise<void>} Resolves when all loads (or errors) have completed.
   */
  static preloadImagesWithProgress(paths, onProgress) {
    const unique = [...new Set(paths)];
    const total = unique.length || 1;
    let loaded = 0;

    const notify = () => {
      if (typeof onProgress === "function") {
        onProgress(loaded / total);
      }
    };

    notify();

    const jobs = unique.map(
      (path) =>
        new Promise((resolve) => {
          if (AssetLoader.imageCache[path]) {
            loaded++;
            notify();
            resolve();
            return;
          }
          const img = new Image();
          img.onload = () => {
            AssetLoader.imageCache[path] = img;
            loaded++;
            notify();
            resolve();
          };
          img.onerror = () => {
            AssetLoader._handleLoadError(path);
            loaded++;
            notify();
            resolve();
          };
          img.src = path;
        })
    );

    return Promise.all(jobs).then(() => {});
  }

  /**
   * Preloads all core game sprites (character, enemies, bottles, coins). Idempotent:
   * repeated calls return the same promise.
   * @returns {Promise<void>} Resolves when all core assets are loaded or failed.
   */
  static preloadCoreAssets() {
    if (this._corePromise) return this._corePromise;

    const characterImages = [
      "./imgs/2_character_pepe/1_idle/idle/I-1.png",
      "./imgs/2_character_pepe/1_idle/idle/I-2.png",
      "./imgs/2_character_pepe/1_idle/idle/I-3.png",
      "./imgs/2_character_pepe/1_idle/idle/I-4.png",
      "./imgs/2_character_pepe/1_idle/idle/I-5.png",
      "./imgs/2_character_pepe/1_idle/idle/I-6.png",
      "./imgs/2_character_pepe/1_idle/idle/I-7.png",
      "./imgs/2_character_pepe/1_idle/idle/I-8.png",
      "./imgs/2_character_pepe/1_idle/idle/I-9.png",
      "./imgs/2_character_pepe/1_idle/idle/I-10.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-11.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-12.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-13.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-14.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-15.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-16.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-17.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-18.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-19.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-20.png",
      "./imgs/2_character_pepe/2_walk/W-21.png",
      "./imgs/2_character_pepe/2_walk/W-22.png",
      "./imgs/2_character_pepe/2_walk/W-23.png",
      "./imgs/2_character_pepe/2_walk/W-24.png",
      "./imgs/2_character_pepe/2_walk/W-25.png",
      "./imgs/2_character_pepe/2_walk/W-26.png",
      "./imgs/2_character_pepe/3_jump/J-31.png",
      "./imgs/2_character_pepe/3_jump/J-32.png",
      "./imgs/2_character_pepe/3_jump/J-33.png",
      "./imgs/2_character_pepe/3_jump/J-34.png",
      "./imgs/2_character_pepe/3_jump/J-35.png",
      "./imgs/2_character_pepe/3_jump/J-36.png",
      "./imgs/2_character_pepe/3_jump/J-37.png",
      "./imgs/2_character_pepe/3_jump/J-38.png",
      "./imgs/2_character_pepe/3_jump/J-39.png",
      "./imgs/2_character_pepe/4_hurt/H-41.png",
      "./imgs/2_character_pepe/4_hurt/H-42.png",
      "./imgs/2_character_pepe/4_hurt/H-43.png",
      "./imgs/2_character_pepe/5_dead/D-51.png",
      "./imgs/2_character_pepe/5_dead/D-52.png",
      "./imgs/2_character_pepe/5_dead/D-53.png",
      "./imgs/2_character_pepe/5_dead/D-54.png",
      "./imgs/2_character_pepe/5_dead/D-55.png",
      "./imgs/2_character_pepe/5_dead/D-56.png",
      "./imgs/2_character_pepe/5_dead/D-57.png",
    ];

    const bottleImages = [
      "./imgs/6_salsa_bottle/1_salsa_bottle_on_ground.png",
      "./imgs/6_salsa_bottle/2_salsa_bottle_on_ground.png",
      "./imgs/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
      "./imgs/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
      "./imgs/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
      "./imgs/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    const coinImages = [
      "./imgs/8_coin/Gold_1.png",
      "./imgs/8_coin/Gold_2.png",
      "./imgs/8_coin/Gold_3.png",
      "./imgs/8_coin/Gold_4.png",
      "./imgs/8_coin/Gold_5.png",
      "./imgs/8_coin/Gold_6.png",
      "./imgs/8_coin/Gold_7.png",
      "./imgs/8_coin/Gold_8.png",
      "./imgs/8_coin/Gold_9.png",
      "./imgs/8_coin/Gold_10.png",
    ];

    const chickenImages = [
      "imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "imgs/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "imgs/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
      "./imgs/3_enemies_chicken/chicken_normal/2_dead/dead.png",
      "imgs/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "imgs/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "imgs/3_enemies_chicken/chicken_small/1_walk/3_w.png",
      "./imgs/3_enemies_chicken/chicken_small/2_dead/dead.png",
    ];

    const bigChickenImages = [
      "/imgs/4_enemie_boss_chicken/1_walk/G1.png",
      "/imgs/4_enemie_boss_chicken/1_walk/G2.png",
      "/imgs/4_enemie_boss_chicken/1_walk/G3.png",
      "/imgs/4_enemie_boss_chicken/1_walk/G4.png",
      "imgs/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    const endbossImages = [
      "./imgs/4_enemie_boss_chicken/1_walk/G1.png",
      "./imgs/4_enemie_boss_chicken/1_walk/G2.png",
      "./imgs/4_enemie_boss_chicken/1_walk/G3.png",
      "./imgs/4_enemie_boss_chicken/1_walk/G4.png",
      "./imgs/4_enemie_boss_chicken/4_hurt/G21.png",
      "./imgs/4_enemie_boss_chicken/4_hurt/G22.png",
      "./imgs/4_enemie_boss_chicken/4_hurt/G23.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G5.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G6.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G7.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G8.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G9.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G10.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G11.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G12.png",
      "./imgs/4_enemie_boss_chicken/5_dead/G24.png",
      "./imgs/4_enemie_boss_chicken/5_dead/G25.png",
      "./imgs/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    const overlayBackgrounds = [
      "./imgs/9_intro_outro_screens/pause/pause-screen.png",
      "./imgs/9_intro_outro_screens/cancel/cancel.jpg",
      "./imgs/9_intro_outro_screens/game_over/game-over.jpg",
      "./imgs/5_background/happy-mexican.jpg",
      "./imgs/5_background/mex skulls.jpg",
      "./imgs/5_background/mexican-pyramide-night.jpg",
      "./imgs/5_background/smiling-mexican-girl.jpg",
    ];

    const all = [
      ...characterImages,
      ...bottleImages,
      ...coinImages,
      ...chickenImages,
      ...bigChickenImages,
      ...endbossImages,
      ...overlayBackgrounds,
    ];

    this._corePromise = this.preloadImages(all);
    return this._corePromise;
  }

  /**
   * Variante des Core-Preloads mit Fortschritts-Callback.
   * Nutzt den gleichen Bildsatz wie preloadCoreAssets().
   * @param {(ratio: number) => void} onProgress
   * @returns {Promise<void>}
   */
  static preloadCoreAssetsWithProgress(onProgress) {
    const characterImages = [
      "./imgs/2_character_pepe/1_idle/idle/I-1.png",
      "./imgs/2_character_pepe/1_idle/idle/I-2.png",
      "./imgs/2_character_pepe/1_idle/idle/I-3.png",
      "./imgs/2_character_pepe/1_idle/idle/I-4.png",
      "./imgs/2_character_pepe/1_idle/idle/I-5.png",
      "./imgs/2_character_pepe/1_idle/idle/I-6.png",
      "./imgs/2_character_pepe/1_idle/idle/I-7.png",
      "./imgs/2_character_pepe/1_idle/idle/I-8.png",
      "./imgs/2_character_pepe/1_idle/idle/I-9.png",
      "./imgs/2_character_pepe/1_idle/idle/I-10.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-11.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-12.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-13.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-14.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-15.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-16.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-17.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-18.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-19.png",
      "./imgs/2_character_pepe/1_idle/long_idle/I-20.png",
      "./imgs/2_character_pepe/2_walk/W-21.png",
      "./imgs/2_character_pepe/2_walk/W-22.png",
      "./imgs/2_character_pepe/2_walk/W-23.png",
      "./imgs/2_character_pepe/2_walk/W-24.png",
      "./imgs/2_character_pepe/2_walk/W-25.png",
      "./imgs/2_character_pepe/2_walk/W-26.png",
      "./imgs/2_character_pepe/3_jump/J-31.png",
      "./imgs/2_character_pepe/3_jump/J-32.png",
      "./imgs/2_character_pepe/3_jump/J-33.png",
      "./imgs/2_character_pepe/3_jump/J-34.png",
      "./imgs/2_character_pepe/3_jump/J-35.png",
      "./imgs/2_character_pepe/3_jump/J-36.png",
      "./imgs/2_character_pepe/3_jump/J-37.png",
      "./imgs/2_character_pepe/3_jump/J-38.png",
      "./imgs/2_character_pepe/3_jump/J-39.png",
      "./imgs/2_character_pepe/4_hurt/H-41.png",
      "./imgs/2_character_pepe/4_hurt/H-42.png",
      "./imgs/2_character_pepe/4_hurt/H-43.png",
      "./imgs/2_character_pepe/5_dead/D-51.png",
      "./imgs/2_character_pepe/5_dead/D-52.png",
      "./imgs/2_character_pepe/5_dead/D-53.png",
      "./imgs/2_character_pepe/5_dead/D-54.png",
      "./imgs/2_character_pepe/5_dead/D-55.png",
      "./imgs/2_character_pepe/5_dead/D-56.png",
      "./imgs/2_character_pepe/5_dead/D-57.png",
    ];

    const bottleImages = [
      "./imgs/6_salsa_bottle/1_salsa_bottle_on_ground.png",
      "./imgs/6_salsa_bottle/2_salsa_bottle_on_ground.png",
      "./imgs/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
      "./imgs/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
      "./imgs/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
      "./imgs/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
      "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    const coinImages = [
      "./imgs/8_coin/Gold_1.png",
      "./imgs/8_coin/Gold_2.png",
      "./imgs/8_coin/Gold_3.png",
      "./imgs/8_coin/Gold_4.png",
      "./imgs/8_coin/Gold_5.png",
      "./imgs/8_coin/Gold_6.png",
      "./imgs/8_coin/Gold_7.png",
      "./imgs/8_coin/Gold_8.png",
      "./imgs/8_coin/Gold_9.png",
      "./imgs/8_coin/Gold_10.png",
    ];

    const chickenImages = [
      "imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "imgs/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "imgs/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
      "./imgs/3_enemies_chicken/chicken_normal/2_dead/dead.png",
      "imgs/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "imgs/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "imgs/3_enemies_chicken/chicken_small/1_walk/3_w.png",
      "./imgs/3_enemies_chicken/chicken_small/2_dead/dead.png",
    ];

    const bigChickenImages = [
      "/imgs/4_enemie_boss_chicken/1_walk/G1.png",
      "/imgs/4_enemie_boss_chicken/1_walk/G2.png",
      "/imgs/4_enemie_boss_chicken/1_walk/G3.png",
      "/imgs/4_enemie_boss_chicken/1_walk/G4.png",
      "imgs/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    const endbossImages = [
      "./imgs/4_enemie_boss_chicken/1_walk/G1.png",
      "./imgs/4_enemie_boss_chicken/1_walk/G2.png",
      "./imgs/4_enemie_boss_chicken/1_walk/G3.png",
      "./imgs/4_enemie_boss_chicken/1_walk/G4.png",
      "./imgs/4_enemie_boss_chicken/4_hurt/G21.png",
      "./imgs/4_enemie_boss_chicken/4_hurt/G22.png",
      "./imgs/4_enemie_boss_chicken/4_hurt/G23.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G5.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G6.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G7.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G8.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G9.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G10.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G11.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G12.png",
      "./imgs/4_enemie_boss_chicken/5_dead/G24.png",
      "./imgs/4_enemie_boss_chicken/5_dead/G25.png",
      "./imgs/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    const overlayBackgrounds = [
      "./imgs/9_intro_outro_screens/pause/pause-screen.png",
      "./imgs/9_intro_outro_screens/cancel/cancel.jpg",
      "./imgs/9_intro_outro_screens/game_over/game-over.jpg",
      "./imgs/5_background/happy-mexican.jpg",
      "./imgs/5_background/mex skulls.jpg",
      "./imgs/5_background/mexican-pyramide-night.jpg",
      "./imgs/5_background/smiling-mexican-girl.jpg",
    ];

    const all = [
      ...characterImages,
      ...bottleImages,
      ...coinImages,
      ...chickenImages,
      ...bigChickenImages,
      ...endbossImages,
      ...overlayBackgrounds,
    ];

    return this.preloadImagesWithProgress(all, onProgress);
  }
}

/**
 * Globale Hilfsfunktion, damit startScreen.js kein Klassenwissen benötigt.
 * @returns {Promise<void>}
 */
function preloadCoreAssets() {
  return AssetLoader.preloadCoreAssets();
}

/**
 * Variante mit Fortschritts-Callback für das Lade-Overlay.
 * @param {(ratio: number) => void} onProgress
 * @returns {Promise<void>}
 */
function preloadCoreAssetsWithProgress(onProgress) {
  return AssetLoader.preloadCoreAssetsWithProgress(onProgress);
}

if (typeof window !== "undefined") {
  window.AssetLoader = AssetLoader;
}



// === levels/level1.js
/**
 * Creates Level 1 with predefined enemies, clouds, background objects and endboss.
 * Coins and bottles start empty and will be spawned later in the game.
 * @returns {Level} Level 1 instance
 */
function createLevel1() {
  const enemies = createEnemies();
  const clouds = createClouds();
  const bgObjects = createBackgroundObjects();
  const coins = [];
  const bottles = [];
  const boss = new Endboss();

  return new Level(enemies, clouds, bgObjects, coins, bottles, boss);
}

/**
 * Provides the enemy lineup for Level 1.
 * @returns {(Chicken|Chickensmall|ChickenBig)[]} Enemy instances
 */
function createEnemies() {
  const enemies = [
    new Chicken(),
    new Chicken(),
    new Chickensmall(),
    new Chicken(),
    new Chicken(),
    new Chickensmall(),
    new Chicken(),
    new ChickenBig(),
    new Chicken(),
    new Chicken(),
  ];
  return enemies;
}

/**
 * Provides the clouds for Level 1.
 * @returns {Cloud[]} Cloud instances
 */
function createClouds() {
  const clouds = [new Cloud(), new Cloud(), new Cloud(), new Cloud()];
  return clouds;
}

/**
 * Provides the background objects for Level 1.
 * Explicitly listed for full control and clarity.
 * @returns {BackgroundObject[]} Background elements
 */
function createBackgroundObjects() {
  const bg = [
    new BackgroundObject("./imgs/5_background/layers/air.png", -100, -300, 800, 720),
    new BackgroundObject("./imgs/5_background/layers/3_third_layer/1.png", -100, -300, 800, 720),
    new BackgroundObject("./imgs/5_background/layers/2_second_layer/1.png", -100, -300, 800, 720),
    new BackgroundObject("./imgs/5_background/layers/1_first_layer/1.png", -100, -300, 800, 720),

    new BackgroundObject("./imgs/5_background/layers/air.png", 620, -300, 800, 720),
    new BackgroundObject("./imgs/5_background/layers/3_third_layer/2.png", 620, -300, 800, 720),
    new BackgroundObject("./imgs/5_background/layers/2_second_layer/2.png", 620, -300, 800, 720),
    new BackgroundObject("./imgs/5_background/layers/1_first_layer/2.png", 620, -300, 800, 720),

    new BackgroundObject("./imgs/5_background/layers/air.png", 620 + 720, -300, 800, 720),
    new BackgroundObject(
      "./imgs/5_background/layers/3_third_layer/1.png",
      620 + 720,
      -300,
      800,
      720
    ),
    new BackgroundObject(
      "./imgs/5_background/layers/2_second_layer/1.png",
      620 + 720,
      -300,
      800,
      720
    ),
    new BackgroundObject(
      "./imgs/5_background/layers/1_first_layer/1.png",
      620 + 720,
      -300,
      800,
      720
    ),

    new BackgroundObject("./imgs/5_background/layers/air.png", 620 + 720 * 2, -300, 800, 720),
    new BackgroundObject(
      "./imgs/5_background/layers/3_third_layer/2.png",
      620 + 720 * 2,
      -300,
      800,
      720
    ),
    new BackgroundObject(
      "./imgs/5_background/layers/2_second_layer/2.png",
      620 + 720 * 2,
      -300,
      800,
      720
    ),
    new BackgroundObject(
      "./imgs/5_background/layers/1_first_layer/2.png",
      620 + 720 * 2,
      -300,
      800,
      720
    ),

    new BackgroundObject("./imgs/5_background/layers/air.png", 620 + 720 * 3, -300, 800, 720),
    new BackgroundObject(
      "./imgs/5_background/layers/3_third_layer/1.png",
      620 + 720 * 3,
      -300,
      800,
      720
    ),
    new BackgroundObject(
      "./imgs/5_background/layers/2_second_layer/1.png",
      620 + 720 * 3,
      -300,
      800,
      720
    ),
    new BackgroundObject(
      "./imgs/5_background/layers/1_first_layer/1.png",
      620 + 720 * 3,
      -300,
      800,
      720
    ),

    new BackgroundObject("./imgs/5_background/layers/air.png", 620 + 720 * 4, -300, 800, 720),
    new BackgroundObject(
      "./imgs/5_background/layers/3_third_layer/2.png",
      620 + 720 * 4,
      -300,
      800,
      720
    ),
    new BackgroundObject(
      "./imgs/5_background/layers/2_second_layer/2.png",
      620 + 720 * 4,
      -300,
      800,
      720
    ),
    new BackgroundObject(
      "./imgs/5_background/layers/1_first_layer/2.png",
      620 + 720 * 4,
      -300,
      800,
      720
    ),
  ];
  return bg;
}

/**
 * Exposes Level 1 as a global constant.
 * This keeps compatibility with existing game code.
 * @type {Level}
 */
const level1 = createLevel1();


// === models/world.class.js
/**
 * Represents the central game world containing the character, enemies, items and logic.
 * Manages collisions, rendering, animations and the main game loop.
 */
class World {
  /** @type {Character} The main player character. */
  character = new Character();

  /** @type {Level} Current level instance. */
  level = level1;

  /** @type {HTMLCanvasElement} Rendering surface. */
  canvas;

  /** @type {CanvasRenderingContext2D} Rendering context for the canvas. */
  ctx;

  /** @type {Keyboard} Keyboard input handler. */
  keyboard;

  /** @type {number} Camera offset along the x-axis. */
  camera_x = 0;

  /** @type {StatusBar} Displays health, coins, bottles and boss health. */
  statusBar = new StatusBar();

  /** @type {ThrowableObjects[]} Active thrown bottles in the world. */
  throwableObjects = [];

  /** @type {boolean} Indicates if the game loop is running. */
  running = true;

  /** @type {Coins[]} Coins currently placed in the level. */
  coins = [];

  /** @type {number} Current coin score. */
  score = 0;

  /** @type {Bottle[]} Bottles currently placed in the level. */
  bottles = [];

  /** @type {number} Count of killed normal chickens. */
  killedChickens = 0;

  /** @type {number} Count of killed big chickens. */
  killedChickenBigs = 0;

  /** @type {number} Count of killed small chickens. */
  killedChickenSmalls = 0;

  /** @type {number} Timestamp when the game started (ms since epoch). */
  startTime = Date.now();

  /** @type {number} ID of the current requestAnimationFrame loop. */
  _rafId = 0;

  /**
   * Creates a new World instance and initialises all game elements.
   * @param {HTMLCanvasElement} canvas - The rendering surface.
   * @param {Keyboard} keyboard - Keyboard input handler.
   * @param {Level} [level=level1] - Current level object.
   */
  constructor(canvas, keyboard, level = level1) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.statusBar = new StatusBar();
    this.level = level;
    this.setWorld();
    this.spawnCoins();
    this.spawnBottles();
    this.run();
    this.draw();
    this.character.animate();
    if (!SoundManager.isMuted) SoundManager.playBackground("music");
  }

  /** Connects the world with character, enemies and the boss. */
  setWorld() {
    this.linkCharacter();
    this.cacheEnemies();
    this.enemies.forEach((e) => this.attachWorld(e));
    this.attachWorld(this.level?.boss);
    this.enemies.forEach((e) => this.startAI(e));
    this.startAI(this.level?.boss);
  }

  /** Links the character to this world. */
  linkCharacter() {
    this.character.world = this;
  }

  /** Copies enemies array from the level for easier access. */
  cacheEnemies() {
    this.enemies = this.level?.enemies || [];
  }

  /**
   * Attaches this world instance to a given object.
   * @param {object} obj - Enemy, boss or any movable.
   */
  attachWorld(obj) {
    if (!obj) return;
    if (typeof obj.setWorld === "function") obj.setWorld(this);
    else obj.world = this;
  }

  /**
   * Starts the AI of a given object if available.
   * @param {object} obj - Object with animate() method.
   */
  startAI(obj) {
    if (!obj || obj._aiStarted || typeof obj.animate !== "function") return;
    obj._aiStarted = true;
    obj.animate();
  }

  /** Starts the main game loop and performs collision checks. */
  run() {
    this.interval = setInterval(() => {
      if (!this.running) return;
      this.checkCollisionCoins();
      this.checkCollisionBottles();
      if (this.character?.checkCollisionWithEnemies) this.character.checkCollisionWithEnemies();
      this.handleBossLogic();
    }, 50);
  }

  /** Handles proximity logic for the boss and switches background music. */
  handleBossLogic() {
    if (!this.level.boss) return;
    const boss = this.level.boss;
    const d = Math.abs(this.character.x - boss.x);

    if (d < 600 && !boss.contactWithCharacter) boss.letEndbossTouch();
    if (d >= 800 && boss.contactWithCharacter && !boss.isDead) {
      boss.contactWithCharacter = false;
      SoundManager.stopBackground();
      SoundManager.playBackground("music");
    }
  }

  /** Pauses the game loop, animations and all movables. */
  pauseGame() {
    this.running = false;
    this.character.pauseAnimation();
    this.freezeAllMovables();
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = 0;
    }
  }

  /** Resumes the game loop and all animations. */
  resumeGame() {
    this.running = true;
    this.unfreezeAllMovables();
    this.character.resumeAnimation();
    this.draw();
  }

  /** Restarts the game by creating a new world instance. */
  restartGame() {
    clearAllIntervals();
    Object.assign(this, new World(this.canvas, this.keyboard, createLevel1()));
  }

  /**
   * Creates a new set of default enemies.
   * @returns {MovableObject[]} Enemy array.
   */
  createEnemies() {
    return [new Chicken(), new ChickenBig(), new Chickensmall()];
  }

  /** Attempts to throw a bottle if inventory allows. */
  tryThrowObject() {
    if (!this.hasBottles()) return;
    const bottle = this.makeBottleForCharacter();
    this.registerBottleThrow(bottle);
    this.checkBossHit(bottle);
  }

  /** @returns {boolean} True if the character has bottles left. */
  hasBottles() {
    return this.character.collectedBottles > 0;
  }

  /**
   * Creates a new bottle at the character’s position.
   * @returns {ThrowableObjects} New throwable bottle.
   */
  makeBottleForCharacter() {
    const facingLeft = this.character.otherDirection === true;
    const x = this.character.x + (facingLeft ? -20 : 100);
    const y = this.character.y + 100;
    return new ThrowableObjects(x, y, this, facingLeft);
  }

  /**
   * Registers a thrown bottle, updates UI and plays sound.
   * @param {ThrowableObjects} bottle - The thrown bottle.
   */
  registerBottleThrow(bottle) {
    this.throwableObjects.push(bottle);
    SoundManager.playSound("whisleBottle");
    this.character.collectedBottles--;
    this.statusBar.setPersentageBottles(this.character.collectedBottles);
  }

  /**
   * Immediately checks if a thrown bottle hit the boss.
   * @param {ThrowableObjects} bottle - The thrown bottle.
   */
  checkBossHit(bottle) {
    const boss = this.level?.boss;
    if (boss && bottle.isBottleColliding(boss)) boss.hitByBottle();
  }

  /** Checks collisions between character and bottles on the map. */
  checkCollisionBottles() {
    this.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        SoundManager.playSound("collectingBottle");
        this.bottles.splice(index, 1);
        this.character.addBottle();
        this.statusBar.setPersentageBottles(this.character.collectedBottles);
      }
    });
  }

  /** Checks collisions between character and coins. */
  checkCollisionCoins() {
    this.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        SoundManager.playSound("coin");
        this.score++;
        this.statusBar.setPersentageCoins(this.score);
        this.coins.splice(index, 1);
      }
    });
  }

  /** Randomly spawns coins throughout the level. */
  spawnCoins() {
    for (let i = 0; i < 20; i++) {
      const x = 100 + Math.random() * 3000;
      const y = 100 + Math.random() * 150;
      const coin = new Coins();
      coin.x = x;
      coin.y = y;
      this.coins.push(coin);
    }
  }

  /** Randomly spawns bottles throughout the level. */
  spawnBottles() {
    for (let i = 0; i < 10; i++) {
      const x = 1000 + Math.random() * 2000;
      const y = 330;
      const bottle = new Bottle();
      bottle.x = x;
      bottle.y = y;
      this.bottles.push(bottle);
    }
  }

  /** Draws all objects in the world onto the canvas. */
  draw() {
    if (!this.running) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.statusBar.drawStatusBars(this.ctx);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.coins);
    if (this.level.boss) this.addToMap(this.level.boss);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.bottles);
    this.ctx.translate(-this.camera_x, 0);
    this._rafId = requestAnimationFrame(() => this.draw());
  }

  /**
   * Adds a list of drawable objects to the canvas.
   * @param {DrawableObject[]} objects - Objects to render.
   */
  addObjectsToMap(objects) {
    if (!objects || objects.length === 0) return;
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * Adds a single object to the canvas and applies flipping if necessary.
   * @param {DrawableObject} obj - Object to render.
   */
  addToMap(obj) {
    if (!obj) return;
    const isThrowable = obj instanceof ThrowableObjects;
    const needFlip = obj.otherDirection && !isThrowable;
    if (needFlip) this.flipImage(obj);
    else this.ctx.save();
    obj.draw(this.ctx);
    if (needFlip) this.flipImageBack(obj);
    else this.ctx.restore();
  }

  /**
   * Flips an image horizontally before drawing.
   * @param {DrawableObject} obj - Object to flip.
   */
  flipImage(obj) {
    this.ctx.save();
    this.ctx.translate(obj.width, 0);
    this.ctx.scale(-1, 1);
    obj.x = obj.x * -1;
  }

  /**
   * Restores the image orientation after drawing.
   * @param {DrawableObject} obj - Object to restore.
   */
  flipImageBack(obj) {
    obj.x = obj.x * -1;
    this.ctx.restore();
  }

  /** Displays the endscreen with collected statistics. */
  showEndScreen() {
    this.running = false;
    clearAllIntervals();
    const endTime = Date.now();
    const playTimeSec = Math.floor((endTime - this.startTime) / 1000);
    const stats = {
      chickens: Number(this.killedChickens ?? 0),
      chickenBigs: Number(this.killedChickenBigs ?? 0),
      chickenSmalls: Number(this.killedChickenSmalls ?? 0),
      hearts: this.character.energy,
      coins: this.score,
      time: playTimeSec,
    };
    EndScreen.show(stats);
  }

  /** Ends the current level (not yet implemented). */
  completeLevel() {}

  /** Destroys the world and stops character animation. */
  destroy() {
    this.running = false;
    this.character?.pauseAnimation?.();
  }

  /* ===== Helpers for pause/resume functionality ===== */

  /**
   * Collects all movable objects in the world.
   * @returns {MovableObject[]} Array of movable objects.
   */
  getAllMovables() {
    const list = [];
    if (this.character) list.push(this.character);
    if (this.level?.enemies) list.push(...this.level.enemies);
    if (this.level?.boss) list.push(this.level.boss);
    if (this.throwableObjects) list.push(...this.throwableObjects);
    return list;
  }

  /** Freezes all movable objects (stops their motion). */
  freezeAllMovables() {
    this.getAllMovables().forEach((o) => this.freezeMovable(o));
  }

  /** Unfreezes all movable objects and restores their speed. */
  unfreezeAllMovables() {
    this.getAllMovables().forEach((o) => this.unfreezeMovable(o));
    this.recoverZeroSpeeds();
  }

  /**
   * Freezes a single movable object and saves its speed state.
   * @param {MovableObject} o - Object to freeze.
   */
  freezeMovable(o) {
    if (!o) return;
    if (!o.__paused) o.__paused = {};
    if (typeof o.speed === "number" && o.__paused.speed === undefined) o.__paused.speed = o.speed;
    if (typeof o.speedY === "number" && o.__paused.speedY === undefined)
      o.__paused.speedY = o.speedY;
    if (typeof o.vx === "number" && o.__paused.vx === undefined) o.__paused.vx = o.vx;
    if (typeof o.speed === "number") o.speed = 0;
    if (typeof o.speedY === "number") o.speedY = 0;
    if (typeof o.vx === "number") o.vx = 0;
    if (typeof o.pauseAnimation === "function" && o !== this.character) o.pauseAnimation();
  }

  /**
   * Unfreezes a single movable object and restores saved values.
   * @param {MovableObject} o - Object to unfreeze.
   */
  unfreezeMovable(o) {
    if (!o) return;
    const s = o.__paused || {};
    if (typeof o.speed === "number" && s.speed !== undefined) o.speed = s.speed;
    if (typeof o.speedY === "number" && s.speedY !== undefined) o.speedY = s.speedY;
    if (typeof o.vx === "number" && s.vx !== undefined) o.vx = s.vx;
    o.__paused = null;
    if (typeof o.resumeAnimation === "function" && o !== this.character) o.resumeAnimation();
  }

  /** Recovers sensible default speeds if objects resume with speed 0. */
  recoverZeroSpeeds() {
    if (this.character && typeof this.character.speed === "number" && this.character.speed === 0) {
      this.character.speed = 12;
    }
    (this.level?.enemies || []).forEach((e) => {
      if (typeof e.speed === "number" && e.speed === 0 && !e.isDead) {
        if (typeof e.setRandomSpeed === "function") e.setRandomSpeed();
        else e.speed = 0.25;
      }
    });
    const b = this.level?.boss;
    if (b && typeof b.speed === "number" && b.speed === 0 && !b.isDead) b.speed = 0.45;
  }
}


// === js/soundManager.js
/**
 * Handles all game audio: background tracks, sound effects, mute state, and DOM integration.
 */
class SoundManager {
  /** @type {Object.<string, HTMLAudioElement>} Preloaded game sounds. */
  static sounds = {
    music: new Audio("./audio/6_backgroundsounds/1.mp3"),
    bossMusic: new Audio("./audio/6_backgroundsounds/finalBoss.mp3"),
    walking: new Audio("./audio/1_walking/walking.mp3"),
    jumping: new Audio("./audio/2_jump/maleShortJump.mp3"),
    dead: new Audio("./audio/9_lost/man_dying.mp3"),
    hurt: new Audio("./audio/10_hit/hit.mp3"),
    collectingBottle: new Audio("./audio/7_bottle/bottleClicking.mp3"),
    whisleBottle: new Audio("./audio/7_bottle/whisle.mp3"),
    smashBottle: new Audio("./audio/7_bottle/bottleClicking.mp3"),
    coin: new Audio("./audio/11_coins/collectCoin.mp3"),
    endbossHit: new Audio("./audio/5_chickenBoss/hitEndboss_sound.mp3"),
    chickenSmall: new Audio("./audio/4_chicken/chickenSmall.mp3"),
    chickenBig: new Audio("./audio/4_chicken/chickenBig.mp3"),
    chicken: new Audio("./audio/4_chicken/chickenBig.mp3"),
    chickenSmallDead: new Audio("./audio/4_chicken/chicken_dead.mp3"),
    chickenBigDead: new Audio("./audio/4_chicken/chicken_dead.mp3"),
    chickenDead: new Audio("./audio/4_chicken/chicken_dead.mp3"),
    endboss: new Audio("./audio/5_chickenBoss/chickenBossLev1.mp3"),
    endbossDead: new Audio("./audio/5_chickenBoss/chickenBossLev1.mp3"),
  };

  /** @type {boolean} Tracks mute state across all sounds. */
  static isMuted = true;

  /** @type {Object.<string, number>} Default volume levels for all sounds. */
  static volumeSettings = {
    music: 0.35,
    bossMusic: 0.4,
    walking: 0.15,
    jumping: 0.35,
    dead: 0.3,
    hurt: 0.3,
    collectingBottle: 0.25,
    whisleBottle: 0.15,
    smashBottle: 0.35,
    coin: 0.25,
    endbossHit: 0.35,
    chickenSmall: 0.25,
    chickenBig: 0.25,
    chicken: 0.25,
    chickenSmallDead: 0.25,
    chickenBigDead: 0.35,
    chickenDead: 0.35,
    endboss: 0.35,
    endbossDead: 0.35,
  };

  /** Toggles mute state and updates all sounds accordingly. */
  static toggleSound() {
    if (this.isMuted) {
      this.unmuteAll();
    } else {
      this.muteAll();
    }
  }

  /** Mutes every sound and updates the toggle icon. */
  static muteAll() {
    this.isMuted = true;
    Object.values(this.sounds).forEach((s) => {
      s.pause();
      s.muted = true;
    });
    this.updateIcon(false);
  }

  /** Gradually unmutes all sounds by fading them in, without triggering SFX. */
  static unmuteAll() {
    this.isMuted = false;

    const targets = {};
    Object.entries(this.sounds).forEach(([n, s]) => {
      const targetVolume = this.volumeSettings[n] || 0.2;
      targets[n] = targetVolume;
      s.muted = false;
      s.volume = 0;
      /* Do not play SFX here; they are triggered only via playSound(name). */
    });

    this.fadeIn(targets);
    this.updateIcon(true);
    this.playBackground("music");
  }

  /**
   * Plays a specific sound effect by name.
   * @param {string} name - Sound key.
   */
  static playSound(name) {
    if (!this.isMuted && this.sounds[name]) {
      const s = this.sounds[name];
      s.volume = this.volumeSettings[name] || 0.2;
      s.currentTime = 0;
      s.play();
    }
  }

  /**
   * Pauses a specific sound effect by name.
   * @param {string} name - Sound key.
   */
  static pauseSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].pause();
    }
  }

  /** Pauses every currently playing sound. */
  static pauseAllSounds() {
    Object.values(this.sounds).forEach((s) => s.pause());
  }

  /** Stops all sounds and resets their playback time. */
  static stopAllSounds() {
    Object.values(this.sounds).forEach((s) => {
      s.pause();
      s.currentTime = 0;
    });
  }

  /**
   * Starts background music or boss music.
   * @param {"music"|"bossMusic"} [type="music"] - Track type to play.
   */
  static playBackground(type = "music") {
    if (this.isMuted) {
      return;
    }
    this.stopBackground();
    const s = this.sounds[type];
    if (s) {
      s.loop = true;
      s.volume = this.volumeSettings[type] || 0.3;
      s.play().catch(() => {});
    }
  }

  /** Stops both background and boss music. */
  static stopBackground() {
    ["music", "bossMusic"].forEach((n) => {
      const s = this.sounds[n];
      if (s) {
        s.pause();
        s.currentTime = 0;
      }
    });
  }

  /**
   * Gradually increases volume for targeted sounds.
   * @param {Object.<string, number>} targets - Mapping of sounds to target volumes.
   */
  static fadeIn(targets) {
    const duration = 3000;
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;

    const fadeInterval = setInterval(() => {
      step++;
      Object.entries(this.sounds).forEach(([n, s]) => {
        const t = targets[n];
        if (t !== undefined) {
          s.volume = Math.min(t, (step / steps) * t);
        }
      });
      if (step >= steps) {
        clearInterval(fadeInterval);
      }
    }, stepTime);
  }

  /**
   * Updates the DOM sound toggle icon based on state.
   * @param {boolean} on - True shows "on" icon, false shows "off" icon.
   */
  static updateIcon(on) {
    const icon = document.getElementById("soundToggle");
    if (icon) {
      icon.src = on ? "imgs/logos/musicOn.png" : "imgs/logos/musicOff.png";
    }
  }

  /** Initialises the DOM sound toggle and sets default state. */
  static init() {
    const icon = document.getElementById("soundToggle");
    if (icon) {
      icon.addEventListener("click", () => this.toggleSound());
      this.updateIcon(false); // Start in "muted" state
    }
  }
}


// === js/startScreen.js
/**
 * Starts the game: hides start screen, shows loading overlay, preloads core assets
 * with progress, then initialises the world. Idle pulse on the start button is cancelled.
 * @async
 * @returns {Promise<void>}
 */
async function startGame() {
  cancelStartButtonIdle();
  const startScreen = document.getElementById("startScreen");
  if (startScreen) startScreen.classList.add("overlay-hidden");

  showLoadingOverlay();

  if (typeof preloadCoreAssetsWithProgress === "function") {
    await preloadCoreAssetsWithProgress((ratio) => updateLoadingBar(ratio));
  } else if (typeof preloadCoreAssets === "function") {
    await preloadCoreAssets();
    updateLoadingBar(1);
  }

  hideLoadingOverlay();
  if (
    typeof AssetLoader !== "undefined" &&
    AssetLoader.failedPaths &&
    AssetLoader.failedPaths.size > 0
  ) {
    console.warn(
      "[El Pollo Loco]",
      AssetLoader.failedPaths.size,
      "image(s) failed to load. See console for paths."
    );
  }
  init(createLevel1());
  if (typeof updateUiVisibility === "function") updateUiVisibility();
}

let startIdleTimeoutId;

/**
 * Schedules a gentle idle pulse on the primary start button after 4s of no interaction.
 * Resets the timer on mousemove, keydown, click, or touchstart.
 */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-start-primary");
  if (!btn) return;
  btn.classList.add("primary-start");

  const schedule = () => {
    clearTimeout(startIdleTimeoutId);
    startIdleTimeoutId = setTimeout(() => {
      btn.classList.add("is-idle");
    }, 4000);
  };

  ["mousemove", "keydown", "click", "touchstart"].forEach((evt) => {
    window.addEventListener(
      evt,
      () => {
        btn.classList.remove("is-idle");
        schedule();
      },
      { passive: true }
    );
  });

  schedule();
});

/**
 * Cancels the start-button idle pulse and removes the is-idle class.
 */
function cancelStartButtonIdle() {
  clearTimeout(startIdleTimeoutId);
  const btn = document.getElementById("btn-start-primary");
  if (btn) btn.classList.remove("is-idle");
}

/**
 * Shows the loading overlay and resets the progress bar to 0.
 */
function showLoadingOverlay() {
  const overlay = document.getElementById("loadingOverlay");
  const fill = document.getElementById("loadingBarFill");
  if (fill) fill.style.width = "0%";
  if (overlay) overlay.classList.remove("overlay-hidden");
}

/**
 * Updates the loading bar fill width from 0 to 100% based on ratio.
 * @param {number} ratio - Progress from 0 to 1 (clamped).
 */
function updateLoadingBar(ratio) {
  const fill = document.getElementById("loadingBarFill");
  if (!fill) return;
  const clamped = Math.max(0, Math.min(1, ratio || 0));
  fill.style.width = `${clamped * 100}%`;
}

/**
 * Hides the loading overlay (adds overlay-hidden class).
 */
function hideLoadingOverlay() {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) overlay.classList.add("overlay-hidden");
}

/**
 * Shows the rules overlay and hides rules/impressum overlays.
 */
function showRules() {
  hideAllOverlays();
  document.getElementById("rulesOverlay").classList.remove("overlay-hidden");
  if (typeof updateUiVisibility === "function") updateUiVisibility();
}

/**
 * Shows the legal notice (Impressum) overlay and hides other overlays.
 */
function showImpressum() {
  hideAllOverlays();
  document.getElementById("impressumOverlay").classList.remove("overlay-hidden");
  if (typeof updateUiVisibility === "function") updateUiVisibility();
}

/**
 * Returns to the start screen: hides rules/impressum and shows start screen.
 */
function returnToStart() {
  hideAllOverlays();
  document.getElementById("startScreen")?.classList.remove("overlay-hidden");
  if (typeof updateUiVisibility === "function") updateUiVisibility();
}

/**
 * Hides rules and impressum overlays (adds overlay-hidden to both).
 */
function hideAllOverlays() {
  document.getElementById("rulesOverlay").classList.add("overlay-hidden");
  document.getElementById("impressumOverlay").classList.add("overlay-hidden");
}


// === js/endScreen.js
/**
 * Handles the victory/end screen overlay: shows stats and wires back/restart buttons.
 * Stats and labels use the current i18n language when available.
 */
class EndScreen {
  /**
   * Wires back and restart buttons once when DOM is ready. No dynamic DOM creation.
   */
  static init() {
    const back = document.getElementById("btn-end-back");
    const restart = document.getElementById("btn-end-restart");
    if (back) back.addEventListener("click", () => EndScreen.goToStart());
    if (restart) restart.addEventListener("click", () => EndScreen.restartGame());
  }

  /**
   * Shows the end screen overlay and fills stat placeholders from the given stats.
   * Uses window.t (i18n) for labels when available.
   * @param {Object} stats - Game statistics to display.
   * @param {number} stats.chickens - Normal chickens defeated.
   * @param {number} stats.chickenBigs - Big chickens defeated.
   * @param {number} stats.chickenSmalls - Small chickens defeated.
   * @param {number} stats.hearts - Remaining hearts (energy).
   * @param {number} stats.coins - Coins collected.
   * @param {number} stats.time - Total play time in seconds.
   */
  static show(stats) {
    const overlay = document.getElementById("endscreenOverlay");
    overlay.classList.remove("overlay-hidden");
    if (typeof updateUiVisibility === "function") updateUiVisibility();

    /* Update stats (use t() from i18n when available) */
    const t = typeof window !== "undefined" && window.t ? window.t : (k) => k;
    document.getElementById("stat-chickens").textContent = `${t("stat_chickens")} ${stats.chickens}`;
    document.getElementById("stat-chickenBigs").textContent =
      `${t("stat_chickenBigs")} ${stats.chickenBigs}`;
    document.getElementById("stat-chickenSmalls").textContent =
      `${t("stat_chickenSmalls")} ${stats.chickenSmalls}`;
    document.getElementById("stat-hearts").textContent = `${t("stat_hearts")} ${stats.hearts}`;
    document.getElementById("stat-coins").textContent = `${t("stat_coins")} ${stats.coins}`;
    document.getElementById("stat-time").textContent = t("stat_time").replace("%s", stats.time);
  }

  /**
   * Deprecated; kept for compatibility. Static buttons are wired in init().
   */
  static backBtn() {
    /* no-op */
  }

  /**
   * Hides the end screen and shows the start screen again.
   */
  static goToStart() {
    const startScreen = document.getElementById("startScreen");
    if (startScreen) startScreen.classList.remove("overlay-hidden");
    const endScreen = document.getElementById("endscreenOverlay");
    if (endScreen) endScreen.classList.add("overlay-hidden");
    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  /**
   * Hides the end screen, clears intervals, and restarts level 1 (no page reload).
   */
  static restartGame() {
    const endScreen = document.getElementById("endscreenOverlay");
    if (endScreen) endScreen.classList.add("overlay-hidden");
    clearAllIntervals();
    init(createLevel1());
    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }
}


// === js/pauseScreen.js
/**
 * Handles the pause overlay and countdown logic.
 * Provides methods to show, hide and update the pause screen.
 */
class PauseScreen {
  /**
   * Displays the pause overlay.
   * Clears residual countdown text.
   */
  static showOverlay() {
    const overlay = document.getElementById("pauseOverlay");
    if (!overlay) return;
    overlay.classList.remove("pause-overlay-hidden");
    const el = document.getElementById("pauseCountdown");
    if (el) el.innerText = "";
    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  /**
   * Starts the countdown to resume the game.
   * Counts from 5 to "GO!" within ~2 seconds (400 ms per step).
   * Hides the resume button during the countdown for mobile safety.
   * @param {Function} onFinish - Callback executed once the countdown completes.
   */
  static showCountdown(onFinish) {
    const el = document.getElementById("pauseCountdown");
    const btn = document.querySelector(".pause-back-to-game-btn");
    if (!el || !btn) return;

    btn.style.display = "none";

    let count = 5;
    el.innerText = count;

    const it = setInterval(() => {
      count--;
      if (count > 0) {
        el.innerText = count;
        return;
      }
      if (count === 0) {
        el.innerText = "GO!";
        return;
      }
      clearInterval(it);
      btn.style.display = "inline-block";
      if (typeof onFinish === "function") onFinish();
    }, 400);
  }

  /**
   * Hides the pause overlay and clears countdown text.
   */
  static clearOverlay() {
    const overlay = document.getElementById("pauseOverlay");
    if (!overlay) return;
    overlay.classList.add("pause-overlay-hidden");
    const el = document.getElementById("pauseCountdown");
    if (el) el.innerText = "";
    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  /**
   * Returns the resume button element if available.
   * @returns {HTMLButtonElement|null} The resume button or null.
   */
  static getResumeButton() {
    return document.querySelector(".pause-back-to-game-btn") || null;
  }

  /**
   * Registers the button click handler for mobile usage.
   * Simulates pressing the "p" key to resume via keyboard path.
   */
  static initButtonHandler() {
    const btn = PauseScreen.getResumeButton();
    if (!btn) return;
    btn.addEventListener("click", () => {
      if (typeof togglePause === "function") togglePause();
    });
  }
}

/* Initialise mobile resume button once DOM is ready. */
document.addEventListener("DOMContentLoaded", () => {
  PauseScreen.initButtonHandler();
});


// === js/gameOverScreen.js
/**
 * Manages the game over overlay (formerly restartPrompt).
 * Encapsulates visibility state, keyboard handling and button wiring.
 */
class GameOverScreen {
  /**
   * Shows the game over overlay and binds inputs.
   * Pauses the world defensively if still running.
   */
  static show() {
    const overlay = document.getElementById("restartPrompt");
    if (!overlay) return;

    overlay.classList.remove("is-hidden");
    GameOverScreen._visible = true;

    if (typeof updateUiVisibility === "function") updateUiVisibility();

    if (typeof game !== "undefined" && game.world && game.world.running) {
      try {
        game.world.pauseGame();
      } catch {
        /* Intentionally ignored: world may not support pausing in all states. */
      }
    }

    GameOverScreen.bindKeys();
    GameOverScreen.bindButtons();
  }

  /**
   * Hides the overlay and removes keyboard handler.
   */
  static hide() {
    const overlay = document.getElementById("restartPrompt");
    if (!overlay) return;

    overlay.classList.add("is-hidden");
    GameOverScreen._visible = false;

    if (typeof updateUiVisibility === "function") updateUiVisibility();

    document.removeEventListener("keydown", GameOverScreen.handleKeyEvent);
  }

  /**
   * Returns whether the game over screen is visible.
   * @returns {boolean} True if visible, otherwise false.
   */
  static isVisible() {
    return !!GameOverScreen._visible;
  }

  /**
   * Binds J/N key handling idempotently.
   */
  static bindKeys() {
    document.removeEventListener("keydown", GameOverScreen.handleKeyEvent);
    document.addEventListener("keydown", GameOverScreen.handleKeyEvent);
  }

  /**
   * Handles J/N for restart or back to start.
   * @param {KeyboardEvent} e - The keyboard event.
   */
  static handleKeyEvent(e) {
    if (!GameOverScreen.isVisible()) return;

    e.preventDefault();
    e.stopPropagation();

    const key = (e.key || "").toLowerCase();
    if (key === "j") {
      GameOverScreen.restart();
    } else if (key === "n") {
      GameOverScreen.backToStart();
    }
  }

  /**
   * Restarts the game from level 1.
   */
  static restart() {
    GameOverScreen.hide();
    try {
      init(createLevel1());
    } catch {
      /* Intentionally ignored: fallback reload keeps game recoverable. */ location.reload();
    }
    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  /**
   * Returns to the start screen.
   */
  static backToStart() {
    GameOverScreen.hide();
    returnToStart();
    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  /**
   * Wires buttons once; calls actions directly (no synthetic keyboard events).
   */
  static bindButtons() {
    const overlay = document.getElementById("restartPrompt");
    if (!overlay) return;
    if (overlay._goBound) return;

    const buttons = overlay.querySelectorAll(".restart-btn");
    buttons.forEach((btn) => {
      const run = () => {
        const key = (btn.textContent || "").trim().toLowerCase();
        if (key === "j") GameOverScreen.restart();
        if (key === "n") GameOverScreen.backToStart();
      };

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        run();
      });
      btn.addEventListener(
        "touchend",
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          run();
        },
        { passive: false }
      );
    });

    overlay._goBound = true;
  }
}

/* Initialise visibility flag. */
GameOverScreen._visible = false;


// === js/cancelScreen.js
/**
 * CancelOverlay shows a confirmation dialog to abort the current run.
 * J = Yes (abort to start), N = No (continue).
 */
class CancelOverlay {
  static _visible = false;

  static show() {
    if (!CancelOverlay.canOpen()) return;

    const overlay = document.getElementById("cancelOverlay");
    if (!overlay) return;

    overlay.classList.remove("is-hidden");
    CancelOverlay._visible = true;

    CancelOverlay.resetMovementFlags();

    if (typeof game !== "undefined" && game.world && game.world.running) {
      try {
        game.world.pauseGame();
      } catch {
        /* Intentionally ignored: world may not support pausing in all states. */
      }
    }

    if (typeof SoundManager !== "undefined") {
      SoundManager.pauseAllSounds();
    }

    CancelOverlay.bindKeys();
    CancelOverlay.bindButtons();

    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  static hide() {
    const overlay = document.getElementById("cancelOverlay");
    if (!overlay) return;

    overlay.classList.add("is-hidden");
    CancelOverlay._visible = false;

    document.removeEventListener("keydown", CancelOverlay.handleKeyEvent);

    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  static isVisible() {
    return !!CancelOverlay._visible;
  }

  static canOpen() {
    if (typeof game === "undefined" || !game.world) return false;
    if (game.world.running !== true) return false;
    if (typeof game !== "undefined" && game.gamePaused) return false;
    if (typeof game !== "undefined" && game.countdownActive) return false;
    if (
      typeof GameOverScreen !== "undefined" &&
      GameOverScreen.isVisible &&
      GameOverScreen.isVisible()
    )
      return false;
    return true;
  }

  static resetMovementFlags() {
    if (typeof game === "undefined" || !game.keyboard) return;
    const k = game.keyboard;
    k.RIGHT = false;
    k.LEFT = false;
    k.UP = false;
    k.DOWN = false;
    k.D = false;
  }

  static bindKeys() {
    document.removeEventListener("keydown", CancelOverlay.handleKeyEvent);
    document.addEventListener("keydown", CancelOverlay.handleKeyEvent);
  }

  static handleKeyEvent(e) {
    if (!CancelOverlay.isVisible()) return;

    e.preventDefault();
    e.stopPropagation();

    const key = (e.key || "").toLowerCase();
    if (key === "j") {
      CancelOverlay.abortToStart();
    } else if (key === "n") {
      CancelOverlay.continueGame();
    }
  }

  static bindButtons() {
    const overlay = document.getElementById("cancelOverlay");
    if (!overlay) return;
    if (overlay._cancelBound) return;

    const buttons = overlay.querySelectorAll(".cancel-btn");
    buttons.forEach((btn) => {
      const run = () => {
        const key = (btn.textContent || "").trim().toLowerCase();
        if (key === "j") CancelOverlay.abortToStart();
        if (key === "n") CancelOverlay.continueGame();
      };

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        run();
      });
      btn.addEventListener(
        "touchend",
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          run();
        },
        { passive: false }
      );
    });

    overlay._cancelBound = true;
  }

  static continueGame() {
    CancelOverlay.hide();
    if (typeof game !== "undefined" && game.world) {
      try {
        game.world.resumeGame();
      } catch {
        /* Intentionally ignored: world may not support resuming in all states. */
      }
    }
    if (typeof resumeAudioForWorld === "function") resumeAudioForWorld();
    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  static abortToStart() {
    CancelOverlay.hide();

    if (typeof game !== "undefined") {
      game.state.gamePaused = false;
      game.state.countdownActive = false;
    }

    if (typeof clearAllIntervals === "function") clearAllIntervals();

    if (typeof game !== "undefined" && game.world) {
      try {
        game.world.pauseGame();
      } catch {
        /* Intentionally ignored: world may not support pausing in all states. */
      }
      game.world.running = false;
    }

    if (typeof SoundManager !== "undefined" && !SoundManager.isMuted) {
      SoundManager.stopBackground();
      SoundManager.playBackground("music");
    }

    if (typeof returnToStart === "function") returnToStart();

    if (typeof updateUiVisibility === "function") updateUiVisibility();
  }

  static updateAbortButtonVisibility() {
    const btn = document.getElementById("abortToStart");
    if (!btn) return;

    const shouldShow = !!(typeof game !== "undefined" && game.world && game.world.running === true);
    btn.classList.toggle("overlay-hidden", !shouldShow);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("abortToStart");
  if (!btn) return;

  btn.addEventListener("click", () => CancelOverlay.show());
  CancelOverlay.updateAbortButtonVisibility();
});


// === js/game.js
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


// === js/eventBindings.js
/**
 * Central event bindings for UI elements (start, rules, impressum, sound, abort, language).
 * Replaces inline onclick/onkeydown in HTML. Runs once on DOMContentLoaded.
 * @module eventBindings
 */
(function () {
  /**
   * Attaches click/keydown listeners to all relevant buttons and controls.
   * @private
   */
  function bindOnceReady() {
    const soundToggle = document.getElementById("soundToggle");
    if (soundToggle) {
      soundToggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          soundToggle.click();
        }
      });
    }

    const abortToStart = document.getElementById("abortToStart");
    if (abortToStart && typeof CancelOverlay !== "undefined") {
      abortToStart.addEventListener("click", () => CancelOverlay.show());
      abortToStart.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          abortToStart.click();
        }
      });
    }

    const btnStart = document.getElementById("btn-start-primary");
    if (btnStart && typeof startGame === "function") {
      btnStart.addEventListener("click", startGame);
    }

    const rulesBtn = document.getElementById("btn-rules");
    if (rulesBtn && typeof showRules === "function") {
      rulesBtn.addEventListener("click", showRules);
    }
    const impressumBtn = document.getElementById("btn-impressum");
    if (impressumBtn && typeof showImpressum === "function") {
      impressumBtn.addEventListener("click", showImpressum);
    }

    const langDe = document.getElementById("lang-de");
    const langEn = document.getElementById("lang-en");
    if (langDe && typeof setLanguage === "function") {
      langDe.addEventListener("click", () => setLanguage("de"));
    }
    if (langEn && typeof setLanguage === "function") {
      langEn.addEventListener("click", () => setLanguage("en"));
    }

    const rulesBackBtns = document.querySelectorAll(".rules-menu-button-rules-close");
    rulesBackBtns.forEach((btn) => {
      if (btn && typeof returnToStart === "function") {
        btn.addEventListener("click", returnToStart);
      }
    });
    const impressumBackBtns = document.querySelectorAll(".impressum-menu-button-close");
    impressumBackBtns.forEach((btn) => {
      if (btn && typeof returnToStart === "function") {
        btn.addEventListener("click", returnToStart);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindOnceReady);
  } else {
    bindOnceReady();
  }
})();
