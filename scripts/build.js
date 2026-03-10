/**
 * Concatenates all game scripts in dependency order into dist/bundle.js.
 * Run: node scripts/build.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const distDir = path.join(root, "dist");

const scriptOrder = [
  "models/keyboard.class.js",
  "models/drawableObject.class.js",
  "models/movable.object.class.js",
  "models/character.class.js",
  "models/throwableObjects.class.js",
  "models/chicken.class.js",
  "models/chickensmall.class.js",
  "models/chickenBig.class.js",
  "models/cloud.class.js",
  "models/backgroundobjects.class.js",
  "models/coins.class.js",
  "models/bottles.class.js",
  "models/endboss.class.js",
  "models/statusBar.class.js",
  "models/level.class.js",
  "js/assetLoader.js",
  "levels/level1.js",
  "models/world.class.js",
  "js/soundManager.js",
  "js/startScreen.js",
  "js/endScreen.js",
  "js/pauseScreen.js",
  "js/gameOverScreen.js",
  "js/cancelScreen.js",
  "js/game.js",
  "js/eventBindings.js",
];

const parts = [];
for (const file of scriptOrder) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    console.error("Missing:", file);
    process.exit(1);
  }
  parts.push(`// === ${file}\n` + fs.readFileSync(fullPath, "utf8"));
}

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const bundle = parts.join("\n\n");
fs.writeFileSync(path.join(distDir, "bundle.js"), bundle, "utf8");
console.log("Built dist/bundle.js (" + bundle.length + " bytes)");
