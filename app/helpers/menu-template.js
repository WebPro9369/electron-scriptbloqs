var BrowserWindow, app, dialog, electron, fileManager, pythonManager;

electron = require('electron');

app = electron.app;

BrowserWindow = electron.BrowserWindow;

dialog = electron.dialog;

pythonManager = require("./python-manager");

fileManager = require("./file-manager");

module.exports = [
  {
    label: 'ScriptBloqs',
    submenu: [
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: function() {
          return app.quit();
        }
      }
    ]
  }, {
    label: 'File',
    submenu: [
      {
        label: 'New',
        accelerator: 'CmdOrCtrl+N',
        click: function() {
          return fileManager["new"]();
        }
      }, {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: function() {
          return fileManager.save();
        }
      }, {
        label: 'Save As',
        accelerator: 'CmdOrCtrl+Shift+S',
        click: function() {
          return fileManager.save(true);
        }
      }, {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click: function() {
          return fileManager.open();
        }
      }
    ]
  }
];
