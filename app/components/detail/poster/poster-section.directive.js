/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';
    var curIndex = 0;

    function posterSection(TheMovieDBService) {

        var link = function(scope) {
            TheMovieDBService.getImageBaseUrl().then(function (data) {
                scope.url = data;
            });
            scope.myInterval = 4000;
            scope.noWrapSlides = false;
            scope.maxSlides = 20;
            scope.active = 0;

            var getImages = function() {
                TheMovieDBService.getImages(scope.movieId).then(function (data) {
                    var backdrops = data.backdrops;
                    backdrops.map(function (backdrop) {
                        backdrop.id = curIndex++;
                        return backdrop;
                    });
                    scope.backdrops = backdrops;
                });
            };
            getImages();
        };

        return {
            restrict: 'E',
            scope: {
                movieId: '@'
            },
            templateUrl: 'components/detail/poster/poster-section.html',
            link: link
        };
    }

    angular.module('movieApp.movieDetail')
        .directive('posterSection',posterSection);
})();