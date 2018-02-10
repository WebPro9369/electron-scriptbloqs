var CmdManager;

CmdManager = (function() {
  function CmdManager() {}

  CmdManager.runCommand = function(resourcePath, bundleName) {
    var dataString, promise;
    dataString = "";
    promise = new Promise((function(_this) {
      return function(resolve, reject) {
        var child_process;
        if (!bundleName) {
          child_process = require('child_process').spawn(resourcePath + "\\python\\Scripts\\zipline.exe", ["ingest"]);
        } else {
          child_process = require('child_process').spawn(resourcePath + "\\python\\Scripts\\zipline.exe", ["ingest", "-b", bundleName]);
        }
        child_process.stdout.on('data', function(data) {
          return dataString += data.toString();
        });
        return child_process.stdout.on('end', function() {
          return resolve(dataString);
        });
      };
    })(this));
    return promise;
  };

  return CmdManager;

})();

module.exports = CmdManager;
