chai = require('chai')
assert = require('assert')
path = require("path")
chaiAsPromised = require('chai-as-promised')
electron = require('electron')
Application = require('spectron').Application
appPath = path.join(__dirname, '../..',
  'dist/win-unpacked/ScriptbloqsDesktop.exe')
PythonManager = require("../helpers/python-manager")
CmdManager = require("../helpers/cmd_manager")
ZiplineManager = require("../helpers/zipline_manager")
pythonManager = PythonManager
cmdManager = CmdManager
ziplineManager = ZiplineManager


ziplineScript = ["""from zipline.api import record, symbol, order_target_percent
from zipline import run_algorithm
from datetime import datetimen
import pytz""".replace(/(?:\r\n|\r|\n)/g, '\\n'),
"""def initialize(context):
\tcontext.amzn = symbol('AMZN')""".replace(/(?:\r\n|\r|\n)/g, '\\n'),
"""def handle_data(context, data):
\trecord(AMZN=data[context.amzn].price)
\tlong_mavg = data.history(context.amzn, 'close', 41, '1d')[:-1].mean()
\tshort_mavg = data.history(context.amzn, 'close', 21, '1d')[:-1].mean()
\trecord(long_mavg=long_mavg)
\trecord(short_mavg=short_mavg)
\tif short_mavg > long_mavg:
\t\tif data.can_trade(context.amzn):
\t\t\torder_target_percent(context.amzn, 1.00)
\telse:
\t\tif data.can_trade(context.amzn):
\t\t\ttorder_target_percent(context.amzn, -1.00)""".replace(/(?:\r\n|\r|\n)/g, '\\n'), """base_capital = 10000
start = datetime(2000, 1, 1, 0, 0, 0, 0, pytz.utc)
end = datetime(2010, 1, 1, 0, 0, 0, 0, pytz.utc)""".replace(/(?:\r\n|\r|\n)/g, '\\n')]


if(process.platform == 'win32')
  if(process.arch == 'x64')
    appPath = path.join(__dirname, '../..', 'dist/win-unpacked/ScriptbloqsDesktop.exe')
  else
    appPath = path.join(__dirname, '../..', 'dist/win-ia32-unpacked/ScriptbloqsDesktop.exe')


chai.should()
chai.use(chaiAsPromised)

describe 'application launch', () ->
  this.timeout(10000)
  currentApp = null

  beforeEach(()->
    app = new Application({
      startTimeout: 10000,
      path: appPath
    })
    return app.start().then((app)->
      currentApp = app
    )
  )

  afterEach( ()->
    if (currentApp && currentApp.isRunning())
      return currentApp.stop()
    return
  )

  describe 'python manager', ->
    it 'should run python and return a result', ->
      return currentApp.mainProcess.resourcesPath().then (rp)->
        return pythonManager.runPython(rp, "print('hello')").then (result) ->
          return chai.expect(result.replace(/\r\n$/, '')).to.equal("hello")


    it 'should run python and send variable and print result', ->
      return currentApp.mainProcess.resourcesPath().then (rp)->
        pythonManager.closeSession()
        return pythonManager.runPython(rp, "a=1").then () ->
          return pythonManager.runPython(rp,"print(a)").then (result) ->
            return chai.expect(result.replace(/\r\n$/, '')).to.equal("1")

  describe 'zipline manager', ->
    it 'should execute standart zipline algorithm', ->
      return currentApp.mainProcess.resourcesPath().then (rp)->
        ziplineManager.closeSession()
        return ziplineManager.runAlgorithm(rp, ziplineScript[0], ziplineScript[1], ziplineScript[2], ziplineScript[3]).then (result) ->
          return chai.expect(result.replace(/\r\n$/, '')).to.equal("")


#  describe 'zipline ingest', ->
#      it 'should run zipline ingest', ->
#        return currentApp.mainProcess.resourcesPath().then (rp)->
#          return cmdManager.runCommand(rp).then (result) ->
#            return chai.expect(result.replace(/\r\n$/, '')).to.include new Date().toISOString().split("T")[0]

  return