import type { ContentProfile, SpoilerSettings } from '../types';
import { UploadPanel } from './UploadPanel';

interface Props {
  contentProfile: ContentProfile;
  onProfileChange: (profile: ContentProfile) => void;
  spoilerSettings: SpoilerSettings;
  onSpoilerSettingsChange: (s: SpoilerSettings) => void;
  randomizerLoaded: boolean;
  randomizerFilename: string;
  randomizerCacheMessage: string;
  onLoadFile: (text: string, filename: string) => void;
  onResetRandomizer: () => void;
  onOpenCacheFolder?: () => void;
  onResetSetup?: () => void;
}

export function SettingsPanel({
  contentProfile,
  onProfileChange,
  spoilerSettings,
  onSpoilerSettingsChange,
  randomizerLoaded,
  randomizerFilename,
  randomizerCacheMessage,
  onLoadFile,
  onResetRandomizer,
  onOpenCacheFolder,
  onResetSetup,
}: Props) {
  return (
    <div className="settings-panel">
      <h2>Settings</h2>

      <section className="guide-section">
        <h3>Content Mode</h3>
        <p>Choose the item source for browsing, searching, and build planning.</p>

        <div className="content-mode-toggle">
          <button
            type="button"
            className={`source-option${contentProfile.baseMode === 'vanilla' ? ' active' : ''}`}
            onClick={() => onProfileChange({ ...contentProfile, baseMode: 'vanilla' })}
          >
            Vanilla
          </button>
          <button
            type="button"
            className={`source-option${contentProfile.baseMode === 'randomizer-log' ? ' active' : ''}`}
            onClick={() => onProfileChange({ ...contentProfile, baseMode: 'randomizer-log' })}
          >
            Randomizer
          </button>
        </div>

        {contentProfile.baseMode === 'randomizer-log' && (
          <div className="randomizer-log-section">
            {randomizerLoaded ? (
              <div className="log-status">
                <span className="log-loaded-name">Loaded: {randomizerFilename}</span>
                <div className="log-status-actions">
                  <button className="toggle-btn" onClick={onResetRandomizer}>Load new log</button>
                  {onOpenCacheFolder && (
                    <button className="toggle-btn" onClick={onOpenCacheFolder}>Open cache folder</button>
                  )}
                </div>
                {randomizerCacheMessage && <p className="cache-message">{randomizerCacheMessage}</p>}
              </div>
            ) : (
              <div className="log-upload-section">
                <UploadPanel onFile={onLoadFile} />
                <p className="upload-hint-text">
                  Generate a spoiler log in the Elden Ring Randomizer, then load it here to search
                  item placements and plan build pickups. All processing happens locally.
                </p>
                {randomizerCacheMessage && <p className="cache-message">{randomizerCacheMessage}</p>}
              </div>
            )}
          </div>
        )}
      </section>

      <section className="guide-section">
        <h3>Spoiler Mode</h3>
        <p>
          When spoiler mode is on, exact item locations are hidden in results. Choose
          what partial information to show instead so you can still browse without
          seeing precise location names.
        </p>

        <label className="settings-master-toggle">
          <input
            type="checkbox"
            checked={spoilerSettings.spoilerMode}
            onChange={(e) => onSpoilerSettingsChange({ ...spoilerSettings, spoilerMode: e.target.checked })}
          />
          <strong>Enable spoiler mode</strong>
        </label>

        <div className={`settings-sub-options${spoilerSettings.spoilerMode ? '' : ' disabled'}`}>
          <label>
            <input
              type="checkbox"
              checked={spoilerSettings.showArea}
              onChange={(e) => onSpoilerSettingsChange({ ...spoilerSettings, showArea: e.target.checked })}
              disabled={!spoilerSettings.spoilerMode}
            />
            <strong>Show area</strong>
            <span className="settings-option-desc">
              The broad region the item is in, e.g. Limgrave or Leyndell.
            </span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={spoilerSettings.showSource}
              onChange={(e) => onSpoilerSettingsChange({ ...spoilerSettings, showSource: e.target.checked })}
              disabled={!spoilerSettings.spoilerMode}
            />
            <strong>Show source type</strong>
            <span className="settings-option-desc">
              How the item is obtained: boss drop, shop, enemy drop, etc.
            </span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={spoilerSettings.showHint}
              onChange={(e) => onSpoilerSettingsChange({ ...spoilerSettings, showHint: e.target.checked })}
              disabled={!spoilerSettings.spoilerMode}
            />
            <strong>Show hint</strong>
            <span className="settings-option-desc">
              A short generated clue combining the source and area without the exact location.
            </span>
          </label>
          {spoilerSettings.showHint && (
            <div className={`hint-difficulty${spoilerSettings.spoilerMode ? '' : ' disabled'}`}>
              <span>Hint difficulty:</span>
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <label key={level}>
                  <input
                    type="radio"
                    name="hintDifficulty"
                    value={level}
                    checked={spoilerSettings.hintDifficulty === level}
                    disabled={!spoilerSettings.spoilerMode || !spoilerSettings.showHint}
                    onChange={() => onSpoilerSettingsChange({ ...spoilerSettings, hintDifficulty: level })}
                  />
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </label>
              ))}
            </div>
          )}
        </div>
      </section>

      {onResetSetup && (
        <section className="guide-section">
          <h3>First-Run Setup</h3>
          <p>Return to the startup setup screen to change your item source.</p>
          <button type="button" className="toggle-btn" onClick={onResetSetup}>
            Return to startup setup
          </button>
        </section>
      )}

      <section className="guide-section mod-content-section">
        <h3>Mod Content</h3>
        <p>
          Support for additional item databases from popular Elden Ring mods. Select a mod to
          overlay its item placements on top of vanilla data.
        </p>
        <div className="mod-content-list">
          <label className="mod-option disabled">
            <input type="checkbox" disabled />
            <span className="mod-name">Elden Ring Reforged</span>
            <span className="badge-planned">Planned</span>
          </label>
          <label className="mod-option disabled">
            <input type="checkbox" disabled />
            <span className="mod-name">The Convergence</span>
            <span className="badge-planned">Planned</span>
          </label>
        </div>
      </section>
    </div>
  );
}
