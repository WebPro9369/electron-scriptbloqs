# http = require('http')
path = require('path')
fs = require('fs')
class DownloadManager
  dataFolder = process.env.APPDATA or (if process.platform == 'darwin' then path.join(process.env.HOME, 'Library/Preferences') else '/var/local')
  # console.log dataFolder
  @appData = path.join(dataFolder, "scriptbloqs")
  @libPath = path.join(@appData, "libraries")
  # todo: this should really be in a python file
  # but i couldn't figure out how to do resources
  @commonPython = """
import sys
import os
import urllib
import urlparse
import zipfile
import errno
if sys.platform.startswith('java'):
    import platform
    os_name = platform.java_ver()[3][0]
    if os_name.startswith('Windows'): # "Windows XP", "Windows 7", etc.
        system = 'win32'
    elif os_name.startswith('Mac'): # "Mac OS X", etc.
        system = 'darwin'
    else: # "Linux", "SunOS", "FreeBSD", etc.
        # Setting this to "linux2" is not ideal, but only Windows or Mac
        # are actually checked for and the rest of the module expects
        # *sys.platform* style strings.
        system = 'linux2'
else:
    system = sys.platform



def user_data_dir(appname=None, appauthor=None, version=None, roaming=False):
    if system == "win32":
        if appauthor is None:
            appauthor = appname
        const = roaming and "CSIDL_APPDATA" or "CSIDL_LOCAL_APPDATA"
        path = os.path.normpath(_get_win_folder(const))
        if appname:
            if appauthor is not False:
                path = os.path.join(path, appauthor, appname)
            else:
                path = os.path.join(path, appname)
    elif system == 'darwin':
        path = os.path.expanduser('~/Library/Application Support/')
        if appname:
            path = os.path.join(path, appname)
    else:
        path = os.getenv('XDG_DATA_HOME', os.path.expanduser("~/.local/share"))
        if appname:
            path = os.path.join(path, appname)
    if appname and version:
        path = os.path.join(path, version)
    return path

appData = user_data_dir('scriptbloqs')
libraries = os.path.join(appData, "libraries")
tmp = os.path.join(appData, "libraries")
def make_dir(dir):
	try:
	    os.makedirs(dir)
	except OSError as e:
	    if e.errno != errno.EEXIST:
	        raise
make_dir(appData)
make_dir(libraries)
make_dir(tmp)
def verify_library(name):
	#todo would be nice to have a progress bar
	destpath = os.path.join(libraries, name)

	if not os.path.exists(destpath):
		libPath = os.path.join(libraries, name)
		if system == "darwin":
			filename = name + ".zip"
		else:
			filename = name + ".zip"

		url = "http://ubotstudio.com/files/libraries/" + filename
		dest = os.path.join(libraries, filename)
		urllib.urlretrieve(url, dest)
 		make_dir(destpath)
		with zipfile.ZipFile(dest) as zip:
			zip.extractall(destpath)
		os.remove(dest)
verify_library("ffmpeg")
  """
  makeDir = (path)->
    if !fs.existsSync(path)
      fs.mkdirSync(path)
  # download = (url,path)->
  #   if !fs.existsSync(path)
  #     file = fs.createWriteStream("file.jpg")
  #     request = http.get("", (response)->
  #       response.pipe(file)

  makeDir @appData
  makeDir @libPath
  # contents = fs.existsSync(path.join(process.resourcesPath, "python", "python.exe"))
  # console.log contents
  # console.log @libPath
module.exports = DownloadManager
