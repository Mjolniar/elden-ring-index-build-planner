# Elden Ring Randomizer Index

A small desktop tool for searching Elden Ring Item & Enemy Randomizer spoiler logs.

If you are playing a randomized seed and want to know where an item ended up, this app lets you load the spoiler log, search by item or location, mark useful finds as favorites, and track what you have already picked up.

Everything runs locally on your computer. The app does not upload spoiler logs, contact a server, edit game files, or interact with the running game.

## What It Does

- Loads `.txt` spoiler logs from the Elden Ring Item & Enemy Randomizer.
- Searches by item name, location, area, or replaced item.
- Filters results by source type, such as boss drops, shops, ground pickups, and key items.
- Lets you star important results as favorites.
- Lets you mark favorite items as acquired while you play.
- Exports the visible results as CSV or JSON.
- Remembers the last loaded spoiler log in the desktop version.

## How To Use It

1. Generate a spoiler log with the Elden Ring Item & Enemy Randomizer.
2. Open Elden Ring Randomizer Index.
3. Drop the spoiler log into the upload area, or browse for it manually.
4. Search for the item, area, or location you care about.
5. Star useful results and mark them acquired as you collect them.

The desktop app keeps a local copy of the most recent spoiler log in `cached-spoiler-logs\` next to the executable. This is only so the app can restore the same log the next time it opens.

## Getting A Spoiler Log

1. Open `EldenRingRandomizer.exe`.
2. Configure and run your randomizer seed.
3. Look in the randomizer's `spoiler_logs\` folder for the generated `.txt` spoiler log.

This app is made for spoiler logs from [thefifthmatt's Elden Ring Item and Enemy Randomizer](https://www.nexusmods.com/eldenring/mods/428).

## Notes For Nexus Mods And File Reviewers

This is an Electron app packaged as a Windows portable executable. The current release format is a single unsigned self-extracting `.exe`, which can sometimes trigger reputation-based antivirus or static-ML warnings on new builds.

The source code is included in this repository and the app can be rebuilt from source. The app does not install a Windows service, modify Elden Ring files, inject into the game process, or make network requests.

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
release/Elden Ring Randomizer Index <version>.exe
release/win-unpacked/
```

## Run Or Build From Source

Requirements:

- Node.js 18 or newer
- npm

Common commands:

```bash
npm ci              # install exact dependencies from package-lock.json
npm test            # run parser tests
npm run dev         # run the browser version locally
npm run electron:dev # run the desktop app in development mode
npm run build       # build the web app into dist/
npm run dist        # build the Windows portable app into release/
```

## Parser Notes

The parser supports the real v0.11.4 randomizer spoiler format plus a few older/common variants. If a line cannot be understood, it is shown in the parser diagnostics panel instead of being silently ignored.

## License

MIT
