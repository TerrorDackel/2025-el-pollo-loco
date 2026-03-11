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
        if (e.key === "Enter") {
          e.preventDefault();
          soundToggle.click();
        }
        /* Do NOT use Space (e.key === " ") here: Space is reserved for throwing bottles.
           When the sound button has focus, Space would otherwise toggle sound instead of throw. */
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
