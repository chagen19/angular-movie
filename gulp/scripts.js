'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();


gulp.task('scripts-reload', function () {
    return buildScripts()
        .pipe(browserSync.stream());
});

gulp.task('scripts:client', function () {
    return buildScripts();
});

gulp.task('scripts:server', function () {
    return buildServerScripts();
});

function buildScripts() {
    return gulp.src(['!' + path.join(conf.paths.client, 'bower_components/**/*'), path.join(conf.paths.client, '**/*.js')])
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.size());
}

function buildServerScripts() {
    return gulp.src(path.join(conf.paths.server, '**/*.js'))
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.size());
}

