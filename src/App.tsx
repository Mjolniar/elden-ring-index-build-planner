import { useState, useMemo } from 'react';
import type { ParseResult, FilterState, ItemRecord } from './types';
import { parseSpoilerLog } from './parser';
import { UploadPanel } from './components/UploadPanel';
import { Filters } from './components/Filters';
import { SearchTable } from './components/SearchTable';
import { DiagnosticsPanel } from './components/DiagnosticsPanel';
import { ExportButtons } from './components/ExportButtons';

function applyFilters(records: ItemRecord[], f: FilterState): ItemRecord[] {
  const q = f.search.toLowerCase().trim();
  return records.filter((r) => {
    if (f.keyItemsOnly && !r.isKeyItem) return false;
    if (f.sourceType !== 'all' && r.sourceType !== f.sourceType) return false;
    if (q) {
      const haystack = `${r.itemName} ${r.locationName} ${r.area ?? ''} ${r.originalItem ?? ''}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

const DEFAULT_FILTERS: FilterState = { search: '', sourceType: 'all', keyItemsOnly: false };

export default function App() {
  const [result, setResult] = useState<ParseResult | null>(null);
  const [filename, setFilename] = useState('');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  function handleFile(text: string, name: string) {
    setFilename(name);
    setFilters(DEFAULT_FILTERS);
    setResult(parseSpoilerLog(text));
  }

  function handleReset() {
    setResult(null);
    setFilename('');
    setFilters(DEFAULT_FILTERS);
  }

  const visible = useMemo(
    () => (result ? applyFilters(result.records, filters) : []),
    [result, filters]
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Elden Ring Randomizer Index</h1>
        {result && (
          <button className="reset-btn" onClick={handleReset}>
            Load new log
          </button>
        )}
      </header>

      {!result ? (
        <div className="landing">
          <UploadPanel onFile={handleFile} />
          <p className="landing-hint">
            Generate a spoiler log in the Elden Ring Randomizer, then load it here to search
            item placements. All processing happens locally in your browser.
          </p>
        </div>
      ) : (
        <main className="main-layout">
          <div className="toolbar">
            <Filters
              filters={filters}
              onChange={setFilters}
              totalVisible={visible.length}
              totalRecords={result.records.length}
            />
            <ExportButtons records={visible} filename={filename} />
          </div>
          <SearchTable records={visible} />
          <DiagnosticsPanel
            diagnostics={result.diagnostics}
            seed={result.seed}
            filename={filename}
          />
        </main>
      )}
    </div>
  );
}
