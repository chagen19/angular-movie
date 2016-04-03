/**
 * Created by chagen on 4/3/16.
 */
(function () {
    function trailerSection($sce, theMovieDBService) {

        return {
            restrict: 'E',
            scope: {
                movieId: "@"
            },
            templateUrl: 'components/detail/trailers/trailers-section.html',
            controller: function ($scope, $element) {
                theMovieDBService.getVideos($scope.movieId).success(function (data) {
                    $scope.trailers  = data.results.filter(function(video) {
                        return video.site == "YouTube" && video.key != null
                    });
                    $scope.setTrailer(0);
                });

            },
            link: function (scope, element) {
                scope.setTrailer = function (index) {
                    var trailer = scope.trailers[index];
                    if (null != trailer || null) {
                        console.log("Setting trailer to index " + index);
                        scope.yturl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + trailer.key + "?enablejsapi=0");
                        scope.trailer = trailer;
                    }
                }
            }
        };
    }
    angular.module('movieApp.movieDetail')
        .directive('trailersSection', ['$sce', 'theMovieDBService', trailerSection]);

})();