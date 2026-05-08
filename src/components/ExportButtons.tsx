import type { ItemRecord } from '../types';

interface Props {
  records: ItemRecord[];
  filename: string;
}

function toCSV(records: ItemRecord[]): string {
  const header = ['Item', 'Location', 'Area', 'Source Type', 'Key Item', 'Replaced Item', 'Section'];
  const rows = records.map((r) => [
    r.itemName,
    r.locationName,
    r.area ?? '',
    r.sourceType,
    r.isKeyItem ? 'yes' : '',
    r.originalItem ?? '',
    r.section,
  ].map((v) => `"${String(v).replace(/"/g, '""')}"`));
  return [header, ...rows].map((r) => r.join(',')).join('\n');
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

export function ExportButtons({ records, filename }: Props) {
  if (records.length === 0) return null;

  const base = baseName(filename);

  return (
    <div className="export-buttons">
      <span className="export-label">Export visible:</span>
      <button
        className="export-btn"
        onClick={() => download(toCSV(records), `${base}.csv`, 'text/csv')}
      >
        CSV
      </button>
      <button
        className="export-btn"
        onClick={() => download(JSON.stringify(records, null, 2), `${base}.json`, 'application/json')}
      >
        JSON
      </button>
    </div>
  );
}
