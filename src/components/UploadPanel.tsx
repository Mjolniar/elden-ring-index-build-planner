import { useRef, useState, type DragEvent, type ChangeEvent } from 'react';

interface Props {
  onFile: (text: string, filename: string) => void;
}

export function UploadPanel({ onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function readFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => onFile(e.target?.result as string, file.name);
    reader.readAsText(file);
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) readFile(file);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) readFile(file);
  }

  return (
    <div
      className={`upload-panel${dragging ? ' dragging' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".txt,.log"
        style={{ display: 'none' }}
        onChange={onChange}
      />
      <span className="upload-icon">📂</span>
      <span>Drop a spoiler log here or click to browse</span>
      <span className="upload-hint">Files stay local — nothing is uploaded to any server</span>
    </div>
  );
}
