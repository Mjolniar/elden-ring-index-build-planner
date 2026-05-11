# Elden Ring Randomizer Index and Build Planner

A desktop tool for searching Elden Ring Item & Enemy Randomizer spoiler logs, planning build pickups, and browsing items by stat affinity.

## ⬇️ Download

**[→ Latest release on GitHub](https://github.com/Mjolniar/elden-ring-index-build-planner/releases/latest)**

On the release page, scroll to **Assets** and download one of:

| Option | File | When to use |
|--------|------|-------------|
| **Installer** (recommended) | `...Setup.exe` | First install — adds a Start Menu shortcut |
| **Portable ZIP** | `...Portable.zip` | No installation needed — extract and run the `.exe` inside |

> **"Windows protected your PC"?** Click **More info → Run anyway**. This appears because the app is unsigned. It is open-source and built from the code in this repository.
> The app runs **fully offline** and never connects to the internet.

Current release: **1.5.0**.

If you are playing a randomized seed and want to know where an item ended up, this app lets you load the spoiler log, search by item or location, mark useful finds as favorites, track what you have already picked up, check common build requirements against the loaded seed, and explore items filtered by stat type sorted by area progression. A spoiler mode hides exact locations behind configurable hints so you can browse your seed without seeing where everything is.

Everything runs locally on your computer. The app does not upload spoiler logs, contact a server, edit game files, or interact with the running game. Wiki links open in your default browser.

## What It Does

- Loads `.txt` spoiler logs from the Elden Ring Item & Enemy Randomizer.
- **Search** tab: search by item name, location, or area. Filter by source type. Sort by any column.
- **Favorites** tab: star important items and mark them acquired. Track pickup progress across sessions.
- **Builds** tab: 160 curated build presets with stat filtering. Matches weapons, seals, staves, armor, talismans, spells, and ashes against the loaded spoiler log. Items sorted by rough area progression.
- **Build stat spreads**: source-backed stat spreads are labeled as `Source stats`; fallback spreads are labeled as `Estimated stats` and are generated to match the build's displayed target level where possible.
- **Build favorites and notes**: favorite builds appear at the top of the build list, and each selected build includes short objective notes about its core equipment and combat profile.
- **Custom builds**: create your own build checklists. Same matching engine as presets. Persisted locally.
- **Browse** tab: select stats (e.g. Strength + Faith) to see every matching item in your seed, ordered by how early you can reach it.
- **Settings** tab: toggle spoiler mode to hide exact item locations. Choose what partial information to show — area, source type, or a generated hint. Three hint difficulty levels (Easy / Medium / Hard) with custom-written hints for 80+ bosses and 30+ merchants.
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

## Why Windows May Warn About This File

This is an Electron app (bundles Chromium + Node.js). Because it is unsigned, reputation-based scanners like SmartScreen may flag it on first run. Click **More info → Run anyway**. The VirusTotal scan for each release is linked on the release page.

- **Does**: reads `.txt` spoiler log files you load, parses them into a searchable table, matches items against build presets, caches the last log in a local file.
- **Does not**: make network requests, phone home, modify game files, access game memory, or upload any data. The only outbound links are wiki pages you explicitly click.

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

## Parser Notes

The parser supports the real v0.114 randomizer spoiler log format and several older variants. Lines that can't be parsed appear in the Diagnostics tab rather than being silently dropped.

## Build Preset Notes

Build presets are practical item checklists drawn from public Elden Ring build guides. They are not route plans. The planner matches each build's required items against your loaded spoiler log and sorts results by rough area progression.

Stat spreads are labeled **Source stats** when taken directly from a Fextralife build page, or **Estimated stats** when computed from item requirements and stat tags.

## Privacy

This app collects no data. Full privacy policy: https://mjolniar.github.io/elden-ring-apps-privacy/

## License

MIT
