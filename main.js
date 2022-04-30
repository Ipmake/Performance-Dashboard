// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
require("electron-reload")(__dirname)


function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    icon: './src/images/graph.png',
    minWidth: 1500,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  mainWindow.loadFile('./src/pages/dashboard/index.html')
  //mainWindow.removeMenu()

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})