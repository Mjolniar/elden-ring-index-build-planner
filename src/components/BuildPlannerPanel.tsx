import { useMemo, useState } from 'react';
import type { ItemRecord } from '../types';
import type { BuildStat } from '../buildPlanner';
import {
  BUILD_PRESETS,
  BUILD_STATS,
  buildPlannerMatches,
  buildStatCategory,
  filterBuildPresets,
  normalizeBuildName,
} from '../buildPlanner';
import { makeRecordKey } from '../recordKey';

const KIND_LABELS: Record<string, string> = {
  weapon: 'Weapon',
  shield: 'Shield',
  seal: 'Seal',
  staff: 'Staff',
  armor: 'Armor',
  talisman: 'Talisman',
  spell: 'Spell',
  ash: 'Ash',
  optional: 'Optional',
};

function requirementKindLabel(kind: string, name: string): string {
  const normalized = name.toLowerCase();
  if (kind === 'spell' || kind === 'ash') return KIND_LABELS[kind];
  if (normalized.includes('shield') || normalized.includes('buckler')) return 'Shield';
  if (normalized.includes('seal')) return 'Seal';
  if (normalized.includes('staff') || normalized.includes('scepter')) return 'Staff';
  if (/talisman|charm|insignia|prosthesis|soreseal|scarseal|arsenal|icon|heirloom|cameo|exultation|medallion/.test(normalized)) {
    return 'Talisman';
  }
  if (/set|armor|helm|hood|mask|gauntlets|greaves|robe|trousers|blossom/.test(normalized)) {
    return 'Armor';
  }
  return KIND_LABELS[kind] ?? 'Item';
}

interface Props {
  records: ItemRecord[];
  selectedBuildId: string;
  onSelectedBuildIdChange: (buildId: string) => void;
  favoriteKeys: Set<string>;
  acquiredKeys: Set<string>;
  onToggleFavorite: (record: ItemRecord) => void;
  onToggleAcquired: (record: ItemRecord) => void;
}

export function BuildPlannerPanel({
  records,
  selectedBuildId,
  onSelectedBuildIdChange,
  favoriteKeys,
  acquiredKeys,
  onToggleFavorite,
  onToggleAcquired,
}: Props) {
  const [selectedStats, setSelectedStats] = useState<BuildStat[]>([]);
  const [matchAllStats, setMatchAllStats] = useState(true);
  const [buildSearch, setBuildSearch] = useState('');
  const searchKey = normalizeBuildName(buildSearch);

  const filteredBuilds = useMemo(() => {
    const statMatches = filterBuildPresets(selectedStats, matchAllStats);
    if (!searchKey) return statMatches;
    return statMatches.filter((preset) => {
      const haystack = normalizeBuildName([
        preset.name,
        preset.level,
        buildStatCategory(preset),
        preset.summary,
      ].join(' '));
      return haystack.includes(searchKey);
    });
  }, [selectedStats, matchAllStats, searchKey]);

  const selectedBuild = filteredBuilds.find((preset) => preset.id === selectedBuildId) ?? filteredBuilds[0] ?? BUILD_PRESETS[0];
  const matches = buildPlannerMatches(selectedBuild, records);
  const foundCount = matches.filter((match) => match.record).length;
  const requiredCount = matches.filter((match) => !match.requirement.optional).length;
  const foundRequiredCount = matches.filter((match) => match.record && !match.requirement.optional).length;
  const primaryStats = selectedBuild.primaryStats.join(' / ') || 'Flexible';
  const secondaryStats = selectedBuild.secondaryStats.join(' / ') || 'None listed';

  function toggleStat(stat: BuildStat) {
    setSelectedStats((current) =>
      current.includes(stat)
        ? current.filter((item) => item !== stat)
        : [...current, stat]
    );
  }

  return (
    <section className="build-planner">
      <div className="build-controls">
        <fieldset className="stat-filter">
          <legend>Target stats</legend>
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
        <label className="key-toggle build-match-toggle">
          <input
            type="checkbox"
            checked={matchAllStats}
            onChange={(event) => setMatchAllStats(event.target.checked)}
          />
          Match all selected stats
        </label>
        <label>
          Search builds
          <input
            className="search-input build-search"
            value={buildSearch}
            onChange={(event) => setBuildSearch(event.target.value)}
            placeholder="Name, level, or stat profile"
          />
        </label>
        <div className="build-counts">
          Builds shown: {filteredBuilds.length} / {BUILD_PRESETS.length}
          <span>Required found: {foundRequiredCount} / {requiredCount}</span>
        </div>
      </div>

      <div className="build-browser">
        <aside className="build-list-panel">
          <div className="build-list-title">Matching builds</div>
          <div className="build-list">
            {filteredBuilds.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={`build-list-item${selectedBuild.id === preset.id ? ' active' : ''}`}
                onClick={() => onSelectedBuildIdChange(preset.id)}
              >
                <span>{preset.name}</span>
                <small>{buildStatCategory(preset)} · {preset.level}</small>
              </button>
            ))}
            {!filteredBuilds.length && (
              <div className="empty-state">No builds match those stat filters.</div>
            )}
          </div>
        </aside>

        <div className="build-detail-panel">
          <div className="build-summary">
            <div>
              <h2>{selectedBuild.name}</h2>
              <p>{selectedBuild.summary}</p>
              <div className="build-meta">
                <span>{selectedBuild.level}</span>
                <span>Primary: {primaryStats}</span>
                <span>Secondary: {secondaryStats}</span>
                <span>All matched: {foundCount} / {matches.length}</span>
              </div>
            </div>
            <a href={selectedBuild.sourceUrl} target="_blank" rel="noreferrer">Source build notes</a>
          </div>

          <div className="planner-note">
            The catalog uses paraphrased build metadata from the saved reference page. Matched items are sorted by rough area progression, not by a solved route.
          </div>

          <div className="table-wrapper">
            <table className="records-table build-table">
              <thead>
                <tr>
                  <th>Need</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Randomized location</th>
                  <th>Area</th>
                  <th>Track</th>
                  <th>Acquired</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match) => {
                  const record = match.record;
                  const recordKey = record ? makeRecordKey(record) : '';
                  const isFavorite = record ? favoriteKeys.has(recordKey) : false;
                  const isAcquired = record ? acquiredKeys.has(recordKey) : false;
                  return (
                    <tr key={`${selectedBuild.id}-${match.requirement.kind}-${match.requirement.name}`} className={`record-row${record?.isKeyItem ? ' key-item' : ''}${isAcquired ? ' acquired' : ''}`}>
                      <td className="item-name">
                        {match.requirement.name}
                        {match.requirement.optional && <span className="optional-tag">Optional</span>}
                      </td>
                      <td><span className="badge badge-unknown">{requirementKindLabel(match.requirement.kind, match.requirement.name)}</span></td>
                      <td>
                        {record ? (
                          <span className="badge badge-ground_pickup">Found</span>
                        ) : (
                          <span className="badge badge-warn">Missing</span>
                        )}
                      </td>
                      <td>{record?.locationName ?? 'Not found in loaded spoiler log'}</td>
                      <td>{record?.area ?? '-'}</td>
                      <td className="favorite-cell">
                        {record ? (
                          <button
                            className={`favorite-btn${isFavorite ? ' active' : ''}`}
                            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                            onClick={() => onToggleFavorite(record)}
                          >
                            ★
                          </button>
                        ) : '-'}
                      </td>
                      <td className="acquired-cell">
                        {record ? (
                          <input
                            type="checkbox"
                            checked={isAcquired}
                            title={isAcquired ? 'Mark as not acquired' : 'Mark as acquired'}
                            aria-label={isAcquired ? 'Mark as not acquired' : 'Mark as acquired'}
                            onChange={() => onToggleAcquired(record)}
                          />
                        ) : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
