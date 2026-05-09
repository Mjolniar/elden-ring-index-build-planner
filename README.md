# Elden Ring Randomizer Index and Build Planner

A desktop tool for searching Elden Ring Item & Enemy Randomizer spoiler logs, planning build pickups, and browsing items by stat affinity.

If you are playing a randomized seed and want to know where an item ended up, this app lets you load the spoiler log, search by item or location, mark useful finds as favorites, track what you have already picked up, check common build requirements against the loaded seed, and explore items filtered by stat type sorted by area progression.

Everything runs locally on your computer. The app does not upload spoiler logs, contact a server, edit game files, or interact with the running game. Wiki links open in your default browser.

## What It Does

- Loads `.txt` spoiler logs from the Elden Ring Item & Enemy Randomizer.
- **Search** tab: search by item name, location, area, or replaced item. Filter by source type. Sort by any column.
- **Favorites** tab: star important items and mark them acquired. Track pickup progress across sessions.
- **Builds** tab: 100+ curated build presets with stat filtering. Matches weapons, seals, staves, armor, talismans, spells, and ashes against the loaded spoiler log. Items sorted by rough area progression.
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

This is an Electron app packaged as a Windows NSIS installer. The current release format is an unsigned setup executable, which can sometimes trigger reputation-based antivirus warnings on new builds. If you prefer a fully portable version that runs without installation, the `win-unpacked` directory inside the release output can be run directly.

The source code is included in this repository and the app can be rebuilt from source. The app does not install a Windows service, modify Elden Ring files, inject into the game process, or make network requests. The only external links are to the Fextralife Elden Ring wiki from item-name links in the UI.

Reviewer verification:

```bash
npm ci
npm test
npm run build
npm run dist
```

Expected build output:

```text
dist/
release/Elden Ring Randomizer Index and Build Planner <version> Setup.exe
release/win-unpacked/
```

Test suite: 48 tests covering spoiler log parsing, build matchers, freeform detection, data integrity, and stat filtering.

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

The starter build presets are practical item checklists inspired by public Elden Ring build guides, including Fextralife's Elden Ring Builds page. They cover categories from Beginner through Level 150-200, Journey 2, and SOTE (Shadow of the Erdtree). They are not full route plans, stat calculators, or claims that a seed is beatable with a build. The app matches known build requirements against the currently loaded spoiler log and sorts found items by rough area progression.

## License

MIT
