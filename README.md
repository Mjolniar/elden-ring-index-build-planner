# Elden Ring Randomizer Index and Build Planner

A desktop tool for searching Elden Ring Item & Enemy Randomizer spoiler logs, planning build pickups, and browsing items by stat affinity.

Current release: **1.4.4**.

If you are playing a randomized seed and want to know where an item ended up, this app lets you load the spoiler log, search by item or location, mark useful finds as favorites, track what you have already picked up, check common build requirements against the loaded seed, and explore items filtered by stat type sorted by area progression.

Everything runs locally on your computer. The app does not upload spoiler logs, contact a server, edit game files, or interact with the running game. Wiki links open in your default browser.

## What It Does

- Loads `.txt` spoiler logs from the Elden Ring Item & Enemy Randomizer.
- **Search** tab: search by item name, location, area, or replaced item. Filter by source type. Sort by any column.
- **Favorites** tab: star important items and mark them acquired. Track pickup progress across sessions.
- **Builds** tab: 160 curated build presets with stat filtering. Matches weapons, seals, staves, armor, talismans, spells, and ashes against the loaded spoiler log. Items sorted by rough area progression.
- **Build stat spreads**: source-backed stat spreads are labeled as `Source stats`; fallback spreads are labeled as `Estimated stats` and are generated to match the build's displayed target level where possible.
- **Build favorites and notes**: favorite builds appear at the top of the build list, and each selected build includes short objective notes about its core equipment and combat profile.
- **Custom builds**: create your own build checklists. Same matching engine as presets. Persisted locally.
- **Browse** tab: select stats (e.g. Strength + Faith) to see every matching item in your seed, ordered by how early you can reach it.
- **Guide** tab: built-in tutorial covering all features and mechanics.
- **Wiki links**: every item name links to the Elden Ring Fextralife wiki for quick reference.
- Exports visible results as CSV or JSON.
- Remembers the last loaded spoiler log across launches.

## How To Use It

1. Generate a spoiler log with the Elden Ring Item & Enemy Randomizer.
2. Install or run Elden Ring Randomizer Index and Build Planner.
3. Drop the spoiler log into the upload area, or browse for it manually.
4. Use the tabs at the top to search, manage favorites, plan builds, or browse items.
5. Star useful results and mark them acquired as you collect them.

The desktop app keeps a local copy of the most recent spoiler log in `cached-spoiler-logs\` next to the executable. This is only so the app can restore the same log the next time it opens.

## Getting A Spoiler Log

1. Open `EldenRingRandomizer.exe`.
2. Configure and run your randomizer seed.
3. Look in the randomizer's `spoiler_logs\` folder for the generated `.txt` spoiler log.

This app is made for spoiler logs from [thefifthmatt's Elden Ring Item and Enemy Randomizer](https://www.nexusmods.com/eldenring/mods/428).

## Notes For Nexus Mods And File Reviewers

### Why the virus scanner may flag this file

This is an Electron app — it bundles Chromium + Node.js into a single package. The `electron-builder` tool produces a Windows NSIS installer. Because the file is unsigned, newly built, and the NSIS installer self-extracts to a temp directory at install time, automated reputation-based scanners (e.g. McAfee Artemis, Windows SmartScreen) can flag it as untrusted based purely on heuristics.

The current VirusTotal scan for this release shows **0 detections** across all engines.

### What this app does and does NOT do

- **Does**: reads `.txt` spoiler logs you drag in, parses them into a searchable table, matches items against build presets, caches the last log you loaded in a local file next to the app.
- **Does NOT**: install a Windows service, modify Elden Ring game files, inject into any process, access the Elden Ring process memory, make network requests, phone home, or upload any data. The only outbound links are wiki pages you explicitly click on.

### Verifying the build from source

The entire application can be rebuilt from the source code in this repository. The process produces a deterministic build — the reviewer can follow these steps and compare the output:

```bash
git clone https://github.com/Mjolniar/elden-ring-index-build-planner.git
cd elden-ring-index-build-planner
npm ci              # install exact dependencies from package-lock.json
npm test            # run automated tests
npm run dist        # build the Windows NSIS installer into release/
```

Expected output after `npm run dist`:

```text
release/Elden Ring Randomizer Index and Build Planner <version> Setup.exe   (~79 MB)
release/win-unpacked/                                                       (portable, run directly)
```

The `win-unpacked/` directory contains the app in unpacked form — no installer, no self-extraction. It can be inspected directly: the main executable is `win-unpacked/Elden Ring Randomizer Index and Build Planner.exe`, the application code is in `win-unpacked/resources/app.asar` (Electron archive format, extractable with `npx asar extract`).

### Source code layout

```
electron/       Node.js main process (window creation, IPC, spoiler log cache)
src/            TypeScript + React renderer (parser, components, build data)
tests/          automated tests (vitest)
scripts/        Build data maintenance scripts
package.json    Dependencies (React, Electron, electron-builder, vite, vitest)
```

All execution happens locally. There is no telemetry, no analytics, no CDN, no server backend.

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

## Parser Notes

The parser supports the real v0.11.4 randomizer spoiler format plus several older/common variants. If a line cannot be understood, it is shown in the parser diagnostics panel instead of being silently ignored.

## Build Preset Notes

The starter build presets are practical item checklists inspired by public Elden Ring build guides, including Fextralife's Elden Ring Builds page. They cover categories from Beginner through Level 150-200, Journey 2, and SOTE (Shadow of the Erdtree). They are not full route plans or claims that a seed is beatable with a build. The app matches known build requirements against the currently loaded spoiler log and sorts found items by rough area progression.

Stat spreads are source-first. When the saved builds page contains a confidently matched stat spread for a build, the planner labels it `Source stats`. When no exact source spread is available, the planner labels the spread `Estimated stats`; those estimates are generated from item requirements, primary/secondary stat tags, starting classes, and the displayed build level.

## License

MIT
