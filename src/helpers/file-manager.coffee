electron      = require('electron')
app           = electron.app
BrowserWindow = electron.BrowserWindow
dialog        = electron.dialog

class FileManager
  #http://stackoverflow.com/questions/11194287/convert-a-directory-structure-in-the-filesystem-to-json-with-node-js
  #all files and folders in the file model should be watched and the file model should be updated with any changes
  @currentName = null
  @new = ->
    #currentWindow = BrowserWindow.getFocusedWindow()
    global.mainWindow.webContents.send("newFile")

  @buildFileModel = (path)->
    #build model from path
    @fileModel

  @createFolder = (path)->

  @save = (as=false)=>
    properties =
      filters: [
        name: "ScriptBloqs File"
        extensions: ['bloqs']
      ]
    #mainWindow = BrowserWindow.getFocusedWindow()
        
    if(process.platform == 'darwin')
      parentWindow = null
    else
      parentWindow = BrowserWindow.getFocusedWindow()
    console.log @currentName
    if as or not @currentName?
      dialog.showSaveDialog parentWindow, properties, (f) =>
        if f?
          global.mainWindow.webContents.send("save", f)
          @currentName = f
    else
      global.mainWindow.webContents.send("save", @currentName)

  @open = (file)->
    properties = ['openFile', 'openDirectory']
    #currentWindow = BrowserWindow.getFocusedWindow()
        
    if(process.platform == 'darwin')
      parentWindow = null
    else
      parentWindow = BrowserWindow.getFocusedWindow()

    dialog.showOpenDialog parentWindow, properties, (f) ->
      if f?
        global.mainWindow.webContents.send("open", f[0])

  @delete = (file)->

  @copy = (file)->

  @paste = (path)->
    #return name of pasted file or folder.
    # if a file or folder of the same name already exists in the folder, add a 0 to the end. 
    # if a file or folder with a 0 on the end exists, add a 1 on the end, etc etc

module.exports = FileManager