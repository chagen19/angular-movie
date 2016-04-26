/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';
    function trailerSection($log, $sce, theMovieDBService) {

        function link(scope) {
            scope.setTrailer = function (index) {
                var trailer = scope.trailers[index];
                if (null !== trailer || null) {
                    $log.info("Setting trailer to index " + index);
                    scope.yturl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + trailer.key + "?enablejsapi=0");
                    scope.trailer = trailer;
                }
            };

            var getVideos = function () {
                theMovieDBService.getVideos(scope.movieId).then(function (data) {
                    scope.trailers = data.results.filter(function (video) {
                        return video.site === "YouTube" && video.key !== null;
                    });
                    scope.setTrailer(0);
                });
            };
            getVideos();

        }

        return {
            restrict: 'E',
            scope: {
                movieId: "@"
            },
            templateUrl: 'components/detail/trailers/trailers-section.html',
            link: link
        };
    }

    angular.module('movieApp.movieDetail')
        .directive('trailersSection', trailerSection);

})();