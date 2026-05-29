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
  onOpenSettings?: () => void;
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
  const isRandomizer = contentProfile.baseMode === 'randomizer-log';

  function switchToRandomizer() {
    onProfileChange({ ...contentProfile, baseMode: 'randomizer-log' });
  }

  function switchToVanilla() {
    onProfileChange({ ...contentProfile, baseMode: 'vanilla' });
  }

  return (
    <div className="settings-panel">
      <h2>Settings</h2>

      {/* ── Content Mode ── */}
      <section className="settings-section">
        <h3 className="settings-section-title">Content Mode</h3>
        <p className="settings-section-desc">Choose the item source for browsing, searching, and build planning.</p>

        <div className="content-mode-toggle">
          <button
            type="button"
            className={`source-option${!isRandomizer ? ' active' : ''}`}
            onClick={switchToVanilla}
          >
            Vanilla
          </button>
          <button
            type="button"
            className={`source-option${isRandomizer ? ' active' : ''}`}
            onClick={switchToRandomizer}
          >
            Randomizer
          </button>
        </div>

        {isRandomizer && !randomizerLoaded && (
          <p className="settings-mode-hint">
            Load a spoiler log below to activate Randomizer mode.
          </p>
        )}
      </section>

      {/* ── Randomizer Spoiler Log ── */}
      {isRandomizer && (
        <section className="settings-section">
          <h3 className="settings-section-title">Randomizer Spoiler Log</h3>
          <p className="settings-section-desc">
            Load a <code>.txt</code> spoiler log exported from the Elden Ring Randomizer.
            This is not the seed file — only the spoiler log contains item placement data.
          </p>

          {randomizerLoaded ? (
            <div className="log-status">
              <div className="log-loaded-name">
                <span className="settings-label">Loaded:</span> {randomizerFilename}
              </div>
              <div className="log-status-actions">
                <button type="button" className="btn-secondary" onClick={onResetRandomizer}>Load new log</button>
                {onOpenCacheFolder && (
                  <button type="button" className="btn-secondary" onClick={onOpenCacheFolder}>Open cache folder</button>
                )}
              </div>
              {randomizerCacheMessage && <p className="cache-message">{randomizerCacheMessage}</p>}
            </div>
          ) : (
            <div className="log-upload-section">
              <UploadPanel onFile={onLoadFile} />
              <p className="upload-hint-text">
                Generate a spoiler log from the Elden Ring Randomizer tool, then load the <code>.txt</code> file
                here. All parsing happens locally — nothing is uploaded.
              </p>
              {randomizerCacheMessage && <p className="cache-message">{randomizerCacheMessage}</p>}
            </div>
          )}
        </section>
      )}

      {/* ── Spoiler Display ── */}
      <section className="settings-section">
        <h3 className="settings-section-title">Spoiler Display</h3>
        <p className="settings-section-desc">
          Control how much location information is shown. Full detail remains available at any time.
        </p>

        <label className="settings-master-toggle">
          <input
            type="checkbox"
            checked={spoilerSettings.spoilerMode}
            onChange={(e) => onSpoilerSettingsChange({ ...spoilerSettings, spoilerMode: e.target.checked })}
          />
          <strong>Enable spoiler mode</strong>
          <span className="settings-option-desc">Hides exact item locations across all views.</span>
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
            <span className="settings-option-desc">Broad region only (e.g. Limgrave, Leyndell).</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={spoilerSettings.showSource}
              onChange={(e) => onSpoilerSettingsChange({ ...spoilerSettings, showSource: e.target.checked })}
              disabled={!spoilerSettings.spoilerMode}
            />
            <strong>Show source type</strong>
            <span className="settings-option-desc">How the item is obtained: boss drop, shop, etc.</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={spoilerSettings.showHint}
              onChange={(e) => onSpoilerSettingsChange({ ...spoilerSettings, showHint: e.target.checked })}
              disabled={!spoilerSettings.spoilerMode}
            />
            <strong>Show hint</strong>
            <span className="settings-option-desc">A generated clue without the exact location name.</span>
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

        <div className="settings-sub-section">
          <p className="settings-sub-section-label">Additional controls</p>

          <label className="settings-check-row">
            <input
              type="checkbox"
              checked={spoilerSettings.hideOriginalItem}
              onChange={(e) => onSpoilerSettingsChange({ ...spoilerSettings, hideOriginalItem: e.target.checked })}
            />
            <strong>Hide original / replaced item</strong>
            <span className="settings-option-desc">
              In Randomizer mode, hides what item was originally at each location.
            </span>
          </label>

          <label className="settings-check-row">
            <input
              type="checkbox"
              checked={spoilerSettings.randomizedPlacementSearchOnly}
              onChange={(e) => onSpoilerSettingsChange({ ...spoilerSettings, randomizedPlacementSearchOnly: e.target.checked })}
            />
            <strong>Search placements only</strong>
            <span className="settings-option-desc">
              In Randomizer mode, searching only matches item names and locations — not original item metadata.
            </span>
          </label>
        </div>
      </section>

      {/* ── Mod Content ── */}
      <section className="settings-section">
        <h3 className="settings-section-title">Mod Content</h3>
        <p className="settings-section-desc">
          Planned support for additional item databases from popular Elden Ring mods. Not yet available.
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

      {/* ── Data / Cache ── */}
      <section className="settings-section">
        <h3 className="settings-section-title">Data &amp; Cache</h3>

        {onResetSetup && (
          <div className="settings-action-row">
            <div>
              <strong>Return to startup setup</strong>
              <p className="settings-option-desc">Re-run the initial source selection screen.</p>
            </div>
            <button type="button" className="btn-secondary" onClick={onResetSetup}>
              Reset setup
            </button>
          </div>
        )}

        {isRandomizer && randomizerLoaded && (
          <div className="settings-action-row settings-action-destructive">
            <div>
              <strong>Clear loaded spoiler log</strong>
              <p className="settings-option-desc">Removes the loaded log and clears the cache. Your favorites and acquired state are kept.</p>
            </div>
            <button type="button" className="btn-danger" onClick={onResetRandomizer}>
              Clear log
            </button>
          </div>
        )}
      </section>

      {/* ── About ── */}
      <section className="settings-section settings-section-about">
        <h3 className="settings-section-title">About</h3>
        <p className="settings-about-line"><strong>Elden Ring Index and Build Planner</strong></p>
        <p className="settings-about-line">Version 1.2.1 · integrated</p>
        <p className="settings-about-line">Fully offline. All data stays on your computer. No telemetry, no network requests.</p>
      </section>
    </div>
  );
}
