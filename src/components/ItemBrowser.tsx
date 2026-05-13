import { useMemo, useState } from 'react';
import type { ItemRecord, DataSourceKind } from '../types';
import type { BuildStat, BuildItemKind } from '../buildPlanner';
import { BUILD_STATS, getItemsForStats, getAreaRank } from '../buildPlanner';
import { makeRecordKey } from '../recordKey';
import { itemSourceDescription } from '../dataSources';

const KIND_LABELS: Record<string, string> = {
  weapon: 'Weapon', shield: 'Shield', seal: 'Seal', staff: 'Staff',
  armor: 'Armor', talisman: 'Talisman', spell: 'Spell', ash: 'Ash', optional: 'Other',
};

const KIND_ORDER: BuildItemKind[] = ['weapon', 'shield', 'seal', 'staff', 'armor', 'talisman', 'spell', 'ash', 'optional'];

interface Props {
  records: ItemRecord[];
  favoriteKeys: Set<string>;
  acquiredKeys: Set<string>;
  onToggleFavorite: (record: ItemRecord) => void;
  onToggleAcquired: (record: ItemRecord) => void;
  sourceKind?: DataSourceKind;
}

interface BrowserResult {
  record: ItemRecord;
  itemName: string;
  kind: BuildItemKind;
  usedByBuilds: number;
  areaRank: number;
}

export function ItemBrowser({
  records,
  favoriteKeys,
  acquiredKeys,
  onToggleFavorite,
  onToggleAcquired,
  sourceKind = 'vanilla',
}: Props) {
  const [selectedStats, setSelectedStats] = useState<BuildStat[]>([]);
  const [matchAll, setMatchAll] = useState(true);
  const [kindFilter, setKindFilter] = useState<BuildItemKind | 'all'>('all');
  const [sortField, setSortField] = useState<'area' | 'itemName' | 'locationName' | 'sourceType' | 'usedByBuilds'>('area');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [expanded, setExpanded] = useState<string | null>(null);

  const statItems = useMemo(() => {
    if (!selectedStats.length) return [];
    return getItemsForStats(selectedStats, matchAll);
  }, [selectedStats, matchAll]);

  const results = useMemo(() => {
    if (!statItems.length) return [];

    const itemSet = new Map<string, { name: string; kind: BuildItemKind; usedBy: number }>();
    for (const si of statItems) {
      itemSet.set(si.normalized, { name: si.name, kind: si.kind, usedBy: si.usedBy });
    }

    const matched: BrowserResult[] = [];
    for (const record of records) {
      const norm = record.itemName.toLowerCase().replace(/\s+/g, ' ').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
      const si = itemSet.get(norm);
      if (si) {
        matched.push({
          record,
          itemName: si.name,
          kind: si.kind,
          usedByBuilds: si.usedBy,
          areaRank: getAreaRank(record),
        });
      }
    }
    return matched;
  }, [statItems, records]);

  const filtered = useMemo(() => {
    let items = results;
    if (kindFilter !== 'all') {
      items = items.filter((r) => r.kind === kindFilter);
    }
    return [...items].sort((a, b) => {
      const av = sortField === 'area' ? a.areaRank : (a[sortField as keyof BrowserResult] ?? '') as string;
      const bv = sortField === 'area' ? b.areaRank : (b[sortField as keyof BrowserResult] ?? '') as string;
      const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [results, kindFilter, sortField, sortDir]);

  function toggleStat(stat: BuildStat) {
    setSelectedStats((c) => c.includes(stat) ? c.filter((s) => s !== stat) : [...c, stat]);
  }

  function handleSort(field: 'area' | 'itemName' | 'locationName' | 'sourceType' | 'usedByBuilds') {
    if (field === sortField) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  }

  const kindCounts: Record<string, number> = {};
  for (const r of results) {
    kindCounts[r.kind] = (kindCounts[r.kind] ?? 0) + 1;
  }

  return (
    <div className="item-browser">
      <div className="browser-controls">
        <fieldset className="stat-filter">
          <legend>Select stats to see matching items</legend>
          <div className="stat-chip-grid">
            {BUILD_STATS.map((stat) => (
              <button
                key={stat}
                type="button"
                className={`stat-chip${selectedStats.includes(stat) ? ' active' : ''}`}
                onClick={() => toggleStat(stat)}
              >
                {stat}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="browser-options">
          <label className="key-toggle">
            <input
              type="checkbox"
              checked={matchAll}
              onChange={(e) => setMatchAll(e.target.checked)}
            />
            Match all selected stats
          </label>
          <label>
            Type
            <select
              className="source-select"
              value={kindFilter}
              onChange={(e) => setKindFilter(e.target.value as BuildItemKind | 'all')}
            >
              <option value="all">All types ({results.length})</option>
              {KIND_ORDER.map((k) => (kindCounts[k] ?? 0) > 0 && (
                <option key={k} value={k}>{KIND_LABELS[k]} ({kindCounts[k]})</option>
              ))}
            </select>
          </label>
        </div>
          <div className="browser-counts">
          Matching items: <strong>{filtered.length}</strong>
          {selectedStats.length > 0 && (
            <span>across {statItems.length} unique requirements from the {itemSourceDescription(sourceKind)}</span>
          )}
        </div>
      </div>

      {!selectedStats.length ? (
        <p className="empty-state">
          Select one or more stats above to see items from the {itemSourceDescription(sourceKind)} that fit those build types, sorted by how early you can find them.
        </p>
      ) : filtered.length === 0 ? (
        <p className="empty-state">
          No items matching those stats found in the {itemSourceDescription(sourceKind)}. Try different stat combinations.
        </p>
      ) : (
        <div className="table-wrapper">
          <table className="records-table">
            <colgroup>
              <col style={{ width: '5%' }} />
              <col style={{ width: '28%' }} />
              <col style={{ width: '30%' }} />
              <col style={{ width: '14%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '6%' }} />
              <col style={{ width: '7%' }} />
            </colgroup>
            <thead>
              <tr>
                <th className="favorite-col">★</th>
                <th className="sortable" onClick={() => handleSort('itemName')}>
                  Item{sortField === 'itemName' ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                </th>
                <th>Location</th>
                <th className="sortable" onClick={() => handleSort('area')}>
                  Area{sortField === 'area' ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                </th>
                <th>Type</th>
                <th className="sortable" onClick={() => handleSort('usedByBuilds')}>
                  Builds{sortField === 'usedByBuilds' ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                </th>
                <th>Acquired</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((result) => {
                const rec = result.record;
                const recordKey = makeRecordKey(rec);
                const isFavorite = favoriteKeys.has(recordKey);
                const isAcquired = acquiredKeys.has(recordKey);
                return (
                  <tr
                    key={`${recordKey}-${result.kind}`}
                    className={`record-row${rec.isKeyItem ? ' key-item' : ''}${isAcquired ? ' acquired' : ''}${expanded === rec.id ? ' expanded' : ''}`}
                    onClick={() => setExpanded(expanded === rec.id ? null : rec.id)}
                  >
                    <td className="favorite-cell">
                      <button
                        className={`favorite-btn${isFavorite ? ' active' : ''}`}
                        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        onClick={(e) => { e.stopPropagation(); onToggleFavorite(rec); }}
                      >
                        ★
                      </button>
                    </td>
                    <td className="item-name">
                      {rec.itemName}
                      <a className="wiki-link" href={`https://eldenring.wiki.fextralife.com/${encodeURIComponent(rec.itemName.replace(/ /g, '+'))}`} target="_blank" rel="noreferrer" title="View on Elden Ring Wiki" onClick={(e) => e.stopPropagation()}>⧉</a>
                    </td>
                    <td>{rec.locationName}</td>
                    <td>{rec.area ?? '-'}</td>
                    <td><span className="badge badge-unknown">{KIND_LABELS[result.kind]}</span></td>
                    <td className="used-by-count">{result.usedByBuilds}</td>
                    <td className="acquired-cell">
                      <input
                        type="checkbox"
                        checked={isAcquired}
                        title={isAcquired ? 'Mark as not acquired' : 'Mark as acquired'}
                        aria-label={isAcquired ? 'Mark as not acquired' : 'Mark as acquired'}
                        onChange={(e) => { e.stopPropagation(); onToggleAcquired(rec); }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
