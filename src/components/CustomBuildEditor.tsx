import { useState } from 'react';
import type { BuildPreset, BuildStat, BuildItemKind, BuildRequirement } from '../buildPlanner';
import { BUILD_STATS } from '../buildPlanner';

const KIND_OPTIONS: { value: BuildItemKind; label: string }[] = [
  { value: 'weapon', label: 'Weapon' },
  { value: 'shield', label: 'Shield' },
  { value: 'seal', label: 'Seal' },
  { value: 'staff', label: 'Staff' },
  { value: 'armor', label: 'Armor' },
  { value: 'talisman', label: 'Talisman' },
  { value: 'spell', label: 'Spell' },
  { value: 'ash', label: 'Ash' },
  { value: 'optional', label: 'Other' },
];

const LEVEL_OPTIONS = ['Beginner', 'All Game', 'Level 50', 'Level 100', 'Level 150', 'Level 150-200', 'SOTE', 'General'];

interface Props {
  onSave: (build: BuildPreset) => void;
  onCancel: () => void;
  editingBuild?: BuildPreset;
}

function emptyBuild(): BuildPreset {
  return {
    id: `user-${Date.now()}`,
    name: '',
    level: 'General',
    primaryStats: [],
    secondaryStats: [],
    statTags: [],
    summary: '',
    sourceUrl: '',
    requirements: [{ name: '', kind: 'weapon' }],
  };
}

export function CustomBuildEditor({ onSave, onCancel, editingBuild }: Props) {
  const [build, setBuild] = useState<BuildPreset>(editingBuild ?? emptyBuild);
  const [reqNameCache, setReqNameCache] = useState<Record<number, string>>({});

  function update<K extends keyof BuildPreset>(key: K, value: BuildPreset[K]) {
    setBuild((prev) => ({ ...prev, [key]: value }));
  }

  function toggleStat(list: BuildStat[], stat: BuildStat, updateKey: 'primaryStats' | 'secondaryStats') {
    const next = list.includes(stat) ? list.filter((s) => s !== stat) : [...list, stat];
    const allTags = updateKey === 'primaryStats'
      ? [...next, ...build.secondaryStats]
      : [...build.primaryStats, ...next];
    setBuild((prev) => ({
      ...prev,
      [updateKey]: next,
      statTags: [...new Set(allTags)],
    }));
  }

  function updateReq(idx: number, field: keyof BuildRequirement, value: string | boolean) {
    const reqs = [...build.requirements];
    if (field === 'optional') {
      reqs[idx] = { ...reqs[idx], optional: value as boolean };
    } else {
      reqs[idx] = { ...reqs[idx], [field]: value };
    }
    setBuild((prev) => ({ ...prev, requirements: reqs }));
  }

  function addReq() {
    const name = reqNameCache[build.requirements.length] ?? '';
    setReqNameCache((prev) => ({ ...prev, [build.requirements.length]: '' }));
    setBuild((prev) => ({
      ...prev,
      requirements: [...prev.requirements, { name, kind: 'weapon' }],
    }));
  }

  function removeReq(idx: number) {
    const reqs = build.requirements.filter((_, i) => i !== idx);
    setBuild((prev) => ({ ...prev, requirements: reqs.length ? reqs : [{ name: '', kind: 'weapon' }] }));
  }

  function handleNameChange(idx: number, value: string) {
    setReqNameCache((prev) => ({ ...prev, [idx]: value }));
    updateReq(idx, 'name', value);
  }

  function handleSave() {
    const trimmed = {
      ...build,
      name: build.name.trim(),
      summary: build.summary.trim(),
      requirements: build.requirements.filter((r) => r.name.trim()),
      primaryStats: build.primaryStats,
      secondaryStats: build.secondaryStats,
    };
    if (!trimmed.name) return;
    onSave(trimmed as BuildPreset);
  }

  return (
    <div className="custom-build-editor">
      <div className="editor-header">
        <h2>{editingBuild ? 'Edit Build' : 'New Custom Build'}</h2>
      </div>

      <div className="editor-body">
        <label className="editor-field">
          Build name
          <input
            className="search-input"
            value={build.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="e.g. My Strength Build"
          />
        </label>

        <div className="editor-row">
          <label className="editor-field">
            Level
            <select
              className="source-select"
              value={build.level}
              onChange={(e) => update('level', e.target.value)}
            >
              {LEVEL_OPTIONS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </label>
          <label className="editor-field">
            Summary
            <input
              className="search-input"
              value={build.summary}
              onChange={(e) => update('summary', e.target.value)}
              placeholder="Brief description (optional)"
            />
          </label>
        </div>

        <fieldset className="editor-stats">
          <legend>Primary stats</legend>
          <div className="stat-chip-grid">
            {BUILD_STATS.map((stat) => (
              <button
                key={stat}
                type="button"
                className={`stat-chip${build.primaryStats.includes(stat) ? ' active' : ''}`}
                onClick={() => toggleStat(build.primaryStats, stat, 'primaryStats')}
              >
                {stat}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="editor-stats">
          <legend>Secondary stats</legend>
          <div className="stat-chip-grid">
            {BUILD_STATS.map((stat) => (
              <button
                key={stat}
                type="button"
                className={`stat-chip secondary${build.secondaryStats.includes(stat) ? ' active' : ''}`}
                disabled={build.primaryStats.includes(stat)}
                onClick={() => toggleStat(build.secondaryStats, stat, 'secondaryStats')}
              >
                {stat}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="editor-stats">
          <legend>Stat values (optional — shows rune cost estimate)</legend>
          <div className="editor-stat-values">
            {BUILD_STATS.filter((s) => build.statTags.includes(s)).map((stat) => (
              <label key={stat} className="editor-stat-input">
                <span>{stat}</span>
                <input
                  type="number"
                  className="search-input"
                  min="1"
                  max="99"
                  value={build.statRequired?.[stat] ?? ''}
                  onChange={(e) => {
                    const val = e.target.value ? parseInt(e.target.value) : 0;
                    setBuild((prev) => ({
                      ...prev,
                      statRequired: { ...prev.statRequired, [stat]: val || undefined },
                    }));
                  }}
                  placeholder="—"
                />
              </label>
            ))}
            {build.statTags.length === 0 && (
              <span className="editor-hint">Select primary or secondary stats above to enter values here.</span>
            )}
          </div>
        </fieldset>

        <div className="editor-reqs">
          <h3>Required items</h3>
          {build.requirements.map((req, idx) => (
            <div key={idx} className="editor-req-row">
              <input
                className="search-input"
                value={build.requirements[idx].name}
                onChange={(e) => handleNameChange(idx, e.target.value)}
                placeholder="Item name"
              />
              <select
                className="source-select"
                value={req.kind}
                onChange={(e) => updateReq(idx, 'kind', e.target.value)}
              >
                {KIND_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <label className="key-toggle">
                <input
                  type="checkbox"
                  checked={!!req.optional}
                  onChange={(e) => updateReq(idx, 'optional', e.target.checked)}
                />
                Optional
              </label>
              {build.requirements.length > 1 && (
                <button className="toggle-btn" onClick={() => removeReq(idx)} title="Remove">X</button>
              )}
            </div>
          ))}
          <button className="toggle-btn" onClick={addReq}>+ Add item</button>
        </div>
      </div>

      <div className="editor-actions">
        <button className="export-btn" onClick={handleSave} disabled={!build.name.trim()}>
          Save build
        </button>
        <button className="toggle-btn" onClick={onCancel}>Cancel</button>
        <span className="editor-hint">
          Saved builds appear in the build list and are matched against the active item source.
        </span>
      </div>
    </div>
  );
}
