/**
 * Created by chagen on 4/13/16.
 */
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    wiredep = require('wiredep').stream;


// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
    return gulp.src('app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['jshint']);
});


<!-- Inject bower dependencies into index.html -->
gulp.task('bower', function () {
    gulp.src('assets/index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(gulp.dest('app/'));
});


gulp.task('build-js', function() {
    return gulp.src('**')
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(ngAnnotate())
        //only uglify if gulp is ran with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/js'));
});