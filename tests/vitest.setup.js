import { vi } from "vitest";

vi.stubGlobal("updateUiVisibility", () => {});
vi.stubGlobal("SoundManager", {
  isMuted: false,
  pauseAllSounds: () => {},
  stopBackground: () => {},
  playBackground: () => {}
});
vi.stubGlobal("GameOverScreen", { isVisible: () => false });
vi.stubGlobal("PauseScreen", { showOverlay: () => {}, clearOverlay: () => {}, showCountdown: () => {} });
vi.stubGlobal("returnToStart", () => {});
vi.stubGlobal("createLevel1", () => ({}));
vi.stubGlobal("init", () => {});
vi.stubGlobal("clearAllIntervals", () => {});

beforeEach(() => {
  document.body.innerHTML = `
    <img id="abortToStart" class="overlay-hidden" />
    <div id="cancelOverlay" class="cancel-overlay is-hidden"></div>
    <div id="restartPrompt" class="restart-prompt is-hidden"></div>
    <div id="pauseOverlay" class="pause-overlay pause-overlay-hidden"></div>
    <div id="pauseCountdown"></div>
    <button class="pause-back-to-game-btn"></button>
  `;

  vi.stubGlobal("keyboard", { RIGHT: false, LEFT: false, UP: false, DOWN: false, D: false, lastActivity: 0, SPACE: false });
  vi.stubGlobal("world", { running: true, pauseGame: () => {}, resumeGame: () => {}, level: { boss: null } });
  vi.stubGlobal("gamePaused", false);
  vi.stubGlobal("countdownActive", false);
});
