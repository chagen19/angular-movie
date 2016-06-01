'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('build:partials', function () {
    return gulp.src([
        path.join(conf.paths.client, '/**/*.html')
    ])
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.angularTemplatecache('templateCacheHtml.js', {
            module: conf.moduleName
        }))
        .pipe(gulp.dest(conf.paths.client + '/partials/'));
});

gulp.task('build:html', ['build:partials', 'inject'], function () {
    var partialsInjectFile = gulp.src(path.join(conf.paths.client, '/partials/templateCacheHtml.js'), {read: false});
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: path.join(conf.paths.client, '/partials'),
        addRootSlash: false
    };

    var htmlFilter = $.filter('*.html', {restore: true});
    var jsFilter = $.filter('**/*.js', {restore: true});
    var cssFilter = $.filter('**/*.css', {restore: true});
    var assets;

    return gulp.src(path.join(conf.paths.client, '/*.html'))
        .pipe($.inject(partialsInjectFile, partialsInjectOptions))
        .pipe(assets = $.useref.assets())
        .pipe($.rev())
        .pipe(jsFilter)
        .pipe($.sourcemaps.init())
        .pipe($.ngAnnotate())
        .pipe($.uglify({preserveComments: $.uglifySaveLicense})).on('error', conf.errorHandler('Uglify'))
        .pipe($.sourcemaps.write('maps'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.sourcemaps.init())
        .pipe($.replace('src/client/bower_components/font-awesome/fonts/', 'src/client/fonts/'))
        .pipe($.minifyCss({processImport: false}))
        .pipe($.sourcemaps.write('maps'))
        .pipe(cssFilter.restore)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(htmlFilter)
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true,
            conditionals: true
        }))
        .pipe(htmlFilter.restore)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/client/')))
        .pipe($.size({title: path.join(conf.paths.dist, '/client/'), showFiles: true}));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('build:fonts', function () {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(path.join(conf.paths.dist, '/src/client/fonts/')));
});

gulp.task('build:other', function () {
    var fileFilter = $.filter(function (file) {
        return file.stat.isFile();
    });

    return gulp.src([
        path.join(conf.paths.client, '/**/*'),
        path.join('!' + conf.paths.client, '/**/*.{html,css,js,less}')
    ])
        .pipe(fileFilter)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/client')));
});

gulp.task('build:clean', function () {
    return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('build', ['build:html', 'build:fonts', 'build:other']);
