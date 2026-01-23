const { defineConfig } = require("vitest/config");

module.exports = defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/vitest.setup.js"],
    include: ["tests/**/*.test.js"]
  }
});
