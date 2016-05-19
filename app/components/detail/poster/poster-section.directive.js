/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';
    var curIndex = 0;

    var generateIds = function (backdrops) {
        backdrops.map(function (backdrop) {
            backdrop.id = curIndex++;
            return backdrop;
        });
    };

    var posterController = function ($scope, TheMovieDBService) {
        var vm = this;
        vm.myInterval = 4000;
        vm.noWrapSlides = false;
        vm.maxSlides = 20;
        vm.active = 0;

        TheMovieDBService.getImageBaseUrl().then(function (imageBaseUrl) {
            vm.image_url = imageBaseUrl;
            return TheMovieDBService.getImages(vm.movieId);
        }).then(function (images) {
            generateIds(images.backdrops);
            vm.backdrops = images.backdrops;
        });
    };

    angular.module('movieApp.movieDetail')
        .component('posterSection', {
            templateUrl: 'components/detail/poster/poster-section.html',
            controller: posterController,
            controllerAs: 'poster',
            bindings: {
                movieId: '@'
            }
        });
})();