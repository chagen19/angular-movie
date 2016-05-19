/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';

    var filterVideos = function (videos) {
        return videos.filter(function (video) {
            return video.site === "YouTube" && video.key !== null;
        });
    };
    var trailerController = function ($scope, $log, $sce, TheMovieDBService) {
        var vm = this;

        vm.setTrailer = function (index) {
            var trailer = vm.trailers[index];
            if (null !== trailer || null) {
                $log.info("Setting trailer to index " + index);
                vm.yturl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + trailer.key + "?enablejsapi=0");
                vm.trailer = trailer;
            }
        };

        TheMovieDBService.getVideos(vm.movieId).then(function (videos) {
            vm.trailers = filterVideos(videos.results)
            vm.setTrailer(0);
        });
    };


    angular.module('movieApp.movieDetail')
        .component('trailersSection', {
            templateUrl: 'components/detail/trailers/trailers-section.html',
            controller: trailerController,
            controllerAs: 'video',
            bindings: {
                movieId: '@'
            }
        });
})();