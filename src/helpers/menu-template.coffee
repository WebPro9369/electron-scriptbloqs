electron = require('electron')
app = electron.app
BrowserWindow = electron.BrowserWindow
dialog = electron.dialog
pythonManager = require("./python-manager")
fileManager = require("./file-manager")
module.exports = [
  {
    label: 'ScriptBloqs',
    submenu: [{

      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      click: () ->
        app.quit()
        
    }],
    }, {
    label: 'File',
    submenu: [{
      label: 'New',
      accelerator: 'CmdOrCtrl+N',
      click: () ->
        fileManager.new()
      
    },{
      label: 'Save',
      accelerator: 'CmdOrCtrl+S',
      click: () ->

        fileManager.save()
        
    },{
      label: 'Save As',
      accelerator: 'CmdOrCtrl+Shift+S',
      click: () ->

        fileManager.save(true)
        
    },{
      label: 'Open',
      accelerator: 'CmdOrCtrl+O',
      click: () ->
        fileManager.open()
    }]
  }
]