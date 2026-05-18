# Elden Ring Index and Build Planner

This branch is the in-progress integrated edition of Elden Ring Index and Build Planner. It combines the fixed-location vanilla item index with the randomizer spoiler-log companion workflow in one offline desktop app.

The default experience remains the normal vanilla Elden Ring index: answer the first-run setup prompt, search items, plan builds, track favorites, and mark pickups acquired. Randomizer support can be selected during first-run setup or enabled later from Settings by loading a spoiler log, which lets the same search, favorites, regions, browse, and build-planner tools use randomized item locations.

This branch is not a published release yet. Public releases are still tracked separately with `vanilla-v*` and `randomizer-v*` tags until the integrated app is ready.

## Integrated Branch Goals

- Keep Vanilla as the default app mode.
- Move Randomizer support into Settings as a content-profile option.
- Load Randomizer spoiler logs locally and use them as the active placement source.
- Preserve Randomizer diagnostics, cache restore, and spoiler-log parsing behavior.
- Keep favorites, acquired items, custom builds, and build favorites scoped by active content source.
- Prepare the architecture for future mod content packs such as Elden Ring Reforged and The Convergence.
- Stay fully offline: no telemetry, analytics, remote API calls, or runtime downloads.

## Content Model

The integrated app should be built around a content profile rather than separate app editions.

```ts
type BaseContentMode = 'vanilla' | 'randomizer-log';
type ModPackId = 'reforged' | 'convergence';

interface ContentProfile {
  baseMode: BaseContentMode;
  enabledModPacks: ModPackId[];
}
```

The long-term active dataset model is:

```text
Vanilla records
+ enabled mod-pack additions/overrides
+ optional randomizer spoiler-log placements
= active item dataset
```

Randomizer is treated as a placement/source mode, not a mod pack. Reforged and Convergence are planned as future content packs because they may add or override items, bosses, shops, areas, stats, and locations.

## Current Scope

Implemented or under active review on this branch:

- Vanilla item database mode.
- Randomizer spoiler-log mode.
- First-run setup that asks whether the user is using the Elden Ring Randomizer.
- Source/content-profile scoped persistence.
- Shared search, regions, favorites, acquired tracking, build planner, browse, export, and guide behavior.
- Randomizer spoiler-log cache IPC in Electron.
- Randomizer parser diagnostics when a log is loaded.
- Source-aware UI copy for vanilla database vs. loaded spoiler log.
- Randomizer boss and merchant hint parity with the `randomizer` branch.

## Planned Settings Layout

The app should open directly into the vanilla index/build planner. Settings should own content configuration.

Planned Settings sections:

### Content Profile

- Vanilla: default fixed-location item database.
- Randomizer spoiler log: enables spoiler-log loading and uses randomized locations.

When Randomizer spoiler-log mode is selected, Settings should expose:

- Load spoiler log.
- Cached log status.
- Clear loaded log.
- Parser diagnostics status/link.

### Mod Content

Future placeholder controls only:

- Elden Ring Reforged.
- The Convergence.

These should remain disabled/planned until a separate data pipeline and permission review exist.

## Future Mod Support

The integrated branch should prepare for mod support, but should not bundle real mod data yet.

Future mod support will likely need:

- A structured mod-pack manifest format.
- Local/offline imported records.
- Item aliases and conflict handling.
- Source labels for modded locations and altered stats.
- Permission review for each mod source.
- Separate validation for added or overridden records.

Do not add Reforged or Convergence data in this branch until that plan is explicit.

## Out Of Scope For This Branch

- Reforged data integration.
- Convergence data integration.
- Nexus downloads.
- Wiki scraping for mod content.
- Remote repository fetching at runtime.
- Seed-to-spoiler-log generation.
- Game file modification.
- Game memory access.
- Telemetry, analytics, or runtime network calls.
- Release tagging or publishing.

## What It Does

- Search items by name, location, area, source type, or active content source metadata.
- Star favorites and mark items acquired.
- Use curated build presets to find required weapons, seals, staves, armor, talismans, spells, and ashes.
- Create custom build checklists.
- Look up available weapons by selected region.
- Browse items by stat affinity.
- Export visible results as CSV or JSON.
- Load Randomizer spoiler logs locally when Randomizer mode is enabled.
- Show parser diagnostics for loaded Randomizer logs.

## How To Use During Development

Requires Node.js 18+ and npm.

```bash
git clone https://github.com/Mjolniar/elden-ring-index-build-planner.git
cd elden-ring-index-build-planner
git switch integrated
npm ci
npm run dev
```

Desktop development:

```bash
npm run electron:dev
```

Validation:

```bash
npx tsc --noEmit
npm test -- --run
npm run build
```

Current integrated-branch validation status: `npx tsc --noEmit`, `npm test -- --run` with 121 passing tests, and `npm run build` all pass. The production build currently reports Vite's existing large chunk-size warning.

Packaging remains release-controlled and should not be treated as final for this branch until product naming/versioning are decided.

## Data Sources

Current vanilla data sources:

- Fextralife wiki item locations harvested from eldenring.wiki.fextralife.com.
- Cached Fextralife build page data.
- ERDB item names and stats.
- Community item checklists.
- Manual location corrections in `data/fextra-location-overrides.json`.

Current randomizer data source:

- User-supplied Elden Ring Randomizer spoiler log text files.

Future mod data sources are not yet approved or integrated.

## Privacy

This app is designed to run fully offline. It stores favorites, acquired state, custom builds, settings, and cached spoiler logs locally on the user's computer.

The app does not phone home, upload data, modify game files, or interact with a running game. External wiki links open only when clicked.

Full privacy policy: https://mjolniar.github.io/elden-ring-apps-privacy/

## License

MIT
