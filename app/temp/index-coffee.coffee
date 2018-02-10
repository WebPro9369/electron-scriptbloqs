







































    p = $("pypod")
    i = 0
    while not p[0].tagname == "body"
      p = p.parent().css("height", "100%")
      i += 1
      if i > 100
        console.log "infinite loop"
        break
    window.electron = require 'electron'
    window.promise = require 'promise'
    window.runPython = electron.remote.getCurrentWindow().runPython
    window.getPythonValue = electron.remote.getCurrentWindow().getPythonValue

 
    sharedObservable = riot.observable()
  
    #tag = riot.mount "file-browser", fileManager.buildFileModel("file-system-test")
    scriptModel.getBloqData (script, toolbox)->
      app = riot.mount "pypod",
        sharedObservable: sharedObservable
        script: script
        toolbox: toolbox
    #tag[0].on 'fileChosen', (file)->
      # when user double clicks on a python file, run the file via pythonManager. log results to console

