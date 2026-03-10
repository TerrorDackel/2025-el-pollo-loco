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
