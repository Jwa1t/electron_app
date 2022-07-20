const {app, BrowserWindow, ipcMain, dialog, Menu} = require('electron');
const path = require('path');

// Example function for renderer to main (one-way)
function handleSetTitle (event, title) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
}

// Example function for renderer to main (two-way)
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (canceled) {
    return;
  } else {
    return filePaths[0];
  }
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement'
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu);
  mainWindow.loadFile('index.html');
}



app.whenReady().then(() => {
  ipcMain.on('set-title', handleSetTitle);
  ipcMain.handle('dialog:openFile', handleFileOpen);
  // Handles reply from renderer for main to renderer (two-way)
  ipcMain.on('counter-value', (event, value) => {
    console.log(value);
  });
  createWindow();
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})