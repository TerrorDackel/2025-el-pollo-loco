import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("build", () => {
  it("produces dist/bundle.js with expected content", () => {
    const { execSync } = require("child_process");
    execSync("node scripts/build.js", { cwd: path.resolve(__dirname, "..") });
    const bundlePath = path.join(__dirname, "..", "dist", "bundle.js");
    expect(fs.existsSync(bundlePath)).toBe(true);
    const content = fs.readFileSync(bundlePath, "utf8");
    expect(content.length).toBeGreaterThan(10000);
    expect(content).toContain("Game");
    expect(content).toContain("AssetLoader");
    expect(content).toContain("eventBindings");
  });
});
