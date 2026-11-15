import { useState } from 'react';
import { UploadPanel } from './UploadPanel';

interface Props {
  onChooseVanilla: () => void;
  onRandomizerFile: (text: string, filename: string) => void;
  uploadError: string;
  onClearUploadError: () => void;
}

type SetupStep = 'choice' | 'randomizer-upload';

export function InitialSetupPanel({
  onChooseVanilla,
  onRandomizerFile,
  uploadError,
  onClearUploadError,
}: Props) {
  const [step, setStep] = useState<SetupStep>('choice');

  function handleChooseRandomizer() {
    onClearUploadError();
    setStep('randomizer-upload');
  }

  function handleBack() {
    onClearUploadError();
    setStep('choice');
  }

  return (
    <div className="setup-screen">
      <div className="setup-card">
        {step === 'choice' ? (
          <>
            <h2 className="setup-question">Are you using the Elden Ring Randomizer?</h2>
            <p className="setup-hint">
              Choose how you want to use this app. You can change this later in Settings.
            </p>
            <div className="setup-choices">
              <button
                type="button"
                className="setup-choice-btn"
                onClick={onChooseVanilla}
              >
                <span className="setup-choice-title">No, use Vanilla</span>
                <span className="setup-choice-desc">
                  Browse all 1,200+ base game and DLC items with their fixed vanilla
                  locations. Ready immediately — no file needed.
                </span>
              </button>
              <button
                type="button"
                className="setup-choice-btn"
                onClick={handleChooseRandomizer}
              >
                <span className="setup-choice-title">Yes, load Randomizer spoiler log</span>
                <span className="setup-choice-desc">
                  Load a spoiler log from the Elden Ring Randomizer to see where items
                  were placed in your run.
                </span>
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="setup-question">Load your Randomizer spoiler log</h2>
            <div className="setup-upload-area">
              <UploadPanel onFile={onRandomizerFile} />
            </div>
            <p className="setup-spoiler-note">
              Generate a spoiler log from the Elden Ring Randomizer and load the{' '}
              <code>.txt</code> file here. The seed alone is not enough to reconstruct
              item placements — only the spoiler log contains location data.
            </p>
            {uploadError && (
              <p className="setup-upload-error" role="alert">
                {uploadError}
              </p>
            )}
            <button
              type="button"
              className="setup-back-btn"
              onClick={handleBack}
            >
              ← Not using Randomizer
            </button>
          </>
        )}
      </div>
    </div>
  );
}
