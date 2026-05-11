import type { SpoilerSettings } from '../types';

interface Props {
  settings: SpoilerSettings;
  onChange: (s: SpoilerSettings) => void;
}

export function SettingsPanel({ settings, onChange }: Props) {
  return (
    <div className="settings-panel">
      <h2>Settings</h2>

      <section className="guide-section">
        <h3>Spoiler Mode</h3>
        <p>
          When spoiler mode is on, exact item locations are hidden in results. Choose
          what partial information to show instead so you can still browse your seed
          without seeing precise location names.
        </p>

        <label className="settings-master-toggle">
          <input
            type="checkbox"
            checked={settings.spoilerMode}
            onChange={(e) => onChange({ ...settings, spoilerMode: e.target.checked })}
          />
          <strong>Enable spoiler mode</strong>
        </label>

        <div className={`settings-sub-options${settings.spoilerMode ? '' : ' disabled'}`}>
          <label>
            <input
              type="checkbox"
              checked={settings.showArea}
              onChange={(e) => onChange({ ...settings, showArea: e.target.checked })}
              disabled={!settings.spoilerMode}
            />
            <strong>Show area</strong>
            <span className="settings-option-desc">
              The broad region the item is in, e.g. Limgrave or Leyndell.
            </span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={settings.showSource}
              onChange={(e) => onChange({ ...settings, showSource: e.target.checked })}
              disabled={!settings.spoilerMode}
            />
            <strong>Show source type</strong>
            <span className="settings-option-desc">
              How the item is obtained: boss drop, shop, enemy drop, etc.
            </span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={settings.showHint}
              onChange={(e) => onChange({ ...settings, showHint: e.target.checked })}
              disabled={!settings.spoilerMode}
            />
            <strong>Show hint</strong>
            <span className="settings-option-desc">
              A short generated clue combining the source and area without the exact location.
            </span>
          </label>
        </div>
      </section>
    </div>
  );
}
