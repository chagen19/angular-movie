/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';
    var curIndex = 0;

    function posterSection($rootScope, theMovieDBService) {
        return {
            restrict: 'E',
            scope: {
                movieId: '@'
            },
            templateUrl: 'components/detail/poster/poster-section.html',
            link: function(scope) {
                scope.url = $rootScope.url;
                scope.myInterval = 4000;
                scope.noWrapSlides = false;
                scope.maxSlides = 20;
                scope.active = 0;

                theMovieDBService.getImages(scope.movieId).then(function (data) {
                   var backdrops = data.backdrops;
                    backdrops.map(function (backdrop) {
                        backdrop.id = curIndex++;
                        return backdrop;
                    });
                    scope.backdrops = backdrops;
                });
            }
        };
    }

    angular.module('movieApp.movieDetail')
        .directive('posterSection',posterSection);
})();