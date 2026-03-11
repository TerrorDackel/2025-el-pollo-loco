# El Pollo Loco – Jump & Run Game

A 2D side-scrolling jump-and-run game built with object-oriented JavaScript. Control Pepe, collect bottles, defeat chickens and the final boss.

- **Live:** https://www.el-pollo-loco.jennifer-thomas.de/index.html
- **Repo:** https://github.com/TerrorDackel/el-pollo-loco-2025

---

## Features

- 2D side-scrolling level with platforms, enemies and end boss
- Collectible bottles as projectiles
- Health system with game-over and win screens
- Keyboard controls (move, jump, throw)
- Toggleable sound and pause
- Responsive layout with rotate-to-landscape hint on mobile
- **Languages:** German (DE) and English (EN)

---

## Tech stack

- **Languages:** JavaScript (OOP), HTML5, CSS
- **Paradigm:** Object-oriented (classes, inheritance, composition)
- **Tooling:** Git, GitHub, npm (build + tests), ESLint, Prettier, Vitest

---

## What I focused on

Solo project from the Developer Akademie frontend program. I used it to practice:

- Structuring a browser game with multiple JS classes (character, enemies, level, items, status bars, world)
- Game loop and keyboard input in plain JavaScript
- Collision detection (player, enemies, collectables)
- Game state (running, paused, game over, victory)
- Asset preloading with progress and error handling
- Centralised game state (`Game` object), build step (single bundle), and unit/integration tests (Vitest)

---

## Testing

Tests run in Vitest with jsdom. Run all tests with `npm run test:run`.

| Suite                  | What is tested                                                            |
| ---------------------- | ------------------------------------------------------------------------- |
| **smoke**              | Test runner and environment                                               |
| **build**              | Build script produces `dist/bundle.js` with expected content              |
| **game & AssetLoader** | Bundle exposes `game` (state) and `AssetLoader` (cache, preload)          |
| **i18n**               | Language API (`t`, `setLanguage`, `getLanguage`), DE/EN keys, DOM updates |
| **level**              | `createLevel1()` returns level with enemies, clouds, boss                 |
| **keyboard**           | `game.state.keyboard` and `isAnyActionPressed()` behaviour                |

There are **23 tests** in total (6 suites).

---

## Project structure

| Path                        | Description                                                          |
| --------------------------- | -------------------------------------------------------------------- |
| `index.html`                | Entry point, canvas and overlay layout                               |
| `styles.css`                | Global styles and screen-specific CSS                                |
| `js/`                       | Game logic, screens, asset loader, i18n, events                      |
| `models/`                   | Character, enemies, world, level, drawables                          |
| `levels/`                   | Level configuration (e.g. `level1.js`)                               |
| `scripts/`                  | Build script (concatenates JS to `dist/bundle.js`)                   |
| `tests/`                    | Vitest tests (smoke, build, i18n, level, keyboard, game/AssetLoader) |
| `imgs/`, `audio/`, `fonts/` | Images, sounds and fonts                                             |

---

## Getting started

### Prerequisites

- A modern browser (Chrome, Firefox, Edge, …)
- Node.js (optional, for build and tests)

### Run locally

1. Clone the repo:
   ```bash
   git clone https://github.com/TerrorDackel/el-pollo-loco-2025.git
   cd el-pollo-loco-2025
   ```
2. Open `index.html` in a browser (or use a local server).

The repo includes a pre-built `dist/bundle.js`. To rebuild after changing JS:

```bash
npm run build
```

### Scripts

- `npm run build` – build `dist/bundle.js` from source
- `npm run test:run` – run all Vitest tests (23 tests)
- `npm run test` – run Vitest in watch mode
- `npm run lint` – run ESLint on `js/`, `models/`, `levels/`
- `npm run format` – format code with Prettier
- `npm run format:check` – check formatting without writing
