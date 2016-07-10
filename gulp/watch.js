'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
    return event.type === 'changed';
}

gulp.task('watch', ['build:partials', 'inject'], function () {

    gulp.watch([
        'bower.json',
        path.join(conf.paths.client, '**/*.html'),
        path.join('!' + conf.paths.client, '/bower_components/**/*')
    ], ['build:partials', 'inject-reload']);

    gulp.watch([
        path.join(conf.paths.client, '/**/*.less'),
        path.join('!' + conf.paths.client, '/bower_components/**/*')
    ], function (event) {
        if (isOnlyChange(event)) {
            gulp.start('styles-reload');
        } else {
            gulp.start('inject-reload');
        }
    });

    gulp.watch([
        path.join(conf.paths.client, '/**/*.js'),
        path.join('!' + conf.paths.client, '/**/*.spec.js'),
        path.join('!' + conf.paths.client, '/bower_components/**/*')
    ], function (event) {
        if (isOnlyChange(event)) {
            gulp.start('scripts-reload');
        } else {
            gulp.start('inject-reload');
        }
    });

    gulp.watch(path.join(conf.paths.server, '/**/*.js'), function () {
        gulp.start('scripts:server');
    });

    gulp.watch([
        path.join(conf.paths.client, '/**/*.html'),
        path.join('!' + conf.paths.client, '/bower_components/**/*')
    ], function (event) {
        browserSync.reload(event.path);
    });
});

