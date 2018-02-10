var BrowserWindow, Menu, app, autoUpdater, createWindow, dev_menu, dl, electron, env, mainWindow, menus, nativeImage, path, py, sendStatusToWindow, setApplicationMenu, url;

electron = require('electron');

app = electron.app;

BrowserWindow = electron.BrowserWindow;

nativeImage = electron.nativeImage;

path = require('path');

url = require('url');

Menu = electron.Menu;

menus = require("./helpers/menu-template");

dev_menu = require("./helpers/dev_menu_template");

py = require("./helpers/python-manager");

dl = require("./helpers/download-manager");

autoUpdater = require("electron-updater").autoUpdater;

env = require("./env");

mainWindow = void 0;

setApplicationMenu = function() {
  console.log(env.name);
  if (env.name !== 'production') {
    menus.push(dev_menu);
  }
  return Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

sendStatusToWindow = function(text) {
  return mainWindow.webContents.send('message', text);
};

autoUpdater.on('checking-for-update', function() {
  return sendStatusToWindow('Checking for update...');
});

autoUpdater.on('update-available', function(ev, info) {
  return sendStatusToWindow('Update available.');
});

autoUpdater.on('update-not-available', function(ev, info) {
  return sendStatusToWindow('Update not available.');
});

autoUpdater.on('error', function(ev, err) {
  return sendStatusToWindow('Error in auto-updater.');
});

autoUpdater.on('download-progress', function(progressObj) {
  var log_message;
  log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred;
  +"/" + progressObj.total + ')';
  return sendStatusToWindow(log_message);
});

autoUpdater.on('update-downloaded', function(ev, info) {
  return sendStatusToWindow('Update downloaded; will install in 5 seconds');
});

createWindow = function() {
  var icon, iconImagePath;
  setApplicationMenu();
  iconImagePath = path.join(__dirname, 'assets/icons/png/1024x1024.png');
  icon = nativeImage.createFromPath(iconImagePath);
  app.setName("Scriptbloqs");
  if (process.platform === 'darwin') {
    app.dock.setIcon(icon);
    app.dock.show();
  }
  mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    title: "ScriptBloqs",
    icon: icon,
    webPreferences: {
      preload: "preload.js"
    }
  });
  mainWindow.maximize();
  mainWindow.show();
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  console.log(process.resourcesPath);
  console.log(dl.commonPython);
  py.runPython(dl.commonPython, true);
  mainWindow.runPython = function(code, asScript) {
    var e;
    if (asScript == null) {
      asScript = false;
    }
    try {
      return py.runPython(code, asScript);
    } catch (error) {
      e = error;
      return e;
    }
  };
  mainWindow.getPythonValue = function(code) {
    var e;
    try {
      return py.getPythonValue(code);
    } catch (error) {
      e = error;
      return e;
    }
  };
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
  global['mainWindow'] = mainWindow;
};

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

autoUpdater.on('update-downloaded', function(ev, info) {
  return autoUpdater.quitAndInstall();
});

app.on('ready', function() {
  console.log(env.name);
  if (env.name !== 'development') {
    autoUpdater.checkForUpdates();
  }
});
