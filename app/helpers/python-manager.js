var BrowserWindow, PythonManager, electron, fs, path;

fs = require('fs');

path = require('path');

electron = require('electron');

BrowserWindow = electron.BrowserWindow;

PythonManager = (function() {
  function PythonManager() {}

  PythonManager.pyProc = null;

  PythonManager.sessionStack = [];

  PythonManager.childProcess = null;

  PythonManager.promise = null;

  PythonManager.resolve = null;

  PythonManager.reject = null;

  PythonManager.error = "";

  PythonManager.response = "";

  PythonManager.guessPackaged = function(path) {
    return fs.existsSync(path);
  };

  PythonManager.executeScript = function(resourcePath, script) {
    var dataString, promise;
    dataString = "";
    promise = new Promise((function(_this) {
      return function(resolve, reject) {
        if (process.platform !== 'darwin') {
          _this.pyProc = require('child_process').spawn(resourcePath + '\\python\\python.exe', [script]);
        } else {
          _this.pyProc = require('child_process').spawn('python', [script]);
        }
        if (_this.pyProc !== null) {
          console.log('child process success');
          _this.pyProc.stdout.on('data', function(data) {
            return dataString += data.toString();
          });
          _this.pyProc.stdout.on('end', function() {
            return resolve(dataString);
          });
        }
      };
    })(this));
    return promise;
  };

  PythonManager.closeSession = function() {
    return this.sessionStack = [];
  };

  PythonManager.runPython = function(code, asScript) {
    var cleanCode, cp, data_line, execCode, k;
    if (asScript == null) {
      asScript = false;
    }
    cp = require('child_process');
    PythonManager.response = "";
    PythonManager.error = "";
    PythonManager.promise = new Promise(function(resolve, reject) {
      PythonManager.resolve = resolve;
      return PythonManager.reject = reject;
    });
    if (PythonManager.childProcess === null) {
      console.log("starting process");
      PythonManager.childProcess = cp.spawn('python', ['-i']);
      PythonManager.childProcess.stdout.setEncoding('utf8');
      k = 0;
      data_line = '';
      PythonManager.childProcess.stderr.on('data', function(data) {
        var err;
        err = data.toString();
        console.log(err);
        if ((!err.includes('Type "help"')) && (err !== ">>> ")) {
          global.mainWindow.webContents.send("output", err.replace(/>>> /g, "").replace(/\.\.\. /g, ""));
        }
        if (err.includes(">>> ")) {
          if (PythonManager.error.length > 0) {
            return PythonManager.resolve(error);
          } else {
            return PythonManager.resolve(PythonManager.response);
          }
        }
      });
      PythonManager.childProcess.stdout.on('data', function(data) {
        console.log(data);
        PythonManager.response += data.toString();
        return global.mainWindow.webContents.send("output", data.toString());
      });
    }
    if (asScript) {
      console.log(code);
      cleanCode = code.replace(/\\/g, "\\\\").replace(/\r/g, "").replace(/\n/g, "\\n").replace(/"/g, "\\\"");
      execCode = "exec(\"" + cleanCode + "\")\n";
      PythonManager.childProcess.stdin.write(execCode);
    } else {
      console.log(code);
      PythonManager.childProcess.stdin.write("\n" + code + "\n\n");
    }
    return PythonManager.promise;
  };

  PythonManager.getPythonValue = function(obj) {
    return this.runPython("print(" + obj + ")");
  };

  return PythonManager;

})();

module.exports = PythonManager;
