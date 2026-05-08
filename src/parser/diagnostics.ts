import type { ParseDiagnostics } from '../types';

export function createDiagnostics(): ParseDiagnostics {
  return {
    totalLines: 0,
    parsedRecords: 0,
    unmatchedLines: [],
    warnings: [],
    sections: [],
  };
}

export function addUnmatched(diag: ParseDiagnostics, line: string): void {
  diag.unmatchedLines.push(line);
}

export function addWarning(diag: ParseDiagnostics, msg: string): void {
  diag.warnings.push(msg);
}

export function addSection(diag: ParseDiagnostics, name: string): void {
  if (!diag.sections.includes(name)) {
    diag.sections.push(name);
  }
}
