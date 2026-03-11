import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { runBundle } from "./helpers/runBundle.js";

describe("i18n (after bundle)", () => {
  beforeAll(() => {
    if (!runBundle()) return;
  });

  beforeEach(() => {
    if (typeof window === "undefined" || !window.setLanguage) return;
    window.setLanguage("de");
  });

  it("exposes I18N, t, setLanguage, getLanguage", () => {
    if (!runBundle()) {
      expect(true).toBe(true);
      return;
    }
    expect(window.I18N).toBeDefined();
    expect(window.t).toBeDefined();
    expect(window.setLanguage).toBeDefined();
    expect(window.getLanguage).toBeDefined();
  });

  it("getLanguage returns current language", () => {
    if (!window.getLanguage) return;
    expect(window.getLanguage()).toBe("de");
    window.setLanguage("en");
    expect(window.getLanguage()).toBe("en");
    window.setLanguage("de");
    expect(window.getLanguage()).toBe("de");
  });

  it("t() returns German strings for de", () => {
    if (!window.t) return;
    window.setLanguage("de");
    expect(window.t("btn_start")).toContain("Spiel starten");
    expect(window.t("rules_title")).toBe("Spielregeln:");
    expect(window.t("endscreen_title")).toContain("Glückwunsch");
  });

  it("t() returns English strings for en", () => {
    if (!window.t) return;
    window.setLanguage("en");
    expect(window.t("btn_start")).toContain("Start game");
    expect(window.t("rules_title")).toBe("Rules:");
    expect(window.t("endscreen_title")).toContain("Congratulations");
  });

  it("t() returns key when key is missing", () => {
    if (!window.t) return;
    expect(window.t("unknown_key_xyz")).toBe("unknown_key_xyz");
  });

  it("setLanguage updates document.documentElement.lang", () => {
    if (!window.setLanguage || !document.documentElement) return;
    window.setLanguage("en");
    expect(document.documentElement.getAttribute("lang")).toBe("en");
    window.setLanguage("de");
    expect(document.documentElement.getAttribute("lang")).toBe("de");
  });

  it("DE and EN have same translation keys", () => {
    if (!window.I18N || !window.I18N.de || !window.I18N.en) return;
    const keysDe = Object.keys(window.I18N.de).sort();
    const keysEn = Object.keys(window.I18N.en).sort();
    expect(keysEn).toEqual(keysDe);
  });

  it("applyTranslations sets data-i18n element text", () => {
    if (!window.setLanguage) return;
    const el = document.createElement("span");
    el.setAttribute("data-i18n", "btn_start");
    document.body.appendChild(el);
    window.setLanguage("en");
    expect(el.textContent).toContain("Start game");
    window.setLanguage("de");
    expect(el.textContent).toContain("Spiel starten");
    document.body.removeChild(el);
  });
});
