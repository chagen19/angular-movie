// Karma configuration
// Generated on Mon Apr 18 2016 17:24:20 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine-jquery', 'jasmine'],

    // list of files / patterns to load in the browser
    // The order here matters!!!!!!
    files: [
      'src/client/bower_components/jquery/dist/jquery.js',
      'src/client/bower_components/angular/angular.js',
      'src/client/bower_components/angular-mocks/angular-mocks.js',
      'src/client/bower_components/underscore/underscore.js',
      'src/client/bower_components/restangular/dist/restangular.js',
      'src/client/app/app.js',
      'src/client/app/app.*.js',
      'src/client/app/**/*.controller.js',
      'src/client/app/**/*.js',
      'src/client/app/**/*.html'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/client/app/**/!(*.spec).js': ['coverage'],
      'src/client/app/**/*.html': ['ng-html2js']
    },

    // A way to pre-load the templates into the $templateCache so that they're already available when Angular asks for them, without using $http.
    ngHtml2JsPreprocessor: {
      stripPrefix: "src/client/",
      moduleName: "templates"
    },

    // list of files to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'kjhtml', 'coverage'],


    junitReporter: {
      // location of results output file
      outputFile: 'test-results/junit-results.xml'
    },

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


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
  });
}
