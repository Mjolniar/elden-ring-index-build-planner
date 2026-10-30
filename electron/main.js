const { app, BrowserWindow, ipcMain, shell } = require('electron');
const fs = require('fs');
const path = require('path');

// True when launched via `electron-builder` packaged exe, false during `electron .`
const isProd = app.isPackaged;

function getPortableBaseDir() {
  if (process.env.PORTABLE_EXECUTABLE_DIR) return process.env.PORTABLE_EXECUTABLE_DIR;
  if (isProd) return path.dirname(process.execPath);
  return process.cwd();
}

function getCacheDir() {
  return path.join(getPortableBaseDir(), 'cached-spoiler-logs');
}

function sanitizeFilePart(value) {
  return String(value || '')
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);
}

function buildCacheName(originalName, seed) {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const cleanName = sanitizeFilePart(originalName || 'spoiler-log.txt') || 'spoiler-log.txt';
  const seedPart = seed ? `seed-${sanitizeFilePart(seed)}` : 'seed-unknown';
  return `${seedPart}-${stamp}-${cleanName}`;
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

ipcMain.handle('spoiler-cache:save', async (_event, payload) => {
  const text = typeof payload?.text === 'string' ? payload.text : '';
  if (!text) throw new Error('Cannot cache an empty spoiler log.');

  const cacheDir = getCacheDir();
  fs.mkdirSync(cacheDir, { recursive: true });

  const filename = buildCacheName(payload?.filename, payload?.seed);
  const cachePath = path.join(cacheDir, filename);
  const latestPath = path.join(cacheDir, 'latest-spoiler-log.txt');
  const metaPath = path.join(cacheDir, 'latest-spoiler-log.json');

  fs.writeFileSync(cachePath, text, 'utf8');
  fs.writeFileSync(latestPath, text, 'utf8');

  const metadata = {
    filename: payload?.filename || filename,
    seed: payload?.seed || null,
    cachedAt: new Date().toISOString(),
    cachePath,
    cacheDir,
    latestPath,
  };
  fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2), 'utf8');
  return metadata;
});

ipcMain.handle('spoiler-cache:load', async () => {
  const cacheDir = getCacheDir();
  const latestPath = path.join(cacheDir, 'latest-spoiler-log.txt');
  const metaPath = path.join(cacheDir, 'latest-spoiler-log.json');

  if (!fs.existsSync(latestPath)) return null;

  const metadata = readJson(metaPath) || {
    filename: 'latest-spoiler-log.txt',
    seed: null,
    cachedAt: null,
    cachePath: latestPath,
    cacheDir,
    latestPath,
  };

  return {
    ...metadata,
    text: fs.readFileSync(latestPath, 'utf8'),
  };
});

ipcMain.handle('spoiler-cache:clear', async () => {
  const cacheDir = getCacheDir();
  const latestPath = path.join(cacheDir, 'latest-spoiler-log.txt');
  const metaPath = path.join(cacheDir, 'latest-spoiler-log.json');

  for (const file of [latestPath, metaPath]) {
    if (fs.existsSync(file)) fs.rmSync(file, { force: true });
  }

  return { cacheDir };
});

ipcMain.handle('spoiler-cache:open-dir', async () => {
  const cacheDir = getCacheDir();
  fs.mkdirSync(cacheDir, { recursive: true });
  await shell.openPath(cacheDir);
  return { cacheDir };
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 800,
    minHeight: 600,
    title: 'Elden Ring Index and Build Planner',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
    },
  });

  if (isProd) {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  } else {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools({ mode: 'detach' });
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
