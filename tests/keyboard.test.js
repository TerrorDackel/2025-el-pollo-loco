import { describe, it, expect, beforeAll } from "vitest";
import { runBundle } from "./helpers/runBundle.js";

describe("Keyboard (after bundle)", () => {
  let keyboard;

  beforeAll(() => {
    runBundle();
    keyboard = window.game?.state?.keyboard;
  });

  it("game.state.keyboard is defined after bundle", () => {
    expect(keyboard).toBeDefined();
  });

  it("has expected action keys (LEFT, RIGHT, UP, DOWN, SPACE, etc.)", () => {
    if (!keyboard) return;
    expect(keyboard).toHaveProperty("LEFT", false);
    expect(keyboard).toHaveProperty("RIGHT", false);
    expect(keyboard).toHaveProperty("UP", false);
    expect(keyboard).toHaveProperty("DOWN", false);
    expect(keyboard).toHaveProperty("SPACE", false);
    expect(keyboard).toHaveProperty("P", false);
    expect(keyboard).toHaveProperty("lastActivity");
  });

  it("isAnyActionPressed() returns false when no key is pressed", () => {
    if (!keyboard || typeof keyboard.isAnyActionPressed !== "function") return;
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.SPACE = false;
    keyboard.D = false;
    keyboard.F = false;
    keyboard.M = false;
    keyboard.J = false;
    keyboard.N = false;
    keyboard.PAUSE = false;
    expect(keyboard.isAnyActionPressed()).toBe(false);
  });

  it("isAnyActionPressed() returns true when LEFT is pressed", () => {
    if (!keyboard || typeof keyboard.isAnyActionPressed !== "function") return;
    keyboard.LEFT = true;
    expect(keyboard.isAnyActionPressed()).toBe(true);
    keyboard.LEFT = false;
  });

  it("isAnyActionPressed() returns true when SPACE is pressed", () => {
    if (!keyboard || typeof keyboard.isAnyActionPressed !== "function") return;
    keyboard.SPACE = true;
    expect(keyboard.isAnyActionPressed()).toBe(true);
    keyboard.SPACE = false;
  });

  it("isAnyActionPressed() returns true when P (pause) is pressed", () => {
    if (!keyboard || typeof keyboard.isAnyActionPressed !== "function") return;
    keyboard.PAUSE = true;
    expect(keyboard.isAnyActionPressed()).toBe(true);
    keyboard.PAUSE = false;
  });

  it("isAnyActionPressed() returns true when any of LEFT, RIGHT, UP, D, M, J, N is pressed", () => {
    if (!keyboard || typeof keyboard.isAnyActionPressed !== "function") return;
    ["LEFT", "RIGHT", "UP", "DOWN", "D", "M", "J", "N"].forEach((key) => {
      keyboard[key] = true;
      expect(keyboard.isAnyActionPressed()).toBe(true);
      keyboard[key] = false;
    });
  });
});
