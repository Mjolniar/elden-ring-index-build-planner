import { useState } from 'react';
import type { ItemRecord, SortField, SortDir } from '../types';

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
}

interface ColDef {
  field: SortField;
  label: string;
  width: string;
}

const COLS: ColDef[] = [
  { field: 'itemName', label: 'Item', width: '25%' },
  { field: 'locationName', label: 'Location', width: '35%' },
  { field: 'area', label: 'Area', width: '18%' },
  { field: 'sourceType', label: 'Source', width: '12%' },
];

export function SearchTable({ records }: Props) {
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

  if (records.length === 0) {
    return <p className="empty-state">No records match the current filters.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="records-table">
        <colgroup>
          {COLS.map((c) => <col key={c.field} style={{ width: c.width }} />)}
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            {COLS.map((c) => (
              <th
                key={c.field}
                className={`sortable${sortField === c.field ? ' sorted' : ''}`}
                onClick={() => handleSort(c.field)}
              >
                {c.label}
                {sortField === c.field ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
              </th>
            ))}
            <th>Flags</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((rec) => (
            <>
              <tr
                key={rec.id}
                className={`record-row${rec.isKeyItem ? ' key-item' : ''}${expanded === rec.id ? ' expanded' : ''}`}
                onClick={() => setExpanded(expanded === rec.id ? null : rec.id)}
              >
                <td className="item-name">{rec.itemName}</td>
                <td>{rec.locationName}</td>
                <td>{rec.area ?? '—'}</td>
                <td><span className={`badge badge-${rec.sourceType}`}>{SOURCE_LABELS[rec.sourceType]}</span></td>
                <td>
                  {rec.isKeyItem && <span className="badge badge-key">KEY</span>}
                </td>
              </tr>
              {expanded === rec.id && (
                <tr key={`${rec.id}-detail`} className="detail-row">
                  <td colSpan={5}>
                    <div className="detail-content">
                      {rec.originalItem && <div><strong>Replaced:</strong> {rec.originalItem}</div>}
                      <div><strong>Section:</strong> {rec.section}</div>
                      <div><strong>Raw line:</strong> <code>{rec.rawLine}</code></div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
