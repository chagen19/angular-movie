/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';
    function movieCardDirective($location) {
        return {
            restrict: 'E',
            scope: {
                movie: '=',
                favorites: '=',
                url: '@'
            },
            templateUrl: 'components/list/card/movie-card.html',
            link: function (scope) {
                scope.go = function (path) {
                    $location.path(path);
                };
            }
        };
    }

    angular.module('movieApp.movieList')
        .directive('movieCard', movieCardDirective);
})();