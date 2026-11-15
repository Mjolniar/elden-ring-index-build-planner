import type { ItemRecord, SpoilerSettings, DataSourceKind } from '../types';
import { recordsToCSV, sanitizeRecordsForExport } from '../exportHelpers';
import { DEFAULT_SPOILER_SETTINGS } from '../spoilerSettings';

interface Props {
  records: ItemRecord[];
  filename: string;
  spoilerSettings?: SpoilerSettings;
  sourceKind?: DataSourceKind;
}

function download(content: string, name: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function baseName(filename: string): string {
  return filename.replace(/\.[^.]+$/, '');
}

export function ExportButtons({
  records,
  filename,
  spoilerSettings = DEFAULT_SPOILER_SETTINGS,
  sourceKind = 'vanilla',
}: Props) {
  if (records.length === 0) return null;

  const base = baseName(filename);

  function handleCSV() {
    download(
      recordsToCSV(records, spoilerSettings, sourceKind),
      `${base}.csv`,
      'text/csv',
    );
  }

  function handleJSON() {
    const sanitized = sanitizeRecordsForExport(records, spoilerSettings, sourceKind);
    download(JSON.stringify(sanitized, null, 2), `${base}.json`, 'application/json');
  }

  return (
    <div className="export-buttons">
      <span className="export-label">Export visible:</span>
      <button className="export-btn" onClick={handleCSV}>CSV</button>
      <button className="export-btn" onClick={handleJSON}>JSON</button>
    </div>
  );
}
