(function() {
    'use strict';

    function searchDirective() {

        return {
            restrict: 'E',
            templateUrl: 'views/movie-search.html'
        }
    }

    angular.module('movieApp.movieSearch', [
        'movieApp.movieSearch.directives'
    ]);

    angular.module('movieApp.movieSearch.directives', [])
        .directive('movieSearch', searchDirective);
})();