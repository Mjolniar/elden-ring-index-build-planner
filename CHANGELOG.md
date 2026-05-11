# Changelog

## Elden Ring Randomizer Index and Build Planner 1.5.0 - 2026-05-10

### Added
- **Settings tab** with a master spoiler mode toggle. When enabled, exact item locations are hidden; users choose what partial information to reveal (area, source type, hint).
- **Three-level hint system** (Easy / Medium / Hard) for use in spoiler mode. Difficulty is configurable in Settings.
  - *Easy*: source type and named area (e.g. "Ground pickup in Caelid").
  - *Medium*: source type and thematic regional description without place names (e.g. "Ground pickup somewhere in the rot-blighted eastern wastes").
  - *Hard*: acquisition method and broad game-stage only (e.g. "Found on the ground — mid game").
- **80+ hand-written boss hints** and **30+ merchant hints** providing narrative clues at each difficulty level, with specific navigation detail at easy and thematic-only clues at hard.
- **Area progression and region label tables** (`AREA_PROGRESSION`, `AREA_REGION_LABEL`) covering all base-game areas and DLC regions used by fallback hint generation.
- Spoiler settings now apply to the **Build Planner** tab: the "Randomized location" column becomes a "Hint" column in spoiler mode (or is hidden); the Area column is gated on the showArea setting.

### Changed
- `generateHint` moved from `SearchTable.tsx` into `locationHints.ts` as an exported function so it can be shared across components.
- Fallback hint for `unknown` source type now returns `"Obtainable"` / `"Obtainable — {stage}"` instead of the useless bare string `"Unknown source"`.
- Search haystack in spoiler mode excludes `locationName` so the search bar cannot be used to accidentally reveal location info.

### Validation
- `npm test`: 61 tests passing.
- `npx tsc --noEmit`: passing.

---

## Elden Ring Randomizer Index and Build Planner 1.4.4 - 2026-05-10

### Changed
- Rebuilt build stat allocations from the cached Fextralife builds page where explicit source stat spreads are confidently matched.
- Replaced broad softcap-only recommended allocations with exact-level fallback estimates for builds without usable source stat spreads.
- Added source metadata to build stat spreads so the planner can distinguish `source` stats from `estimated` stats.
- Renamed the planner stat section from generic recommended allocation to source-aware labels: `Source stats` or `Estimated stats`.
- Added tooltip context explaining whether a stat spread came from the saved build page or was estimated from item requirements plus primary/secondary stat tags.
- Updated README release documentation for the current randomizer planner, spoiler-log workflow, source/estimated stat model, and test/build commands.

### Fixed
- Exact-level builds now validate back to their displayed rune level. A build labeled `Level 150` should now compute as RL 150 unless it is using an explicit source stat spread for a broader level range.
- Prevented estimated spreads from presenting as scraped/source-authored values.

### Validation
- `npm test`: 61 tests passing.
- `npx tsc --noEmit`: passing.
- `npm run dist`: packaged successfully.

### Artifact
- `release/Elden Ring Randomizer Index and Build Planner 1.4.4 Setup.exe`

