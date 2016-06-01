'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['build:partials', 'inject'], function () {
    browserSync.reload();
});

gulp.task('inject', ['scripts:client', 'scripts:server', 'styles'], function () {
    var injectStyles = gulp.src([
        path.join(conf.paths.client, '**/*.css'),
        path.join('!' + conf.paths.client, '/bower_components/**/*'),
        path.join('!' + conf.paths.tmp, '/serve/client/app/vendor.css')
    ], {read: false});

    var injectScripts = gulp.src([
        path.join(conf.paths.client, '/**/*.module.js'),
        path.join(conf.paths.client, '/**/*.js'),
        path.join('!' + conf.paths.client, '/bower_components/**/*'),
        path.join('!' + conf.paths.client, '/**/*.spec.js'),
        path.join('!' + conf.paths.client, '/**/*.mock.js')
    ])
        .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

    var injectOptions = {
        ignorePath: [conf.paths.client, path.join(conf.paths.tmp, '/serve')],
        addRootSlash: false
    };

    return gulp.src(path.join(conf.paths.client, '/*.html'))
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(wiredep(_.extend({}, conf.wiredep)))
        .pipe(gulp.dest(conf.paths.client));
});
