var Application, CmdManager, PythonManager, ZiplineManager, appPath, assert, chai, chaiAsPromised, cmdManager, electron, path, pythonManager, ziplineManager, ziplineScript;

chai = require('chai');

assert = require('assert');

path = require("path");

chaiAsPromised = require('chai-as-promised');

electron = require('electron');

Application = require('spectron').Application;

appPath = path.join(__dirname, '../..', 'dist/win-unpacked/ScriptbloqsDesktop.exe');

PythonManager = require("../helpers/python-manager");

CmdManager = require("../helpers/cmd_manager");

ZiplineManager = require("../helpers/zipline_manager");

pythonManager = PythonManager;

cmdManager = CmdManager;

ziplineManager = ZiplineManager;

ziplineScript = ["from zipline.api import record, symbol, order_target_percent\nfrom zipline import run_algorithm\nfrom datetime import datetimen\nimport pytz".replace(/(?:\r\n|\r|\n)/g, '\\n'), "def initialize(context):\n\tcontext.amzn = symbol('AMZN')".replace(/(?:\r\n|\r|\n)/g, '\\n'), "def handle_data(context, data):\n\trecord(AMZN=data[context.amzn].price)\n\tlong_mavg = data.history(context.amzn, 'close', 41, '1d')[:-1].mean()\n\tshort_mavg = data.history(context.amzn, 'close', 21, '1d')[:-1].mean()\n\trecord(long_mavg=long_mavg)\n\trecord(short_mavg=short_mavg)\n\tif short_mavg > long_mavg:\n\t\tif data.can_trade(context.amzn):\n\t\t\torder_target_percent(context.amzn, 1.00)\n\telse:\n\t\tif data.can_trade(context.amzn):\n\t\t\ttorder_target_percent(context.amzn, -1.00)".replace(/(?:\r\n|\r|\n)/g, '\\n'), "base_capital = 10000\nstart = datetime(2000, 1, 1, 0, 0, 0, 0, pytz.utc)\nend = datetime(2010, 1, 1, 0, 0, 0, 0, pytz.utc)".replace(/(?:\r\n|\r|\n)/g, '\\n')];

if (process.platform === 'win32') {
  if (process.arch === 'x64') {
    appPath = path.join(__dirname, '../..', 'dist/win-unpacked/ScriptbloqsDesktop.exe');
  } else {
    appPath = path.join(__dirname, '../..', 'dist/win-ia32-unpacked/ScriptbloqsDesktop.exe');
  }
}

chai.should();

chai.use(chaiAsPromised);

describe('application launch', function() {
  var currentApp;
  this.timeout(10000);
  currentApp = null;
  beforeEach(function() {
    var app;
    app = new Application({
      startTimeout: 10000,
      path: appPath
    });
    return app.start().then(function(app) {
      return currentApp = app;
    });
  });
  afterEach(function() {
    if (currentApp && currentApp.isRunning()) {
      return currentApp.stop();
    }
  });
  describe('python manager', function() {
    it('should run python and return a result', function() {
      return currentApp.mainProcess.resourcesPath().then(function(rp) {
        return pythonManager.runPython(rp, "print('hello')").then(function(result) {
          return chai.expect(result.replace(/\r\n$/, '')).to.equal("hello");
        });
      });
    });
    return it('should run python and send variable and print result', function() {
      return currentApp.mainProcess.resourcesPath().then(function(rp) {
        pythonManager.closeSession();
        return pythonManager.runPython(rp, "a=1").then(function() {
          return pythonManager.runPython(rp, "print(a)").then(function(result) {
            return chai.expect(result.replace(/\r\n$/, '')).to.equal("1");
          });
        });
      });
    });
  });
  describe('zipline manager', function() {
    return it('should execute standart zipline algorithm', function() {
      return currentApp.mainProcess.resourcesPath().then(function(rp) {
        ziplineManager.closeSession();
        return ziplineManager.runAlgorithm(rp, ziplineScript[0], ziplineScript[1], ziplineScript[2], ziplineScript[3]).then(function(result) {
          return chai.expect(result.replace(/\r\n$/, '')).to.equal("");
        });
      });
    });
  });
});
