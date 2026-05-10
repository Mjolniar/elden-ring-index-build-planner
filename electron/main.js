const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

// True when launched via `electron-builder` packaged exe, false during `electron .`
const isProd = app.isPackaged;

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
    // Load the Vite production build from the bundled asar
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  } else {
    // Connect to the Vite dev server
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools({ mode: 'detach' });
  }

  // Open external links in the default browser instead of Electron
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // On macOS it's conventional to keep the app running; on Windows/Linux quit.
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
