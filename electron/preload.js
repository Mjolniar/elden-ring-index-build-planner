// Preload runs in a privileged context between main and renderer.
// Expose only the spoiler-log cache helpers the UI needs.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  saveSpoilerLogCache: (payload) => ipcRenderer.invoke('spoiler-cache:save', payload),
  loadSpoilerLogCache: () => ipcRenderer.invoke('spoiler-cache:load'),
  clearSpoilerLogCache: () => ipcRenderer.invoke('spoiler-cache:clear'),
  openSpoilerLogCacheDir: () => ipcRenderer.invoke('spoiler-cache:open-dir'),
});
