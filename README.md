# Elden Ring Index and Build Planner

A desktop tool for browsing all Elden Ring items with their fixed vanilla locations (base game + Shadow of the Erdtree), planning builds by stat affinity, and tracking collectible progress.

## ⬇️ Download

**[→ Latest Vanilla release on GitHub](https://github.com/Mjolniar/elden-ring-index-build-planner/releases?q=vanilla&expanded=true)**

On the release page, scroll to **Assets** and download one of:

| Option | File | When to use |
|--------|------|-------------|
| **Installer** (recommended) | `...Setup.exe` | First install — adds a Start Menu shortcut |
| **Portable ZIP** | `...Portable.zip` | No installation needed — extract and run the `.exe` inside |

> **"Windows protected your PC"?** Click **More info → Run anyway**. This appears because the app is unsigned. It is open-source and built from the code in this repository.
> The app runs **fully offline** and never connects to the internet.

Current release: **1.0.8**.

Everything runs locally on your computer. The app does not contact a server or interact with the running game. Wiki links open in your default browser.

## What It Does

- **Search** tab: search 1,200+ items by name, location, or area. Filter by source type. Sort by any column.
- **Favorites** tab: star important items and mark them acquired. Track pickup progress across sessions.
- **Builds** tab: 160 curated build presets with stat filtering. Each preset shows required weapons, seals, staves, armor, talismans, spells, and ashes along with their vanilla locations sorted by rough area progression.
- **Build stat spreads**: source-backed stat spreads are labeled as `Source stats`; fallback spreads are labeled as `Estimated stats` and are generated to match the build's displayed target level where possible.
- **Build favorites and notes**: favorite builds appear at the top of the build list, and each selected build includes short objective notes about its core equipment and combat profile.
- **Custom builds**: create your own build checklists. Same matching engine as presets. Persisted locally.
- **Browse** tab: select stats (e.g. Strength + Faith) to see every matching item, ordered by how early you can reach it.
- **Guide** tab: built-in tutorial covering all features and mechanics.
- **Wiki links**: every item name links to the Elden Ring Fextralife wiki for quick reference.
- Exports visible results as CSV or JSON.

## How To Use It

1. Install or run Elden Ring Index and Build Planner.
2. Use the tabs at the top to search, manage favorites, plan builds, or browse items.
3. Star useful results and mark them acquired as you collect them.

Item locations are harvested from the Elden Ring Fextralife wiki and supplemented with manual corrections. They reflect fixed vanilla placements, not randomized drops.

## Data Sources

- **Fextralife wiki**: item locations harvested from [eldenring.wiki.fextralife.com](https://eldenring.wiki.fextralife.com/), parsed by `scripts/fextra/`.
- **Cached Fextralife builds page**: build requirements, stat tags, and available source stat spreads from `Builds _ Elden Ring Wiki.htm`.
- **ERDB**: canonical item names and stats from [EldenRingDatabase/erdb](https://github.com/EldenRingDatabase/erdb).
- **Community checklists**: supplementary data from curated item lists.
- **Manual corrections**: reviewed overrides for items where automated parsing needed adjustment (see `data/fextra-location-overrides.json`).

## Run Or Build From Source

Requirements:

- Node.js 18 or newer
- npm

Common commands:

```bash
npm ci              # install exact dependencies from package-lock.json
npm test            # run parser, build planner, and data integrity tests
npm run dev         # run the browser version locally
npm run electron:dev # run the desktop app in development mode
npm run build       # build the web app into dist/
npm run dist        # build the Windows NSIS installer into release/
```

Expected output after `npm run dist`:

```text
release/Elden Ring Index and Build Planner <version> Setup.exe   (~81 MB)
release/win-unpacked/                                             (portable, run directly)
```

The `win-unpacked/` directory contains the app in unpacked form — no installer, no self-extraction. It can be inspected directly: the main executable is `win-unpacked/Elden Ring Index and Build Planner.exe`, the application code is in `win-unpacked/resources/app.asar` (Electron archive format, extractable with `npx asar extract`).

### Source code layout

```
electron/       Node.js main process (window creation)
src/            TypeScript + React renderer (components, build data, vanilla database)
tests/          automated tests (vitest)
scripts/        Build data maintenance scripts (build-vanilla-db, fextra harvest, build stat reconciliation)
data/           Fextra location overrides and review files
package.json    Dependencies (React, Electron, electron-builder, vite, vitest)
```

All execution happens locally. There is no telemetry, no analytics, no CDN, no server backend.

## Build Preset Notes

The starter build presets are practical item checklists inspired by public Elden Ring build guides, including Fextralife's Elden Ring Builds page. They cover categories from Beginner through Level 150-200, Journey 2, and SOTE (Shadow of the Erdtree). They are not full route plans or claims that a run is beatable with a build.

Stat spreads are source-first. When the saved builds page contains a confidently matched stat spread for a build, the planner labels it `Source stats`. When no exact source spread is available, the planner labels the spread `Estimated stats`; those estimates are generated from item requirements, primary/secondary stat tags, starting classes, and the displayed build level.

## License

MIT
