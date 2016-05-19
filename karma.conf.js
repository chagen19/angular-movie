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
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/underscore/underscore.js',
      'bower_components/restangular/dist/restangular.js',
      'app/app.js',
      'app/app.*.js',
      'app/**/*.controller.js',
      'app/**/*.js',
      'app/**/*.html'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/!(*.spec).js': ['coverage'],
      'app/**/*.html': ['ng-html2js']
    },

    // A way to pre-load the templates into the $templateCache so that they're already available when Angular asks for them, without using $http.
    ngHtml2JsPreprocessor: {
      stripPrefix: "app/",
      moduleName: "templates"
    },

    // list of files to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'kjhtml'],


    junitReporter: {
      // location of results output file
      outputFile: 'test-results/junit-results.xml'
    },
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,


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
