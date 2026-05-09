import { useMemo, useState } from 'react';
import type { ItemRecord } from '../types';
import type { BuildItemKind, BuildStat } from '../buildPlanner';
import {
  BUILD_PRESETS,
  BUILD_STATS,
  type BuildPreset,
  buildPlannerMatches,
  buildLevelLabel,
  buildStatCategory,
  isFreeformRequirement,
  normalizeBuildName,
  sortBuildPresets,
  computeSoulCost,
  formatRunes,
} from '../buildPlanner';
import { makeRecordKey } from '../recordKey';
import { CustomBuildEditor } from './CustomBuildEditor';

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
  if (isFreeformRequirement({ kind: kind as BuildItemKind, name })) return 'Free-form';
  const normalized = name.toLowerCase();
  if (kind === 'spell' || kind === 'ash') return KIND_LABELS[kind];
  if (/talisman|charm|insignia|prosthesis|soreseal|scarseal|arsenal|icon|heirloom|cameo|exultation|medallion/.test(normalized)) {
    return 'Talisman';
  }
  if (/shield|buckler|greatshield/i.test(normalized) && !/talisman|charm/i.test(normalized)) return 'Shield';
  if (/\bseal\b/i.test(normalized) && !/talisman|greatshield/i.test(normalized)) return 'Seal';
  if (/\b(staff|scepter)\b/i.test(normalized)) return 'Staff';
  if (/set|armor|helm|hood|mask|gauntlets|greaves|robe|trousers|blossom/i.test(normalized)) {
    return 'Armor';
  }
  if (/sword|blade|bow|katana|spear|lance|hammer|axe|flail|claw|dagger|rapier|halberd|scythe|greatsword|twinblade|torch|mace|club/i.test(normalized)) {
    return 'Weapon';
  }
  return KIND_LABELS[kind] ?? 'Item';
}

function freeformLocationText(kind: string): string {
  if (kind === 'armor') return 'Choose armor that fits the note; this is not a specific randomized item.';
  if (kind === 'seal' || kind === 'staff') return 'Choose any suitable catalyst; this is not a specific randomized item.';
  if (kind === 'weapon' || kind === 'shield') return 'Choose any suitable equipment option; this is not a specific randomized item.';
  return 'Flexible build guidance; not expected to appear as an exact spoiler-log item.';
}

interface BuildLevelGroup {
  level: string;
  builds: BuildPreset[];
}

function groupBuildsByLevel(builds: BuildPreset[]): BuildLevelGroup[] {
  return builds.reduce<BuildLevelGroup[]>((groups, preset) => {
    const current = groups[groups.length - 1];
    if (current?.level === preset.level) {
      current.builds.push(preset);
    } else {
      groups.push({ level: preset.level, builds: [preset] });
    }
    return groups;
  }, []);
}

interface Props {
  records: ItemRecord[];
  selectedBuildId: string;
  onSelectedBuildIdChange: (buildId: string) => void;
  favoriteKeys: Set<string>;
  acquiredKeys: Set<string>;
  onToggleFavorite: (record: ItemRecord) => void;
  onToggleAcquired: (record: ItemRecord) => void;
  userBuilds: BuildPreset[];
  onSaveBuild: (build: BuildPreset) => void;
  onDeleteBuild: (id: string) => void;
}

export function BuildPlannerPanel({
  records,
  selectedBuildId,
  onSelectedBuildIdChange,
  favoriteKeys,
  acquiredKeys,
  onToggleFavorite,
  onToggleAcquired,
  userBuilds,
  onSaveBuild,
  onDeleteBuild,
}: Props) {
  const [selectedStats, setSelectedStats] = useState<BuildStat[]>([]);
  const [matchAllStats, setMatchAllStats] = useState(true);
  const [buildSearch, setBuildSearch] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingBuildId, setEditingBuildId] = useState<string | null>(null);
  const searchKey = normalizeBuildName(buildSearch);

  const allBuilds = useMemo(() => [...BUILD_PRESETS, ...userBuilds], [userBuilds]);

  const filteredBuilds = useMemo(() => {
    const statMatches = selectedStats.length
      ? allBuilds.filter((preset) => {
          const tags = new Set(preset.statTags);
          return matchAllStats
            ? selectedStats.every((stat) => tags.has(stat))
            : selectedStats.some((stat) => tags.has(stat));
        })
      : allBuilds;
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
  }, [allBuilds, selectedStats, matchAllStats, searchKey]);

  const presetBuilds = useMemo(
    () => sortBuildPresets(filteredBuilds.filter((b) => !b.id.startsWith('user-'))),
    [filteredBuilds]
  );
  const customBuilds = useMemo(
    () => sortBuildPresets(filteredBuilds.filter((b) => b.id.startsWith('user-'))),
    [filteredBuilds]
  );
  const presetGroups = useMemo(() => groupBuildsByLevel(presetBuilds), [presetBuilds]);

  const selectedBuild = filteredBuilds.find((b) => b.id === selectedBuildId) ?? filteredBuilds[0] ?? allBuilds[0];
  const matches = buildPlannerMatches(selectedBuild, records);
  const foundCount = matches.filter((m) => m.record).length;
  const requiredCount = matches.filter((m) => !m.requirement.optional && !m.isFreeform).length;
  const foundRequiredCount = matches.filter((m) => m.record && !m.requirement.optional && !m.isFreeform).length;
  const freeformCount = matches.filter((m) => m.isFreeform).length;
  const primaryStats = selectedBuild.primaryStats.join(' / ') || 'Flexible';
  const secondaryStats = selectedBuild.secondaryStats.join(' / ') || 'None listed';
  const isUserBuild = selectedBuild.id.startsWith('user-');
  const soulCost = (selectedBuild.statRecommended || selectedBuild.statRequired) ? computeSoulCost(selectedBuild) : null;

  const makeBars = (stats: Partial<Record<BuildStat, number>> | undefined) =>
    stats
      ? BUILD_STATS.filter((s) => (stats[s] ?? 0) > 0).map((s) => ({
          stat: s,
          value: stats[s] ?? 0,
          pct: Math.min(100, ((stats[s] ?? 0) / 80) * 100),
        }))
      : null;

  const requiredBars = makeBars(selectedBuild.statRequired);
  const recommendedBars = makeBars(selectedBuild.statRecommended);

  function toggleStat(stat: BuildStat) {
    setSelectedStats((c) => c.includes(stat) ? c.filter((s) => s !== stat) : [...c, stat]);
  }

  function handleEditBuild(id: string) {
    setEditingBuildId(id);
    setShowEditor(true);
  }

  function handleSaveBuild(build: BuildPreset) {
    onSaveBuild(build);
    setShowEditor(false);
    setEditingBuildId(null);
    onSelectedBuildIdChange(build.id);
  }

  function handleCancelEditor() {
    setShowEditor(false);
    setEditingBuildId(null);
  }

  const editingBuild = editingBuildId ? userBuilds.find((b) => b.id === editingBuildId) : undefined;

  if (showEditor) {
    return (
      <section className="build-planner">
        <CustomBuildEditor
          onSave={handleSaveBuild}
          onCancel={handleCancelEditor}
          editingBuild={editingBuild}
        />
      </section>
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
            onChange={(e) => setMatchAllStats(e.target.checked)}
          />
          Match all selected stats
        </label>
        <label>
          Search builds
          <input
            className="search-input build-search"
            value={buildSearch}
            onChange={(e) => setBuildSearch(e.target.value)}
            placeholder="Name, level, or stat profile"
          />
        </label>
        <div className="build-counts">
          Builds shown: {filteredBuilds.length} / {allBuilds.length}
          <span>Required found: {foundRequiredCount} / {requiredCount}</span>
          {freeformCount > 0 && <span>Flexible notes: {freeformCount}</span>}
        </div>
      </div>

      <div className="build-browser">
        <aside className="build-list-panel">
          <div className="build-list-title">Matching builds</div>
          <div className="build-list">
            {customBuilds.length > 0 && (
              <div className="build-level-group">
                <div className="build-level-heading">Your Builds</div>
                {customBuilds.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`build-list-item${selectedBuild.id === preset.id ? ' active' : ''}`}
                    onClick={() => onSelectedBuildIdChange(preset.id)}
                  >
                    <span>{preset.name}</span>
                    <small>{buildStatCategory(preset)}</small>
                  </button>
                ))}
              </div>
            )}
            {presetGroups.map((group) => (
              <div key={group.level} className="build-level-group">
                <div className="build-level-heading">{buildLevelLabel(group.level)}</div>
                {group.builds.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`build-list-item${selectedBuild.id === preset.id ? ' active' : ''}`}
                    onClick={() => onSelectedBuildIdChange(preset.id)}
                  >
                    <span>{preset.name}</span>
                    <small>{buildStatCategory(preset)}</small>
                  </button>
                ))}
              </div>
            ))}
            {!filteredBuilds.length && (
              <div className="empty-state">No builds match those stat filters.</div>
            )}
          </div>
          <div className="build-list-actions">
            <button
              className="export-btn"
              onClick={() => setShowEditor(true)}
            >
              + New build
            </button>
          </div>
        </aside>

        <div className="build-detail-panel">
          <div className="build-summary">
            <div>
              <h2>
                {selectedBuild.name}
                {isUserBuild && <span className="optional-tag">Custom</span>}
              </h2>
              <p>{selectedBuild.summary}</p>
              <div className="build-meta">
                <span>{selectedBuild.level}</span>
                <span>Primary: {primaryStats}</span>
                <span>Secondary: {secondaryStats}</span>
                <span>All matched: {foundCount} / {matches.length}</span>
              </div>
              {(requiredBars || recommendedBars) && (
                <div className="build-stat-bars">
                  {requiredBars && (
                    <div className="stat-bars-section">
                      <div className="stat-bars-title">Item requirements</div>
                      <div className="stat-bars-grid">
                        {requiredBars.map(({ stat, value, pct }) => (
                          <div key={stat} className="stat-bar-item">
                            <div className="stat-bar-header">
                              <span className="stat-bar-name">{stat}</span>
                              <span className="stat-bar-value">{value}</span>
                            </div>
                            <div className="stat-bar-track">
                              <div className="stat-bar-fill stat-bar-fill--required" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {recommendedBars && (
                    <div className="stat-bars-section">
                      <div className="stat-bars-title">
                        Recommended allocation
                        {soulCost && (
                          <span className="stat-soul-cost">
                            RL {soulCost.targetLevel} · ~{formatRunes(soulCost.cost)} runes · best: {soulCost.bestClass}
                          </span>
                        )}
                      </div>
                      <div className="stat-bars-grid">
                        {recommendedBars.map(({ stat, value, pct }) => (
                          <div key={stat} className="stat-bar-item">
                            <div className="stat-bar-header">
                              <span className="stat-bar-name">{stat}</span>
                              <span className="stat-bar-value">{value}</span>
                            </div>
                            <div className="stat-bar-track">
                              <div className="stat-bar-fill" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="build-summary-links">
              {isUserBuild ? (
                <div className="user-build-actions">
                  <button className="toggle-btn" onClick={() => handleEditBuild(selectedBuild.id)}>Edit</button>
                  <button className="toggle-btn" onClick={() => {
                    onDeleteBuild(selectedBuild.id);
                    const next = filteredBuilds.find((b) => b.id !== selectedBuild.id);
                    if (next) onSelectedBuildIdChange(next.id);
                  }}>Delete</button>
                </div>
              ) : (
                selectedBuild.sourceUrl && (
                  <a href={selectedBuild.sourceUrl} target="_blank" rel="noreferrer">Source build notes</a>
                )
              )}
            </div>
          </div>

          <div className="planner-note">
            {isUserBuild
              ? 'Your custom build. Edit it anytime using the Edit button above.'
              : 'The catalog uses paraphrased build metadata from the saved reference page. Matched items are sorted by rough area progression, not by a solved route.'}
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
                        {!match.isFreeform && (
                          <a className="wiki-link" href={`https://eldenring.wiki.fextralife.com/${encodeURIComponent(match.requirement.name.replace(/ /g, '+'))}`} target="_blank" rel="noreferrer" title="View on Elden Ring Wiki" onClick={(e) => e.stopPropagation()}>⧉</a>
                        )}
                      </td>
                      <td><span className="badge badge-unknown">{requirementKindLabel(match.requirement.kind, match.requirement.name)}</span></td>
                      <td>
                        {match.isFreeform ? (
                          <span className="badge badge-flex">Flexible</span>
                        ) : record ? (
                          <span className="badge badge-ground_pickup">Found</span>
                        ) : (
                          <span className="badge badge-warn">Missing</span>
                        )}
                      </td>
                      <td>{record?.locationName ?? (match.isFreeform ? freeformLocationText(match.requirement.kind) : 'Not found in loaded spoiler log')}</td>
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
