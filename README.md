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

## Why Windows May Warn About This File

This is an Electron app (bundles Chromium + Node.js). Because it is unsigned, reputation-based scanners like SmartScreen may flag it on first run. Click **More info → Run anyway**. The VirusTotal scan for each release is linked on the release page.

- **Does**: reads item and location data bundled with the app, displays it in a searchable table, matches items against build presets, stores favorites and acquired state locally.
- **Does not**: make network requests, phone home, modify game files, or upload any data. The only outbound links are wiki pages you explicitly click.

## Build From Source

Requires Node.js 18+ and npm.

```bash
git clone https://github.com/Mjolniar/elden-ring-index-build-planner.git
cd elden-ring-index-build-planner
npm ci && npm test && npm run dist
```

Other commands:

```bash
npm run dev          # browser version locally
npm run electron:dev # desktop app in dev mode
npm run build        # web app only (no installer)
```

## Build Preset Notes

Build presets are practical item checklists drawn from public Elden Ring build guides. They are not route plans. The planner matches each build's required items against the item database and sorts results by rough area progression.

Stat spreads are labeled **Source stats** when taken directly from a Fextralife build page, or **Estimated stats** when computed from item requirements and stat tags.

## License

MIT
