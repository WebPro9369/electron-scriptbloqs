if (process.env.NODE_ENV === 'test') {
  window.electronRequire = require;
}
