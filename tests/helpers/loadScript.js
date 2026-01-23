const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

function loadScript(relativePath) {
  const abs = path.resolve(process.cwd(), relativePath);
  const code = fs.readFileSync(abs, "utf8");
  vm.runInThisContext(code, { filename: abs });
}

module.exports = { loadScript };
