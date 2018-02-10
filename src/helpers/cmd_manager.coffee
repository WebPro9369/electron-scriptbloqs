
class CmdManager
  @runCommand = (resourcePath, bundleName)->
    dataString = ""
    promise = new Promise((resolve, reject) =>
      if(!bundleName)
        child_process = require('child_process').spawn(resourcePath+"\\python\\Scripts\\zipline.exe", ["ingest"])
      else
        child_process = require('child_process').spawn(resourcePath+"\\python\\Scripts\\zipline.exe", ["ingest", "-b", bundleName])

      child_process.stdout.on 'data',(data) ->
        dataString += data.toString();

      child_process.stdout.on 'end', () =>
        resolve(dataString)
    )
    return promise

module.exports = CmdManager
