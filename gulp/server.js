'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var nodemon = require('nodemon');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    nodemon({
        script: path.join(baseDir, '/server/core-server.js'),
        ext: 'js json',
        ignore: [
            path.join(baseDir, './../data/**/*'),
            path.join(baseDir, '/client/**/*'),
            path.join(baseDir, './../gulp/**/*'),
            path.join(baseDir, './../node_modules/**/*'),
            path.join(baseDir, './../e2e/**/*'),
            path.join(baseDir, './../dist/**/*'),
            path.join(baseDir, '/server/jasmine-mocks/**/*')
        ]
    });

    nodemon.on('start', function () {
        console.log('Starting nodemon server');
    }).on('readable', function () {
        this.stdout.pipe(process.stdout);
        this.stderr.pipe(process.stderr);
    }).on('quit', function () {
        console.log('nodemon has stopped');
        process.exit(0);
    }).on('restart', function (files) {
        console.log('nodemon restarted due to: ', files);
    });

    browserSync.instance = browserSync.init({
        startPath: '/',
        proxy: 'localhost:8000',
        browser: browser,
        open: conf.openBrowserWindow
    });
}

browserSync.use(browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch'], function () {
    browserSyncInit(conf.paths.src);
});

gulp.task('serve:dist', ['build'], function () {
    browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['build:other', 'inject'], function () {
    browserSyncInit(conf.paths.src, 'phantomJs');
});

gulp.task('serve:e2e-dist', ['build'], function () {
    browserSyncInit(conf.paths.dist, 'phantomJS');
});
