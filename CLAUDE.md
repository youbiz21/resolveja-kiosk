# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Resolve Já Kiosk — an Electron desktop application (kiosk mode) where customers can purchase cleaning services (sofas, carpets, curtains, puffs, chairs, etc.). Built with Electron + Vite + React 19 + TypeScript.

## Commands

```bash
npm run dev            # Start development (electron-vite dev with HMR)
npm run build          # Type-check + build (electron-vite build)
npm run lint           # ESLint (flat config, cached)
npm run format         # Prettier format all files
npm run typecheck      # Run both node and web type checks
npm run typecheck:node # Type-check main + preload (tsconfig.node.json)
npm run typecheck:web  # Type-check renderer (tsconfig.web.json)
npm run build:win      # Build for Windows (NSIS)
npm run build:mac      # Build for macOS (DMG)
npm run build:linux    # Build for Linux (AppImage/snap/deb)
```

## Architecture

This is an **electron-vite** project with three separate build targets configured in `electron.vite.config.ts`:

### Three-Process Model

- **Main process** (`src/main/index.ts`) — Electron app lifecycle, window creation, IPC handlers. Uses `@electron-toolkit/utils` for shortcuts and app model ID.
- **Preload** (`src/preload/index.ts`) — Context bridge between main and renderer. Exposes `window.electron` (ipcRenderer) and `window.api` (custom APIs) via `@electron-toolkit/preload`. Type declarations in `src/preload/index.d.ts`.
- **Renderer** (`src/renderer/src/`) — React 19 SPA. Entry: `main.tsx` → `App.tsx`. HTML entry at `src/renderer/index.html` with CSP headers.

### IPC Communication

Renderer calls main process via `window.electron.ipcRenderer`. Custom APIs should be added to the `api` object in `src/preload/index.ts` and typed in `src/preload/index.d.ts`.

### Path Alias

`@renderer` → `src/renderer/src` (configured in both `electron.vite.config.ts` and `tsconfig.web.json`).

### TypeScript Configuration

Two separate tsconfig targets:
- `tsconfig.node.json` — main + preload (Node/Electron APIs)
- `tsconfig.web.json` — renderer (DOM/React, JSX: react-jsx)
- Root `tsconfig.json` is a composite reference to both

## Code Style

Prettier: single quotes, no semicolons, 100 char width, no trailing commas. ESLint flat config with `@electron-toolkit` presets, React plugin (jsx-runtime mode), and react-hooks/react-refresh rules.
