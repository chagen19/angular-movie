(function() {
    'use strict';

    function searchDirective() {

        return {
            restrict: 'E',
            templateUrl: 'components/search/movie-search.html'
        }
    }

    angular.module('movieApp.movieSearch', [])
        .directive('movieSearch', searchDirective);
})();