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

  /** Gradually unmutes all sounds by fading them in. */
  static unmuteAll() {
    this.isMuted = false;

    const targets = {};
    Object.entries(this.sounds).forEach(([n, s]) => {
      targets[n] = this.volumeSettings[n] || 0.2;
      s.muted = false;
      s.volume = 0;
      if (n !== "music" && n !== "bossMusic") {
        s.play().catch(() => {});
      }
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
