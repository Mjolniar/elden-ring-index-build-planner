import { useState } from 'react';
import type { ParseDiagnostics } from '../types';
import type { SpoilerLogCacheEntry } from '../electron';

interface Props {
  diagnostics: ParseDiagnostics;
  seed: string | null;
  filename: string;
  cacheEntry: SpoilerLogCacheEntry | null;
  cacheMessage: string;
  onOpenCacheFolder?: () => void;
}

export function DiagnosticsPanel({
  diagnostics: d,
  seed,
  filename,
  cacheEntry,
  cacheMessage,
  onOpenCacheFolder,
}: Props) {
  const [showUnmatched, setShowUnmatched] = useState(false);

  return (
    <details className="diagnostics-panel" open>
      <summary className="diagnostics-title">
        Parser diagnostics
        {d.warnings.length > 0 && <span className="badge badge-warn">{d.warnings.length} warning{d.warnings.length !== 1 ? 's' : ''}</span>}
      </summary>
      <div className="diagnostics-grid">
        <div className="diag-row"><span className="diag-label">File</span><span>{filename}</span></div>
        {seed && <div className="diag-row"><span className="diag-label">Seed</span><span className="seed-value">{seed}</span></div>}
        <div className="diag-row"><span className="diag-label">Total lines</span><span>{d.totalLines}</span></div>
        <div className="diag-row"><span className="diag-label">Parsed records</span><span>{d.parsedRecords}</span></div>
        <div className="diag-row"><span className="diag-label">Unmatched lines</span><span>{d.unmatchedLines.length}</span></div>
        {cacheEntry && (
          <div className="diag-row">
            <span className="diag-label">Cached copy</span>
            <span className="cache-path">{cacheEntry.latestPath}</span>
          </div>
        )}
        <div className="diag-row"><span className="diag-label">Sections found</span><span>{d.sections.join(', ') || '—'}</span></div>
      </div>

      {cacheMessage && (
        <div className="cache-status">
          <span>{cacheMessage}</span>
          {onOpenCacheFolder && (
            <button className="toggle-btn" onClick={onOpenCacheFolder}>
              Open cache folder
            </button>
          )}
        </div>
      )}

      {d.warnings.length > 0 && (
        <div className="diag-warnings">
          {d.warnings.map((w, i) => <div key={i} className="diag-warning">⚠ {w}</div>)}
        </div>
      )}

      {d.unmatchedLines.length > 0 && (
        <div className="diag-unmatched-block">
          <button className="toggle-btn" onClick={() => setShowUnmatched(!showUnmatched)}>
            {showUnmatched ? 'Hide' : 'Show'} unmatched lines ({d.unmatchedLines.length})
          </button>
          {showUnmatched && (
            <pre className="unmatched-pre">
              {d.unmatchedLines.slice(0, 200).join('\n')}
              {d.unmatchedLines.length > 200 && `\n… and ${d.unmatchedLines.length - 200} more`}
            </pre>
          )}
        </div>
      )}
    </details>
  );
}
