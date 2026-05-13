import type { DataSourceKind } from '../types';
import { SOURCE_META_LIST } from '../dataSources';

interface Props {
  activeSource: DataSourceKind;
  onChange: (kind: DataSourceKind) => void;
}

export function SourceSelector({ activeSource, onChange }: Props) {
  return (
    <div className="source-selector" role="radiogroup" aria-label="Active data source">
      {SOURCE_META_LIST.map((meta) => (
        <button
          key={meta.kind}
          type="button"
          className={`source-option${activeSource === meta.kind ? ' active' : ''}`}
          role="radio"
          aria-checked={activeSource === meta.kind}
          onClick={() => onChange(meta.kind)}
          title={meta.description}
        >
          {meta.shortLabel}
        </button>
      ))}
    </div>
  );
}
