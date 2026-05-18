# Elden Ring Index and Build Planner

An offline desktop tool for Elden Ring players. On first launch, choose your mode:

- **Vanilla** — browse 1,200+ items with their fixed base-game and DLC locations. Ready immediately, no file needed.
- **Randomizer** — load a spoiler log from the Elden Ring Randomizer to search every item placement in your run.

Switch modes any time from Settings. All state (favorites, acquired, builds, spoiler settings) is kept separately per source so your data never mixes.

## Download

**[→ Latest release (1.2.0)](https://github.com/Mjolniar/elden-ring-index-build-planner/releases/tag/integrated-v1.2.0)**

| Option | File | When to use |
|--------|------|-------------|
| Installer | `Elden.Ring.Index.and.Build.Planner.1.2.0.Setup.exe` | Normal Windows install with a desktop shortcut |
| Portable ZIP | `Elden.Ring.Index.and.Build.Planner.1.2.0.Portable.zip` | No installation — extract and run the .exe inside |

> **"Windows protected your PC"?** Click **More info → Run anyway**. The app is unsigned and open-source — the binary is built from the source code in this repository.

Requires **Windows 64-bit**. Randomizer mode requires a spoiler log from the [Elden Ring Item and Enemy Randomizer](https://www.nexusmods.com/eldenring/mods/428). Vanilla mode needs no additional files.

## Features

- **First-run setup** — choose Vanilla or load a Randomizer spoiler log on first launch; change any time from Settings
- **Search** — filter by item name, location, area, or source type; sort by any column
- **Spoiler mode** — hide exact locations while you play; reveal area, source type, or a generated hint at Easy / Medium / Hard difficulty (custom-written hints for 80+ bosses and 30+ merchants)
- **Favorites** — star items you need, mark them acquired as you collect them, track progress across sessions
- **Builds** — 100+ curated build presets with stat filtering and area-progression sorting; custom build creator saved locally
- **Regions** — select a major region and drill into sub-locations to see every weapon available, with acquired tracking
- **Browse** — filter all items by stat type, sorted by rough area progression
- **Export** — visible results as CSV or JSON
- **Wiki links** — every item name links to the Fextralife wiki, opens in your default browser
- **Fully offline** — no network requests, no telemetry, no data sent anywhere

## Development

Requires Node.js 18+ and npm.

```bash
git clone https://github.com/Mjolniar/elden-ring-index-build-planner.git
cd elden-ring-index-build-planner
npm ci
```

Dev server (browser):

```bash
npm run dev
```

Dev server (Electron desktop):

```bash
npm run electron:dev
```

Validation:

```bash
npx tsc --noEmit
npm test -- --run
npm run build
```

Packaging:

```bash
npm run dist
```

## Architecture

The app uses a content profile model. All per-source state (favorites, acquired, custom builds, spoiler settings) is scoped to the active source ID so Vanilla and Randomizer data never collide.

```ts
interface ContentProfile {
  baseMode: 'vanilla' | 'randomizer-log';
  enabledModPacks: ModPackId[]; // planned: 'reforged' | 'convergence'
}
```

Future mod support (Elden Ring Reforged, The Convergence) has placeholder controls in Settings but no data bundled yet. That work requires a separate data pipeline and permission review.

## Data Sources

- Vanilla item locations: [Fextralife wiki](https://eldenring.wiki.fextralife.com)
- Item stats and names: [ERDB](https://github.com/EldenRingDatabase/erdb)
- Build presets: Fextralife, YouTube, and community guides (item checklists, not stat calculators)
- Manual location corrections: `data/fextra-location-overrides.json`
- Randomizer data: user-supplied spoiler log `.txt` files only

## Privacy

The app runs fully offline. It stores favorites, acquired state, custom builds, settings, and cached spoiler logs locally on your computer. It does not connect to any server, upload data, modify game files, or interact with a running game. Wiki links open in your default browser only when clicked.

[Full privacy policy](https://mjolniar.github.io/elden-ring-apps-privacy/)

## License

MIT
