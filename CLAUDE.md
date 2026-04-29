# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server.
- `npm run build` — produce a production build in `dist/`.
- `npm run preview` — serve the built bundle locally.

There is no test runner, linter, or formatter configured in this project.

## Architecture

Naruto-themed auto chess prototype built with Vue 3 (`<script setup>` SFCs) on Vite. Gameplay is rendered with the Canvas 2D API; Vue is used only for the surrounding HUD/shop/overlay UI and for reactive shared state. Path alias `@` resolves to `src/` (see `vite.config.js`).

### Global game state (`src/composables/useGame.js`)

This module is the single source of truth — it exports module-level `ref`/`reactive` values (`phase`, `round`, `gold`, `playerUnits`, `enemyUnits`, `roundResult`, `GRID`) that every component and composable imports directly. There is no Pinia/Vuex store; mutating these exports from any file updates the whole app. The phase machine is `'PREP' | 'BATTLE' | 'ENDED'` and gates almost every interaction (drag, buy, attack, round resolution).

Round flow: `buyUnit()` (PREP only, costs 3G) → drag onto board → `start()` switches to BATTLE → the canvas loop calls `checkRoundEnd()` each frame, which sets `roundResult` and awards gold when one side is wiped → `next()` increments the round, calls `reset()` on each player unit, respawns enemies via `spawnEnemyUnits()`, and returns to PREP.

### Game loop (`src/components/GameCanvas.vue`)

Owns the `<canvas>` (1024×576) and the `requestAnimationFrame` loop. Each frame it draws the background, then sorts player and enemy units by `y` for pseudo-depth and calls `update(opponents)` + `draw(ctx, sprite)` on each, then `checkRoundEnd()`. Sprites are preloaded once in `onMounted` (after `loadBackground()` and initial `spawnEnemyUnits()`) before the loop starts; `useDrag` listeners are attached/detached with the component lifecycle.

### Entities (`src/entities/`)

`BaseCharacter` (in `Character.js`) holds all combat/animation logic: state machine (`CharacterState` = IDLE/RUN/ATTACKING), tick-based frame advance, target acquisition (`_findClosest`), movement toward target until within `ATTACK_RANGE`, then damage application, plus `draw` (shadow + sprite + HP bar). Enemies are flipped horizontally in `_drawSprite` via canvas transform. `update()` is a no-op outside the BATTLE phase, so `BaseCharacter` reaches into `useGame.js` to read `phase` directly.

Concrete units (`Naruto`, `Pain`) extend `BaseCharacter` and supply only a `config` object: sprite asset, frame `width`/`height`, and a per-state row index into the spritesheet. To add a new unit, create a new subclass with its own sprite/config and (typically) instantiate it from `useGame.js`.

### Grid and dragging

`useGrid.js` builds a 4×6 staggered grid of cell centers (`buildGrid`, exported as `GRID`) and provides `snapToGrid` which finds the closest cell to a unit's center. `useDrag.js` is PREP-only; on mouse-up it snaps the dragged unit and overwrites both `x/y` and `startX/startY` so `BaseCharacter.reset()` returns the unit to its placed cell after each battle.

### UI components

`GameHUD` (round/phase/gold), `ShopBar` (buy + Lutar! button), and `RoundOverlay` (slotted into `GameCanvas`, shown when `phase === 'ENDED'`) are thin views over the shared state in `useGame.js`. Note the file imports `../entities/pain` (lowercase) on a case-sensitive filesystem despite the file being `Pain.js` — preserve the existing casing when editing.
