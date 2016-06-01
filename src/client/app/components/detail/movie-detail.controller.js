(function () {
    'use strict';

    var detailCtrl = function($scope, $log, $timeout, $stateParams, TheMovieDBService) {
        var vm = this;

        // So movie id is available immediately to gather the additional data
        var movieId = $stateParams.movieId;
        vm.movieId = movieId;
        TheMovieDBService.getMovieById(movieId).then(function (data) {
            vm.data = data;
        });


        vm.reInitIso = function () {
            // Fix to delay isotop until images are loaded
            $timeout(function () {
                $log.info('Re-initiating isotope');
                $scope.$broadcast('isotope.onLayout');
            }, 700);
        };
    }

    angular.module('movieApp.movieDetail', [
        'movieApp.theMovieDB.services',
        'movieApp.common'
    ]).controller('DetailCtrl', detailCtrl);

})();