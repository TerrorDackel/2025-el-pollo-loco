/**
 * Central event bindings for UI elements. Replaces inline onclick/onkeydown in HTML.
 */
(function () {
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

    const startScreen = document.getElementById("startScreen");
    if (startScreen) {
      const rulesBtn = startScreen.querySelector('[aria-label="Spielregeln anzeigen"]');
      if (rulesBtn && typeof showRules === "function") {
        rulesBtn.addEventListener("click", showRules);
      }
      const impressumBtn = startScreen.querySelector('[aria-label="Impressum anzeigen"]');
      if (impressumBtn && typeof showImpressum === "function") {
        impressumBtn.addEventListener("click", showImpressum);
      }
    }

    const rulesBackBtns = document.querySelectorAll(
      '#rulesOverlay [aria-label="Zurück zum Startbildschirm"]'
    );
    rulesBackBtns.forEach((btn) => {
      if (btn && typeof returnToStart === "function") {
        btn.addEventListener("click", returnToStart);
      }
    });

    const impressumBackBtns = document.querySelectorAll(
      '#impressumOverlay [aria-label="Zurück zum Startbildschirm"]'
    );
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
