import { Fragment, useState } from 'react';
import type { ItemRecord, SortField, SortDir, SpoilerSettings } from '../types';
import { generateHint } from '../locationHints';
import { makeRecordKey } from '../recordKey';

const SOURCE_LABELS: Record<string, string> = {
  boss_drop: 'Boss drop',
  ground_pickup: 'Ground',
  shop: 'Shop',
  enemy_drop: 'Enemy drop',
  starting_loadout: 'Starting',
  event: 'Event',
  unknown: '—',
};

interface Props {
  records: ItemRecord[];
  favoriteKeys: Set<string>;
  acquiredKeys: Set<string>;
  onToggleFavorite: (record: ItemRecord) => void;
  onToggleAcquired: (record: ItemRecord) => void;
  showAcquiredColumn: boolean;
  spoilerSettings: SpoilerSettings;
  emptyMessage?: string;
}

interface ColDef {
  field: SortField;
  label: string;
  width: string;
}

function wikiUrl(itemName: string): string {
  return `https://eldenring.wiki.fextralife.com/${encodeURIComponent(itemName.replace(/ /g, '+'))}`;
}

const COLS: ColDef[] = [
  { field: 'itemName', label: 'Item', width: '25%' },
  { field: 'locationName', label: 'Location', width: '35%' },
  { field: 'area', label: 'Area', width: '18%' },
  { field: 'sourceType', label: 'Source', width: '12%' },
];

export function SearchTable({
  records,
  favoriteKeys,
  acquiredKeys,
  onToggleFavorite,
  onToggleAcquired,
  showAcquiredColumn,
  spoilerSettings,
  emptyMessage = 'No records match the current filters.',
}: Props) {
  const [sortField, setSortField] = useState<SortField>('itemName');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [expanded, setExpanded] = useState<string | null>(null);

  function handleSort(field: SortField) {
    if (field === sortField) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  }

  const sorted = [...records].sort((a, b) => {
    const av = (a[sortField] ?? '') as string;
    const bv = (b[sortField] ?? '') as string;
    const cmp = av.localeCompare(bv);
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const visibleDataColCount = spoilerSettings.spoilerMode
    ? 1
      + (spoilerSettings.showArea ? 1 : 0)
      + (spoilerSettings.showSource ? 1 : 0)
      + (spoilerSettings.showHint ? 1 : 0)
    : 4;
  const detailColSpan = 1 + visibleDataColCount + (showAcquiredColumn ? 1 : 0);

  if (records.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="records-table">
        <colgroup>
          <col style={{ width: '4%' }} />
          <col style={{ width: spoilerSettings.spoilerMode ? '28%' : '25%' }} />
          {!spoilerSettings.spoilerMode ? (
            <>
              <col style={{ width: '34%' }} />
              <col style={{ width: '18%' }} />
              <col style={{ width: '12%' }} />
            </>
          ) : (
            <>
              {spoilerSettings.showArea && <col style={{ width: '18%' }} />}
              {spoilerSettings.showSource && <col style={{ width: '12%' }} />}
              {spoilerSettings.showHint && <col style={{ width: '22%' }} />}
            </>
          )}
          {showAcquiredColumn && <col style={{ width: '8%' }} />}
        </colgroup>
        <thead>
          <tr>
            <th className="favorite-col">★</th>
            {!spoilerSettings.spoilerMode ? (
              COLS.map((c) => (
                <th
                  key={c.field}
                  className={`sortable${sortField === c.field ? ' sorted' : ''}`}
                  onClick={() => handleSort(c.field)}
                >
                  {c.label}
                  {sortField === c.field ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                </th>
              ))
            ) : (
              <>
                <th
                  className={`sortable${sortField === 'itemName' ? ' sorted' : ''}`}
                  onClick={() => handleSort('itemName')}
                >
                  Item{sortField === 'itemName' ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                </th>
                {spoilerSettings.showArea && (
                  <th
                    className={`sortable${sortField === 'area' ? ' sorted' : ''}`}
                    onClick={() => handleSort('area')}
                  >
                    Area{sortField === 'area' ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                  </th>
                )}
                {spoilerSettings.showSource && (
                  <th
                    className={`sortable${sortField === 'sourceType' ? ' sorted' : ''}`}
                    onClick={() => handleSort('sourceType')}
                  >
                    Source{sortField === 'sourceType' ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                  </th>
                )}
                {spoilerSettings.showHint && <th>Hint</th>}
              </>
            )}
            {showAcquiredColumn && <th>Acquired</th>}
          </tr>
        </thead>
        <tbody>
          {sorted.map((rec) => {
            const recordKey = makeRecordKey(rec);
            const isFavorite = favoriteKeys.has(recordKey);
            const isAcquired = acquiredKeys.has(recordKey);
            return (
            <Fragment key={rec.id}>
              <tr
                className={`record-row${rec.isKeyItem ? ' key-item' : ''}${isAcquired ? ' acquired' : ''}${expanded === rec.id ? ' expanded' : ''}`}
                onClick={() => setExpanded(expanded === rec.id ? null : rec.id)}
              >
                <td className="favorite-cell">
                  <button
                    className={`favorite-btn${isFavorite ? ' active' : ''}`}
                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(rec);
                    }}
                  >
                    ★
                  </button>
                </td>
                <td className="item-name">
                  {rec.itemName}
                  <a className="wiki-link" href={wikiUrl(rec.itemName)} target="_blank" rel="noreferrer" title="View on Elden Ring Wiki" onClick={(e) => e.stopPropagation()}>⧉</a>
                </td>
                {!spoilerSettings.spoilerMode ? (
                  <>
                    <td>{rec.locationName}</td>
                    <td>{rec.area ?? '—'}</td>
                    <td><span className={`badge badge-${rec.sourceType}`}>{SOURCE_LABELS[rec.sourceType]}</span></td>
                  </>
                ) : (
                  <>
                    {spoilerSettings.showArea && <td>{rec.area ?? '—'}</td>}
                    {spoilerSettings.showSource && <td><span className={`badge badge-${rec.sourceType}`}>{SOURCE_LABELS[rec.sourceType]}</span></td>}
                    {spoilerSettings.showHint && <td>{generateHint(rec, spoilerSettings.hintDifficulty)}</td>}
                  </>
                )}
                {showAcquiredColumn && (
                  <td className="acquired-cell">
                    <input
                      type="checkbox"
                      checked={isAcquired}
                      title={isAcquired ? 'Mark as not acquired' : 'Mark as acquired'}
                      aria-label={isAcquired ? 'Mark as not acquired' : 'Mark as acquired'}
                      onChange={(e) => {
                        e.stopPropagation();
                        onToggleAcquired(rec);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                )}
              </tr>
              {expanded === rec.id && (
                <tr key={`${rec.id}-detail`} className="detail-row">
                  <td colSpan={detailColSpan}>
                    <div className="detail-content">
                      {spoilerSettings.spoilerMode ? (
                        <div><em>Turn off spoiler mode in Settings to see full location details.</em></div>
                      ) : (
                        <>
                          <div><strong>Section:</strong> {rec.section}</div>
                          <div><strong>Raw line:</strong> <code>{rec.rawLine}</code></div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
