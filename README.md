# Elden Ring Randomizer Index

A local-first search tool for Elden Ring Item & Enemy Randomizer spoiler logs. Load a spoiler log, search item placements by name or location, filter by source type, and export results as CSV or JSON.

## How to generate a spoiler log

1. Open `EldenRingRandomizer.exe` and configure your options.
2. Click **Randomize items and enemies**.
3. A spoiler log file is written to the `spoiler_logs\` folder inside the randomizer directory (e.g. `spoiler_20240501_seed1234567890.txt`).

## Using this tool

### Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Load a log

Drag and drop the `.txt` spoiler log file onto the upload area, or click it to browse. The log is read entirely in your browser — **no data is sent to any server**.

### Search and filter

- **Text search** — filters by item name, location, area, or replaced item simultaneously.
- **Source type** — narrow to boss drops, shop items, ground pickups, enemy drops, starting loadout, or event rewards.
- **Key items only** — shows only items flagged as key items (progression blockers) by the randomizer.
- Click a column header to sort. Click any row to expand it and see the raw spoiler-log line.

### Export

The **CSV** and **JSON** export buttons export the currently visible (filtered) records.

## Privacy

All file reading and parsing runs in your browser via the File API. No data leaves your machine.

## Limitations

The parser is built around the spoiler log format produced by [thefifthmatt's Elden Ring Item and Enemy Randomizer](https://www.nexusmods.com/eldenring/mods/428). It handles:

- `--- Section name ---` and `=== Section name ===` style headers
- `Location (Area): Item (was Original) [key]` entries
- `Item: Location` key-item shorthand entries
- `Location -> Item` arrow-style entries

If your spoiler log uses a different format, check the **Parser diagnostics** panel — unmatched lines are preserved there for inspection. The parser is designed to be conservative: when a line can't be confidently parsed it goes to diagnostics rather than being silently dropped.

### Real-log hardening

No actual game data is included in this repository. The parser was built and tested against synthetic fixtures modeled on the metadata in the randomizer's `diste/Base/` directory. After loading a real spoiler log, the diagnostics panel will show any unmatched lines. If you encounter a format the parser doesn't handle, open an issue with a sanitized sample line (no personal/run data required).

## Development

```bash
npm test          # run unit tests (vitest)
npm run build     # production build to dist/
npm run dev       # dev server with HMR
```

### Project layout

```
src/
  parser/
    spoilerLogParser.ts  — section/line parser
    normalize.ts         — item field extraction helpers
    sourceType.ts        — source type inference
    diagnostics.ts       — diagnostics collection
  components/
    UploadPanel.tsx
    Filters.tsx
    SearchTable.tsx
    DiagnosticsPanel.tsx
    ExportButtons.tsx
  types.ts
  App.tsx
  main.tsx
tests/
  fixtures/              — synthetic spoiler log samples
  parser.test.ts         — unit tests for all parser modules
```

## License

MIT
