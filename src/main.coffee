electron      = require('electron')
# Module to control application life.
app           = electron.app
# Module to create native browser window.
BrowserWindow = electron.BrowserWindow
nativeImage   = electron.nativeImage
path          = require('path')
url           = require('url')
Menu          = electron.Menu
menus         = require("./helpers/menu-template")
dev_menu      = require("./helpers/dev_menu_template")
py            = require("./helpers/python-manager")
dl            = require("./helpers/download-manager")
#Do not call setFeedURL. electron-builder automatically creates app-update.yml
# file for you on build in the resources (this file is internal,
# you don't need to be aware of it).
autoUpdater   = require("electron-updater").autoUpdater

env           = require("./env")
# Keep a global reference of the window object, if you don't, the window will
# be closed automatically when the JavaScript object is garbage collected.
mainWindow    = undefined


setApplicationMenu = ->
  console.log env.name
  if (env.name != 'production')
    menus.push(dev_menu)
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus))

sendStatusToWindow = (text)->
  mainWindow.webContents.send('message', text)

autoUpdater.on 'checking-for-update', () ->
  sendStatusToWindow('Checking for update...')

autoUpdater.on 'update-available', (ev, info) ->
  sendStatusToWindow('Update available.')

autoUpdater.on 'update-not-available', (ev, info) ->
  sendStatusToWindow('Update not available.')

autoUpdater.on 'error', (ev, err) ->
  sendStatusToWindow('Error in auto-updater.')

autoUpdater.on 'download-progress', (progressObj) ->
  log_message = "Download speed: " + progressObj.bytesPerSecond
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
  log_message = log_message + ' (' + progressObj.transferred
  + "/" + progressObj.total + ')'
  sendStatusToWindow(log_message)

autoUpdater.on 'update-downloaded', (ev, info) ->
  sendStatusToWindow('Update downloaded; will install in 5 seconds')

# This method will be called when Electron has finished
# initialization and is ready to create browser windows.
# Some APIs can only be used after this event occurs.

createWindow = ->
  setApplicationMenu()

  ## Load Icon image
  iconImagePath = path.join(__dirname, 'assets/icons/png/1024x1024.png')
  icon          = nativeImage.createFromPath(iconImagePath)
  
  ## set name of the app
  app.setName "Scriptbloqs"

  if process.platform is 'darwin'
    app.dock.setIcon(icon)
    app.dock.show() 
  
  # Create the browser window.
  mainWindow = new BrowserWindow
    show  : false
    width : 800
    height: 600
    title : "ScriptBloqs"
    icon  : icon
    webPreferences : 
      preload: "preload.js"

  mainWindow.maximize()
  mainWindow.show()
  # and load the index.html of the app.
  mainWindow.loadURL url.format(
    pathname: path.join(__dirname, 'index.html')
    protocol: 'file:'
    slashes: true)
  # mainWindow.loadURL "https://scriptbloqs.com/app/"
  # console.log process.versions
  console.log process.resourcesPath
  console.log dl.commonPython
  # py.runPython "import appdirs"
  # py.runPython "print(os.getcwd())"
  py.runPython dl.commonPython, true

  mainWindow.runPython = (code, asScript=false)-> 
    try
      py.runPython(code, asScript)
    catch e
      return e

  mainWindow.getPythonValue = (code)-> 
    try
      py.getPythonValue(code)
    catch e
      return e


  # Open the DevTools.
  # mainWindow.webContents.openDevTools()
  # Emitted when the window is closed.
  mainWindow.on 'closed', ->
  # Dereference the window object, usually you would store windows
  # in an array if your app supports multi windows, this is the time
  # when you should delete the corresponding element.
    mainWindow = null
    return
  ## create a global variable - mainwindow
  global['mainWindow'] = mainWindow
  return




app.on 'ready', createWindow
# Quit when all windows are closed.
app.on 'window-all-closed', ->
# On OS X it is common for applications and their menu bar
# to stay active until the user quits explicitly with Cmd + Q
  if process.platform != 'darwin'
    app.quit()
  return

app.on 'activate', ->
# On OS X it's common to re-create a window in the app when the
# dock icon is clicked and there are no other windows open.
  if mainWindow == null
    createWindow()
  return
# In this file you can include the rest of your app's specific main process
# code. You can also put them in separate files and require them here.

autoUpdater.on 'update-downloaded', (ev, info) ->
  autoUpdater.quitAndInstall()

app.on 'ready', () ->
  console.log env.name
  if (env.name != 'development')
    autoUpdater.checkForUpdates()
  return
