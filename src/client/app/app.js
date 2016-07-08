(function () {
    'use strict';

// Declare app level module which depends on filters, and services
    angular.module('movieApp', [
            'ui.router',
            'restangular',
            'ngAnimate',
            'movieApp.favorites',
            'movieApp.movieList',
            'movieApp.movieDetail',
            'movieApp.movieSearch',
            'movieApp.nowPlaying',
            'movieApp.topRated',
            'movieApp.upcoming',
            'movieApp.common',
            'ui.bootstrap',
            'iso.directives',
            'pascalprecht.translate'
        ]);
})();
