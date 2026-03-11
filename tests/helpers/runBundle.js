const fs = require("fs");
const path = require("path");

/**
 * Runs dist/bundle.js in the current global context (window, document from jsdom).
 * @returns {boolean} True if the bundle was found and executed.
 */
function runBundle() {
  const bundlePath = path.join(__dirname, "..", "..", "dist", "bundle.js");
  if (!fs.existsSync(bundlePath)) return false;
  const code = fs.readFileSync(bundlePath, "utf8");
  const fn = new Function(code);
  fn();
  return true;
}

module.exports = { runBundle };
