// Karma configuration
// Generated on Sat Apr 02 2016 15:28:04 GMT-0600 (Mountain Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    //plugins: ['karma-jquery'],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine-jquery', 'jasmine', 'fixture'],
    // list of files / patterns to load in the browser
    files: [
        {pattern: 'fixtures/html/*.html', watch: true, included: false, served: true},
        'src/spec/*.coffee',
        'fixtures/html/*.html',
        'fixtures/javascript/*.js',
        'https://code.jquery.com/jquery-3.2.1.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/riot/3.4.4/riot+compiler.min.js',
        'app/components/components.js',
        'app/lib/lib.js',
        'https://cdn.rawgit.com/jeremyfa/yaml.js/develop/dist/yaml.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.2.1/mustache.js',
        'https://cdn.rawgit.com/j-ulrich/jquery-simulate-ext/13829b2b/libs/jquery.simulate.js',
        'https://cdn.rawgit.com/j-ulrich/jquery-simulate-ext/13829b2b/src/jquery.simulate.ext.js',
        'https://cdn.rawgit.com/j-ulrich/jquery-simulate-ext/13829b2b/libs/bililiteRange.js',
        'https://cdn.rawgit.com/j-ulrich/jquery-simulate-ext/13829b2b/src/jquery.simulate.key-sequence.js',
        'https://cdn.rawgit.com/j-ulrich/jquery-simulate-ext/13829b2b/src/jquery.simulate.drag-n-drop.js',
        'https://cdn.rawgit.com/j-ulrich/jquery-simulate-ext/13829b2b/src/jquery.simulate.drag-n-drop.js'
        ],
        // 'https://cdn.rawgit.com/j-ulrich/jquery-simulate-ext/13829b2b/src/jquery.simulate.drag-n-drop.js',
        // 'https://cdn.rawgit.com/j-ulrich/jquery-simulate-ext/13829b2b/src/jquery.simulate.key-sequence.js',
        // 'https://cdn.rawgit.com/j-ulrich/jquery-simulate-ext/13829b2b/src/jquery.simulate.key-combo.js'
        //     ],


    // list of files to exclude
    exclude: [
        'src/spec/app_test.coffee',
        'src/spec/utils.coffee',
        'src/spec/python-manager-test.coffee'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '**/*.html':['html2js'],
        '**/*.tag':['riot'],
        '**/*.coffee':['coffee']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
