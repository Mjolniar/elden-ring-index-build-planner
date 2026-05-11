# Changelog

## Elden Ring Index and Build Planner 1.1.1 - 2026-05-11

### Added
- **AGENTS.md** — multi-agent context file (AI assistant onboarding, task triage, branch overview, conventions).

### Fixed
- **"Unknown region" hints** — expanded area progression and region label tables with 130+ sub-area entries covering every cave, catacomb, tunnel, evergaol, fort, and minor location across the base game and DLC. Added fuzzy substring fallback so sub-area strings absent from the exact-match tables resolve to their parent region. Medium-difficulty hints now show actual region descriptions instead of "an unknown region"; hard-difficulty hints now include game-stage labels instead of giving no stage at all.

### Validation
- `npm test`: 54 tests passing.
- `npx tsc --noEmit`: passing.

---

## Elden Ring Index and Build Planner 1.1.0 - 2026-05-10

### Added
- **Settings tab** with a master spoiler mode toggle. When enabled, exact item locations are hidden; users choose what partial information to reveal (area, source type, hint).
- **Three-level hint system** (Easy / Medium / Hard) for use in spoiler mode. Difficulty is configurable in Settings.
  - *Easy*: source type and named area (e.g. "Ground pickup in Caelid").
  - *Medium*: source type and thematic regional description without place names (e.g. "Ground pickup somewhere in the rot-blighted eastern wastes").
  - *Hard*: acquisition method and broad game-stage only (e.g. "Found on the ground — mid game").
- **Area progression and region label tables** covering all base-game areas and DLC regions used by hint generation.
- Spoiler settings applied to the **Build Planner** tab: the "Location" column becomes a "Hint" column in spoiler mode; the Area column is gated on the showArea setting.

### Changed
- Search haystack in spoiler mode excludes location names but always includes the original scraped location (`originalItem`) so it remains searchable regardless of spoiler settings.
- Search placeholder updates to "Search item or area…" when spoiler mode is enabled.

### Validation
- `npm test`: 54 tests passing.
- `npx tsc --noEmit`: passing.

---

## Elden Ring Index and Build Planner 1.0.8 - 2026-05-10

### Changed
- Rebuilt recommended stat allocations using a source-first model: explicit stat spreads from cached Fextralife build pages are used where available; everything else falls back to exact-level estimates derived from item requirements and stat tags.
- Build planner stat section now labels its source — "Source stats" when the spread came from the build page, "Estimated stats" when it was computed.
- Added a tooltip in the build header explaining whether the displayed stat spread is sourced or estimated.

### Fixed
- Exact-level builds (e.g. "Level 150") now compute back to their stated rune level. Previously some builds reported a slightly different level due to mismatched source data.
- Estimated spreads no longer present as if they were scraped directly from the build page.

### Validation
- `npm test`: 54 tests passing.
- `npx tsc --noEmit`: passing.

---

## Elden Ring Index and Build Planner 1.0.2 - 2026-05-09

### Added
- Computed `statRequired` for all 160 build presets from Fextralife item data and game CSV files. All five relevant stats (Str/Dex/Int/Fai/Arc) are now populated.

### Fixed
- Rivers of Blood requirement kind corrected.
- Missing Arcane requirements added for relevant builds.
- Kind mismatches corrected across multiple presets.

### Validation
- `npm test`: 54 tests passing.
- `npx tsc --noEmit`: passing.

---

## Elden Ring Index and Build Planner 1.0.1 - 2026-05-09

### Added
- **3,321 Fextralife location overrides** applied on top of the base dataset, improving location string quality and accuracy across the item database.
- 59 additional items sourced from Fextralife that were absent from the base spreadsheet data.

### Fixed
- Filtered out description strings that were being used as location names (e.g. item flavor text incorrectly stored in the location field).
- Cleaned and deduplicated location entries across weapons, spells, ashes, and items.

---

## Elden Ring Index and Build Planner 1.0.0 - 2026-05-09

### Initial release

- **1,873 items** with real vanilla locations sourced from community spreadsheet data, covering weapons, armor, spells, ashes of war, talismans, spirits, shields, ammunition, and key items across the base game and Shadow of the Erdtree.
- Search every item by name, location, or area. Filter by source type (boss drop, ground pickup, shop, enemy drop, event, starting equipment). Sort any column.
- **Favorites tab** — star items and mark them acquired. Progress tracked per session.
- **Build Planner tab** — 100+ curated build presets with stat filtering. Each build shows its item requirements and highlights which items you already have. Stat bars, rune cost calculator, and optimal starting class suggestion.
- **Custom build creator** — define your own item checklists and save them locally.
- **Browse tab** — filter every item by stat affinity (Strength, Dexterity, Intelligence, Faith, Arcane), sorted by area progression.
- **Guide tab** — built-in tutorial covering all features.
- Fextralife wiki links on every item name in all tables.
- Export results as CSV or JSON.
- Runs as a Windows desktop app (Electron) with installer and portable ZIP options.
- Fully offline — no network requests, no data sent anywhere.
