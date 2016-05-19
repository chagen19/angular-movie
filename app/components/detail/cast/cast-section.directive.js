/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';

    var castController = function (TheMovieDBService) {
        var vm = this;
        vm.maxDisplay = 18;
        TheMovieDBService.getImageBaseUrl().then(function (imageBaseUrl) {
            vm.image_url = imageBaseUrl;
            return TheMovieDBService.getCredits(vm.movieId);
        }).then(function (credits) {
            vm.cast = credits.cast;
            vm.total = (credits.cast.length > vm.maxDisplay) ? vm.maxDisplay : credits.cast.length;
        });
    };

    angular.module('movieApp.movieDetail')
        .component('castSection', {
            templateUrl: 'components/detail/cast/cast-section.html',
            controller: castController,
            controllerAs: 'credits',
            bindings: {
                movieId: '@'
            }
        });
})();