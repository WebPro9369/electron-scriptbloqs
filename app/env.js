var env, jetpack;

jetpack = require('fs-jetpack');

env = jetpack.cwd(__dirname).read('env.json', 'json');

module.exports = env;
