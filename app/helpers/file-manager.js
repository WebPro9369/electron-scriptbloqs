var BrowserWindow, FileManager, app, dialog, electron;

electron = require('electron');

app = electron.app;

BrowserWindow = electron.BrowserWindow;

dialog = electron.dialog;

FileManager = (function() {
  function FileManager() {}

  FileManager.currentName = null;

  FileManager["new"] = function() {
    return global.mainWindow.webContents.send("newFile");
  };

  FileManager.buildFileModel = function(path) {
    return this.fileModel;
  };

  FileManager.createFolder = function(path) {};

  FileManager.save = function(as) {
    var parentWindow, properties;
    if (as == null) {
      as = false;
    }
    properties = {
      filters: [
        {
          name: "ScriptBloqs File",
          extensions: ['bloqs']
        }
      ]
    };
    if (process.platform === 'darwin') {
      parentWindow = null;
    } else {
      parentWindow = BrowserWindow.getFocusedWindow();
    }
    console.log(FileManager.currentName);
    if (as || (FileManager.currentName == null)) {
      return dialog.showSaveDialog(parentWindow, properties, function(f) {
        if (f != null) {
          global.mainWindow.webContents.send("save", f);
          return FileManager.currentName = f;
        }
      });
    } else {
      return global.mainWindow.webContents.send("save", FileManager.currentName);
    }
  };

  FileManager.open = function(file) {
    var parentWindow, properties;
    properties = ['openFile', 'openDirectory'];
    if (process.platform === 'darwin') {
      parentWindow = null;
    } else {
      parentWindow = BrowserWindow.getFocusedWindow();
    }
    return dialog.showOpenDialog(parentWindow, properties, function(f) {
      if (f != null) {
        return global.mainWindow.webContents.send("open", f[0]);
      }
    });
  };

  FileManager["delete"] = function(file) {};

  FileManager.copy = function(file) {};

  FileManager.paste = function(path) {};

  return FileManager;

})();

module.exports = FileManager;
