# in this module, you will create a bridge to cpython. 
# see https://www.fyears.org/2017/02/electron-as-gui-of-python-apps-updated.html
fs            = require('fs')
path          = require('path')
electron      = require('electron')
BrowserWindow = electron.BrowserWindow
class PythonManager
  @pyProc = null
  @sessionStack = []
  @childProcess = null
  @promise = null
  @resolve = null
  @reject = null
  @error = ""
  @response = ""
  @guessPackaged = (path) ->
    return fs.existsSync(path)

  @executeScript = (resourcePath, script) ->
    dataString = ""
    promise = new Promise((resolve, reject) =>
      if(process.platform != 'darwin')
        @pyProc = require('child_process').spawn(resourcePath+'\\python\\python.exe', [script])
      else
        @pyProc = require('child_process').spawn('python', [script])
      if (@pyProc != null)
        console.log 'child process success'

        @pyProc.stdout.on 'data',(data) ->
          dataString += data.toString();

        @pyProc.stdout.on 'end', () =>
          resolve(dataString)
      return
    )
    return promise

  @closeSession = () ->
    @sessionStack = []

  # @runPython = (code, resourcePath)->

  #   console.log "entered"
  #   promise = new Promise (resolve, reject) =>
  #     try
  #       console.log "started"
  #       dataString = ""
  #       @sessionStack.push(code)
  #       execCode = "exec(\""+code+"\")"# "exec(\""+@sessionStack.join("\\n")+"\")"
  #       if @childProcess == null
  #         console.log "creating python process"
  #         if(process.platform != 'darwin')
  #           @childProcess = require('child_process').spawn(resourcePath+'\\python\\python.exe')
  #         else
  #           @childProcess = require('child_process').spawn('python', ["-i"])
  #         # @childProcess.stdout.pipe(process.stdout)
  #         @childProcess.stderr.on 'data', (data) =>
  #           console.log data.toString()
  #           if(data.toString().indexOf('DeprecationWarning:')==-1) 
  #             reject(data.toString());
  #           else
  #             dataString += data.toString();
          
  #         @childProcess.stdout.on 'data',(data) ->
  #           console.log data.toString()
  #           dataString += data.toString();

  #         @childProcess.stdout.on 'end', () =>
  #           resolve(dataString)
  #         @childProcess.on 'close', (code) ->
  #           console.log('closing code: ' + code)

  #       @childProcess.stdin.write "print(\"hello\\n\")"
  #       # @childProcess.stdin.write "sys.stdout.flush()/n"
  #       console.log "childProcess"
  #     catch e
  #       console.log e
  #   return promise


  @runPython = (code, asScript=false)=>
    cp = require('child_process')
    @response = ""
    @error = ""
    @promise = new Promise (resolve, reject) =>
      @resolve = resolve
      @reject = reject
    if @childProcess == null
      console.log "starting process"
      @childProcess = cp.spawn('python', [ '-i' ])
      @childProcess.stdout.setEncoding 'utf8'
      k = 0
      data_line = ''
      @childProcess.stderr.on 'data', (data) =>
        err = data.toString()
        console.log err
        if (not err.includes 'Type "help"') and (err != ">>> ")
          # @error += data.toString()
          #currentWindow = BrowserWindow.getFocusedWindow()
          global.mainWindow.webContents.send "output", err.replace(/>>> /g, "").replace(/\.\.\. /g, "")

        if err.includes ">>> "
          if @error.length > 0
            @resolve(error)
          else
            # console.log @response
            @resolve @response
      
      @childProcess.stdout.on 'data', (data) =>
        console.log data
        @response += data.toString()
        #currentWindow = BrowserWindow.getFocusedWindow()
        global.mainWindow.webContents.send "output", data.toString() 

    if asScript
      console.log code
      cleanCode = code.replace(/\\/g, "\\\\").replace(/\r/g, "").replace(/\n/g, "\\n").replace(/"/g, "\\\"")
      execCode = "exec(\"" + cleanCode + "\")\n"
      @childProcess.stdin.write execCode
    else
      console.log code
      @childProcess.stdin.write "\n" + code + "\n\n"
    return @promise
  
  @getPythonValue = (obj)->
    @runPython "print(" + obj + ")"

module.exports = PythonManager
