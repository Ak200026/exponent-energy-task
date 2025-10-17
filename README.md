# 2048 — Functional (FP) Implementation (React + TypeScript)

## Summary
This repo contains a web-based implementation of the 2048 game that emphasizes functional programming principles. The game logic is implemented as pure functions and separated from the UI for testability and clarity.

## Features
- Default 4×4 board (configurable: 3, 4, 5, 6).
- Start with two random tiles (2 or 4).
- Slide tiles with arrow keys or WASD, or use on-screen buttons.
- Merging rules follow classic 2048.
- New random tile appears after every successful move.
- Score tracked from merged tiles.
- Win detection (>=2048) and Game Over detection.
- Restart and size-change support from GUI.
- Pure, immutable game logic in `src/game.ts`.

## Run locally
1. `npm install`
2. `npm start`
3. Visit `http://localhost:3000`

## Deploy
Build with `npm run build` and deploy static `build/` to GitHub Pages / Netlify / Vercel.

## Implementation notes
- `src/game.ts` contains pure functions: `move`, `applyMove`, `spawnRandomTile`, `initGame`, etc. This file is easy to unit-test.
- `App.tsx` uses `useReducer` to apply actions (`MOVE`, `RESTART`, `SET_SIZE`) to game state.
- GUI is in `Board.tsx` (stateless) and `App.tsx`.

## Extensibility ideas (common interview tasks)
- Add undo (store previous states).
- Add animations (Framer Motion or CSS transitions).
- Add persistent high-score (localStorage).
- Add AI/autoplay (expectimax or simpler heuristics).
- Configure probability for spawning 4s or add different targets.

## License
MIT
