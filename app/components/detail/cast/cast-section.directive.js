/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';

    function castSection($rootScope, theMovieDBService) {

        var link = function (scope) {
            scope.maxDisplay = 18;
            scope.url = $rootScope.url;
            var getCast = function () {
                theMovieDBService.getCredits(scope.movieId).then(function (data) {
                    scope.cast = data.cast;
                    scope.total = (data.cast.length > scope.maxDisplay) ? scope.maxDisplay : data.cast.length;
                });
            };
            getCast();
        };

        return {
            restrict: 'E',
            scope: {
                movieId: '@'
            },
            link: link,
            templateUrl: 'components/detail/cast/cast-section.html'
        };
    }

    angular.module('movieApp.movieDetail')
        .directive('castSection', castSection);
})();