# Elden Ring Index and Build Planner

> [!WARNING]
> **AI-generated.** Code and docs written by AI coding agents. No independent review. Use at your own risk.

Offline Windows app: Elden Ring item search, favorites and build planning.

- **Vanilla:** 1,200+ items with base-game and DLC locations. No setup.
- **Randomizer:** load an [Item and Enemy Randomizer](https://www.nexusmods.com/eldenring/mods/428) spoiler log;
  search where items ended up.

Switch in Settings. Each mode keeps its own favorites, acquired items, builds and spoiler settings.

## Download

[Latest release](https://github.com/Mjolniar/elden-ring-index-build-planner/releases/latest):

- `...Setup.exe`: installer.
- `...Portable.zip`: extract and run.

Windows 64-bit. Unsigned: on "Windows protected your PC", click **More info > Run anyway**.

## Features

- Search: name, location, area, source type. Sort any column.
- Spoiler mode: hide locations; reveal area, source type or a hint (Easy/Medium/Hard; custom hints for 80+ bosses
  and 30+ merchants).
- Favorites: star items, mark acquired, track progress.
- Builds: 100+ presets, stat filter, area-progression order. Custom builds.
- Regions: every weapon per region and sub-location, with acquired tracking.
- Browse: items by stat type, in area-progression order.
- Export: CSV, JSON.
- Wiki links: Fextralife, opened in your browser.
- No network requests. No telemetry.

## Develop

Node.js 18+, npm.

```bash
npm ci
npm run dev            # browser
npm run electron:dev   # desktop
npx tsc --noEmit       # validate
npm test -- --run
npm run build
npm run dist           # package
```

## Architecture

Content profile model. All per-source state is keyed by the active source ID.

```ts
interface ContentProfile {
  baseMode: 'vanilla' | 'randomizer-log';
  enabledModPacks: ModPackId[]; // planned: 'reforged' | 'convergence'
}
```

Planned mod packs (Elden Ring Reforged, The Convergence): placeholder settings only. No data bundled.

## Data sources

- Locations: [Fextralife wiki](https://eldenring.wiki.fextralife.com)
- Stats and names: [ERDB](https://github.com/EldenRingDatabase/erdb)
- Build presets: Fextralife, YouTube, community guides. Item checklists, not stat calculators.
- Location fixes: `data/fextra-location-overrides.json`
- Randomizer: your spoiler log only

## Privacy

Stores favorites, acquired items, builds, settings and cached spoiler logs on your PC. No server, no uploads, no
game file changes, no game process access. [Privacy policy](https://mjolniar.github.io/elden-ring-apps-privacy/).

## License

MIT
