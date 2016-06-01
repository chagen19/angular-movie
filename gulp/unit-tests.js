'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var karma = require('karma');
var jasmine = require('gulp-jasmine');
var istanbul = require('gulp-istanbul');

var pathSrcHtml = [
    path.join(conf.paths.client, '/!(bower_components)/**/*.html')
];

var pathSrcJs = [
    path.join(conf.paths.client, '/!(bower_components)/**/!(*.spec).js')
];

function runClientTests(singleRun, done) {
    var reporters = ['spec'];
    var preprocessors = {};

    pathSrcHtml.forEach(function (path) {
        preprocessors[path] = ['ng-html2js'];
    });

    if (singleRun) {
        pathSrcJs.forEach(function (path) {
            preprocessors[path] = ['coverage'];
        });
        reporters.push('coverage')
    }

    var localConfig = {
        configFile: path.join(__dirname, '/../karma.conf.js'),
        singleRun: singleRun,
        autoWatch: !singleRun,
        reporters: reporters,
        preprocessors: preprocessors
    };

    var server = new karma.Server(localConfig, function (failCount) {
        done(failCount ? new Error("Failed " + failCount + " tests.") : null);
    });
    server.start();
}

gulp.task('test', ['test:server'], function () {
    gulp.run('test:client');
});

gulp.task('test:client', ['scripts:client'], function (done) {
    runClientTests(true, done);
});

gulp.task('test:client:auto', ['watch'], function (done) {
    runClientTests(false, done);
});

gulp.task('test:server', ['scripts:server'], function () {
    return gulp.src(['!./src/server/**/*.spec.js', '!./src/server/**/*.mock.js', './src/server/**/*.js'])
        .pipe(istanbul({includeUntested: true}))
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(['./src/server/**/*.spec.js'])
                .pipe(jasmine({
                    verbose: true,
                    includeStackTrace: true
                }))
                .pipe(istanbul.writeReports({
                    dir: './coverage/Jasmine/',
                    reporters: ['html'],
                    reportOpts: {dir: './coverage/Jasmine/'}
                }));
        });

});

