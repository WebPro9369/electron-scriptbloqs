var DownloadManager, fs, path;

path = require('path');

fs = require('fs');

DownloadManager = (function() {
  var dataFolder, makeDir;

  function DownloadManager() {}

  dataFolder = process.env.APPDATA || (process.platform === 'darwin' ? path.join(process.env.HOME, 'Library/Preferences') : '/var/local');

  DownloadManager.appData = path.join(dataFolder, "scriptbloqs");

  DownloadManager.libPath = path.join(DownloadManager.appData, "libraries");

  DownloadManager.commonPython = "import sys\nimport os\nimport urllib\nimport urlparse\nimport zipfile\nimport errno\nif sys.platform.startswith('java'):\n    import platform\n    os_name = platform.java_ver()[3][0]\n    if os_name.startswith('Windows'): # \"Windows XP\", \"Windows 7\", etc.\n        system = 'win32'\n    elif os_name.startswith('Mac'): # \"Mac OS X\", etc.\n        system = 'darwin'\n    else: # \"Linux\", \"SunOS\", \"FreeBSD\", etc.\n        # Setting this to \"linux2\" is not ideal, but only Windows or Mac\n        # are actually checked for and the rest of the module expects\n        # *sys.platform* style strings.\n        system = 'linux2'\nelse:\n    system = sys.platform\n\n\n\ndef user_data_dir(appname=None, appauthor=None, version=None, roaming=False):\n    if system == \"win32\":\n        if appauthor is None:\n            appauthor = appname\n        const = roaming and \"CSIDL_APPDATA\" or \"CSIDL_LOCAL_APPDATA\"\n        path = os.path.normpath(_get_win_folder(const))\n        if appname:\n            if appauthor is not False:\n                path = os.path.join(path, appauthor, appname)\n            else:\n                path = os.path.join(path, appname)\n    elif system == 'darwin':\n        path = os.path.expanduser('~/Library/Application Support/')\n        if appname:\n            path = os.path.join(path, appname)\n    else:\n        path = os.getenv('XDG_DATA_HOME', os.path.expanduser(\"~/.local/share\"))\n        if appname:\n            path = os.path.join(path, appname)\n    if appname and version:\n        path = os.path.join(path, version)\n    return path\n\nappData = user_data_dir('scriptbloqs')\nlibraries = os.path.join(appData, \"libraries\")\ntmp = os.path.join(appData, \"libraries\")\ndef make_dir(dir):\n	try:\n	    os.makedirs(dir)\n	except OSError as e:\n	    if e.errno != errno.EEXIST:\n	        raise\nmake_dir(appData)\nmake_dir(libraries)\nmake_dir(tmp)\ndef verify_library(name):\n	#todo would be nice to have a progress bar\n	destpath = os.path.join(libraries, name)\n\n	if not os.path.exists(destpath):\n		libPath = os.path.join(libraries, name)\n		if system == \"darwin\":\n			filename = name + \".zip\"\n		else:\n			filename = name + \".zip\"\n\n		url = \"http://ubotstudio.com/files/libraries/\" + filename\n		dest = os.path.join(libraries, filename)\n		urllib.urlretrieve(url, dest)\n 		make_dir(destpath)\n		with zipfile.ZipFile(dest) as zip:\n			zip.extractall(destpath)\n		os.remove(dest)\nverify_library(\"ffmpeg\")";

  makeDir = function(path) {
    if (!fs.existsSync(path)) {
      return fs.mkdirSync(path);
    }
  };

  makeDir(DownloadManager.appData);

  makeDir(DownloadManager.libPath);

  return DownloadManager;

})();

module.exports = DownloadManager;
