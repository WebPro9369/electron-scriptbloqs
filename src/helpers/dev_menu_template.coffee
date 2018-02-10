electron = require('electron')
BrowserWindow = electron.BrowserWindow
module.exports = {
  label: 'Development',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: () ->
      BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache()
      return
  },{
    label: 'Toggle DevTools',
    accelerator: 'Alt+CmdOrCtrl+I',
    click: () ->
      BrowserWindow.getFocusedWindow().toggleDevTools();
      return
  }]
}