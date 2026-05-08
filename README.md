# Elden Ring Randomizer Index

A local-first search tool for Elden Ring Item & Enemy Randomizer spoiler logs. Load a spoiler log, search item placements by name or location, filter by source type, and export results as CSV or JSON.

All processing is done in your browser / local app — **no data is ever sent to a server.**

---

## Distributable desktop app

A pre-built Windows portable executable can be found in `release/` after running `npm run dist`. Double-click it to launch — no installation required.

When the portable app loads a spoiler log, it keeps a cached copy for the next launch. In portable builds, cached logs are stored beside the executable in `cached-spoiler-logs\` with both a stable `latest-spoiler-log.txt` and a uniquely named seed/timestamp copy.

---

## How to generate a spoiler log

1. Open `EldenRingRandomizer.exe` and configure your options.
2. Click **Randomize items and enemies**.
3. A spoiler log file is written to the `spoiler_logs\` folder inside the randomizer directory (e.g. `spoiler_20240501_seed1234567890.txt`).

---

## Running from source

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node.js)

### Install dependencies

```bash
npm install
```

### Run as a web app (browser)

```bash
npm run dev
```

Opens `http://localhost:5173` in your browser.

### Run as a desktop app (Electron dev mode)

```bash
npm run electron:dev
```

Starts the Vite dev server and launches an Electron window connected to it. DevTools open automatically.

---

## Building the distributable

### Build the Vite bundle only

```bash
npm run build
```

Output goes to `dist/`.

### Build the Windows portable executable

```bash
npm run dist
```

This runs `npm run build` then packages with `electron-builder`.

**Output:** `release/Elden Ring Randomizer Index <version>.exe`

The `.exe` is a self-contained portable — no installer, no admin rights needed. Copy it anywhere and double-click to run.

---

## Using the app

- **Drop or browse** a `.txt` spoiler log onto the upload area.
- **Text search** filters by item name, location, area, or replaced item simultaneously.
- **Source type** filter narrows to boss drops, shop items, ground pickups, etc.
- **Key items only** shows only progression-blocking items flagged by the randomizer.
- Click a **column header** to sort. Click any **row** to expand it and see the raw source line.
- **Export CSV / JSON** exports the currently visible (filtered) records.
- The desktop app **restores the last loaded spoiler log automatically** on launch. Use **Load new log** to clear that cached copy and choose another one.

---

## Parser notes and limitations

The parser handles spoiler logs produced by [thefifthmatt's Elden Ring Item and Enemy Randomizer](https://www.nexusmods.com/eldenring/mods/428). It recognises the real v0.11.4 hint/spoiler sections plus several fallback line formats:

| Format | Example |
|---|---|
| `Location (Area): Item (was Original) [key]` | Most item entries |
| `Item: Location` | Key-item shorthand sections |
| `Item in Area: Location. Replaces Original.` | Real v0.11.4 spoiler entries |
| `Location -> Item (was Original)` | Arrow-style variant |

If your log uses an unexpected format, check the **Parser diagnostics** panel — unmatched lines are preserved there rather than silently dropped.

---

## Development

```bash
npm test            # unit tests (vitest)
npm run build       # Vite production build → dist/
npm run dev         # Vite dev server
npm run electron:dev  # Vite dev server + Electron window
npm run dist        # build + electron-builder → release/*.exe
```

### Project layout

```
electron/
  main.js       — Electron main process (window creation, file:// vs localhost)
  preload.js    — Context bridge (security boundary)
src/
  parser/       — spoilerLogParser, normalize, sourceType, diagnostics
  components/   — UploadPanel, Filters, SearchTable, DiagnosticsPanel, ExportButtons
  types.ts
  App.tsx
  main.tsx
tests/
  fixtures/     — synthetic spoiler log samples
  parser.test.ts
release/        — generated executables (gitignored)
dist/           — Vite production build (gitignored)
```

---

## License

MIT
