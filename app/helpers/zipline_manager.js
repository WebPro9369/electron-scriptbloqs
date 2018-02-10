var PythonManager, ZiplineManager, pythonManager;

PythonManager = require('./python-manager');

pythonManager = PythonManager;

ZiplineManager = (function() {
  function ZiplineManager() {}

  ZiplineManager.runAlgorithm = function(rp, imports, initialize, handler, addedCodes) {
    return pythonManager.runPython(rp, imports).then(function() {
      return pythonManager.runPython(rp, initialize).then(function() {
        return pythonManager.runPython(rp, handler).then(function() {
          return pythonManager.runPython(rp, addedCodes).then(function() {
            return pythonManager.runPython(rp, "run_algorithm(start, end, initialize, base_capital, handle_data, bundle = 'quantopian-quandl')").then();
          });
        });
      });
    });
  };

  ZiplineManager.closeSession = function() {
    return pythonManager.closeSession();
  };

  return ZiplineManager;

})();

module.exports = ZiplineManager;
