'use strict';

/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/**
 * The name of your angular module for templateCache
 */

exports.moduleName = 'movieApp';

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
    client: 'src/client',
    app: 'src/client/app',
    server: 'src/server',
    src: 'src',
    dist: 'dist',
    tmp: '.tmp',
    e2e: 'e2e',
    openBrowserWindow: false
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
    directory: 'src/client/bower_components',
    exclude: ['bower_components/isotope/js/layout-modes',
        'bower_components/angular-isotope',
        'bower_components/isotope/js/layout-mode.js',
        'bower_components/outlayer',
        'bower_components/masonry',
        'bower_components/fizzy-ui-utils',
        'bower_components/isotope/js/item.js',
        'bower_components/ev-emitter/',
        'bower_components/eventie',
        'bower_components/desandro-matches-selector',
        'bower_components/get-size',
        'bower_components/get-style-property',
        'bower_components/doc-ready'
    ]
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function (title) {
    return function (err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};

