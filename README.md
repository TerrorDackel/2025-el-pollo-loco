# El Pollo Loco – Jump & Run Game

Side-scrolling jump-and-run game built with object-oriented JavaScript during the Developer Akademie frontend program. You control Pepe, collect bottles and defeat chickens and a final boss.

- Live game: https://www.el-pollo-loco.jennifer-thomas.de/index.html
- Repository: https://github.com/TerrorDackel/el-pollo-loco-2025

---

## Features

- 2D side-scrolling level with platforms, enemies and end boss
- Collectible items (e.g. bottles) that can be used as projectiles
- Health system and game-over / win screens
- Keyboard controls for movement, jumping and throwing
- Toggleable sound (music on/off) and pause mode
- Basic responsive behaviour with hint to rotate to landscape on mobile

---

## Tech stack

- **Languages:** JavaScript (OOP), HTML5, CSS
- **Paradigm:** Object-oriented programming (classes, inheritance, composition)
- **Tooling:** Git & GitHub, VS Code / Browser DevTools

---

## What I focused on

This is a solo project.

I used it to practice:

- Structuring a browser game with multiple JS classes (character, enemies, level, items, status bars, world, etc.)
- Implementing a game loop and keyboard input handling in plain JavaScript
- Collision detection between player, enemies and collectables
- Managing game state (running, paused, game over, victory)
- Organising assets (images, sounds, level data) into a clear folder structure
- Simple UI overlays for start screen, instructions, pause, win and game-over states

---

## Project structure (high level)

- `index.html` – entry point and canvas / layout for the game
- `styles.css` – global styling for game canvas and overlays
- `js/` – main game logic (world, character, enemies, keyboard, collisions, sounds, etc.)
- `levels/` – level configuration
- `models/` – additional classes and data structures
- `imgs/`, `fonts/` – images, icons and fonts used in the game

---

## Getting started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, …)
- Optionally: a simple local web server (recommended for development)

### Install and run locally

```bash
# Clone the repository
git clone https://github.com/TerrorDackel/el-pollo-loco-2025.git

cd el-pollo-loco-2025

## Kurzbeschreibung (Deutsch)

„El Pollo Loco“ ist ein kleines Jump-and-Run-Game, das ich während der Developer-Akademie-Weiterbildung als Einzelprojekt mit JavaScript (OOP), HTML und CSS umgesetzt habe.
Der Fokus liegt auf objektorientierter Strukturierung (Klassen für Spielfigur, Gegner, Level, Items), Spielschleife, Tastatur-Steuerung, Kollisionserkennung und einem spielbaren Level mit Gegnern, Sammelobjekten, Sound und Pause-Funktion.
```

Hook test: 2026-01-23 14:17:29
