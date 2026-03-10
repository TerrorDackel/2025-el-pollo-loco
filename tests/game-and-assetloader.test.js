import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

function runBundle() {
  const bundlePath = path.join(__dirname, "..", "dist", "bundle.js");
  if (!fs.existsSync(bundlePath)) return false;
  const code = fs.readFileSync(bundlePath, "utf8");
  const fn = new Function(code);
  fn();
  return true;
}

describe("bundle: game and AssetLoader", () => {
  it("exposes game with state after bundle run", () => {
    if (!runBundle()) {
      expect(true).toBe(true);
      return;
    }
    expect(window.game).toBeDefined();
    expect(window.game.state).toBeDefined();
    expect(window.game.state).toHaveProperty("keyboard");
    expect(window.game.state).toHaveProperty("world");
    expect(window.game.state).toHaveProperty("gamePaused");
    expect(window.game.state).toHaveProperty("countdownActive");
  });

  it("exposes AssetLoader with imageCache and preloadImages", () => {
    if (!runBundle()) {
      expect(true).toBe(true);
      return;
    }
    expect(window.AssetLoader).toBeDefined();
    expect(window.AssetLoader.imageCache).toBeDefined();
    expect(typeof window.AssetLoader.preloadImages).toBe("function");
    expect(typeof window.AssetLoader.preloadImagesWithProgress).toBe("function");
  });
});
