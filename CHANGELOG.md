# Changelog

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

