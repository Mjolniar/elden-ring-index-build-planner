# Changelog

## Elden Ring Index and Build Planner 1.0.8 - 2026-05-10

### Changed
- Rebuilt build stat allocations from the cached Fextralife builds page where explicit source stat spreads are available.
- Replaced broad softcap-only recommended allocations with exact-level fallback estimates for builds without usable source stat spreads.
- Added source metadata to build stat spreads so the planner can distinguish `source` stats from `estimated` stats.
- Renamed the planner stat section from generic recommended allocation to source-aware labels: `Source stats` or `Estimated stats`.
- Added tooltip context explaining whether a stat spread came from the saved build page or was estimated from item requirements plus primary/secondary stat tags.
- Updated README release documentation for the current build planner, stat-source model, and test/build commands.

### Fixed
- Exact-level builds now validate back to their displayed rune level. A build labeled `Level 150` should now compute as RL 150 unless it is using an explicit source stat spread for a broader level range.
- Prevented estimated spreads from presenting as scraped/source-authored values.

### Validation
- `npm test`: 54 tests passing.
- `npx tsc --noEmit`: passing.
- `npm run dist`: packaged successfully.

### Artifact
- `release/Elden Ring Index and Build Planner 1.0.8 Setup.exe`

## Elden Ring Randomizer Index and Build Planner 1.4.4 - 2026-05-10

### Changed
- Applied the same source-first stat reconciliation model used by the vanilla planner.
- Rebuilt all build stat spreads so explicit cached-page values are used first and missing values fall back to exact-level estimates.
- Added source/estimated stat labels and tooltip context to the build planner UI.
- Updated README release documentation for the current randomizer planner, spoiler-log workflow, and test/build commands.

### Fixed
- Exact `Level N` randomizer build entries now have regression coverage to keep displayed level and computed rune level aligned.
- Build stat spreads now explicitly identify estimated data instead of implying that every spread came directly from the source page.

### Validation
- `npm test`: 61 tests passing.
- `npx tsc --noEmit`: passing.
- `npm run dist`: packaged successfully.

### Artifact
- `release/Elden Ring Randomizer Index and Build Planner 1.4.4 Setup.exe`

