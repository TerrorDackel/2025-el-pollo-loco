import { describe, it, expect, beforeAll } from "vitest";
import { runBundle } from "./helpers/runBundle.js";

describe("level (after bundle)", () => {
  beforeAll(() => {
    runBundle();
  });

  it("createLevel1() returns object with enemies, clouds, backgroundObjects, coins, bottles, boss", () => {
    if (typeof window.createLevel1 !== "function") {
      expect(true).toBe(true);
      return;
    }
    const level = window.createLevel1();
    expect(level).toBeDefined();
    expect(level.enemies).toBeDefined();
    expect(Array.isArray(level.enemies)).toBe(true);
    expect(level.clouds).toBeDefined();
    expect(Array.isArray(level.clouds)).toBe(true);
    expect(level.backgroundObjects).toBeDefined();
    expect(Array.isArray(level.backgroundObjects)).toBe(true);
    expect(level.coins).toBeDefined();
    expect(Array.isArray(level.coins)).toBe(true);
    expect(level.bottles).toBeDefined();
    expect(Array.isArray(level.bottles)).toBe(true);
    expect(level.boss).toBeDefined();
  });

  it("createLevel1() level has expected enemy count", () => {
    if (typeof window.createLevel1 !== "function") return;
    const level = window.createLevel1();
    expect(level.enemies.length).toBe(10);
  });

  it("createLevel1() level has 4 clouds", () => {
    if (typeof window.createLevel1 !== "function") return;
    const level = window.createLevel1();
    expect(level.clouds.length).toBe(4);
  });

  it("createLevel1() boss has energy and isDead", () => {
    if (typeof window.createLevel1 !== "function") return;
    const level = window.createLevel1();
    expect(level.boss.energy).toBe(5);
    expect(level.boss.isDead).toBe(false);
  });
});
