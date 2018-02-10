PythonManager = require('./python-manager')
pythonManager = PythonManager

class ZiplineManager
  @runAlgorithm = (rp, imports, initialize, handler, addedCodes) ->
    return pythonManager.runPython(rp, imports).then () ->
      return pythonManager.runPython(rp, initialize).then () ->
        return pythonManager.runPython(rp, handler).then () ->
          return pythonManager.runPython(rp, addedCodes).then () ->
            return pythonManager.runPython(rp, """run_algorithm(start, end, initialize, base_capital, handle_data, bundle = 'quantopian-quandl')""").then()
  @closeSession = () ->
    pythonManager.closeSession();


module.exports = ZiplineManager
