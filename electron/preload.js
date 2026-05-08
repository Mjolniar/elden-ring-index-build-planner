// Preload runs in a privileged context between main and renderer.
// The app uses only Web APIs (File, FileReader) so no IPC bridge is needed.
// This file exists as a placeholder and security boundary.
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
});
