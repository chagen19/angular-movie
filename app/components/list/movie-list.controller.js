(function () {
    'use strict';

    function listController($stateParams, theMovieDBService) {
        var vm = this;
        vm.search = function () {
            theMovieDBService.getMovies($stateParams.movieName).then(function (data) {
                vm.results = data.results;
                vm.total = data.results.length;
                vm.total_results = data.total_results;
            });
        };
        vm.search();
    }

    angular.module('movieApp.movieList', [
        'movieApp.theMovieDB.services'
    ])
        .controller('ListCtrl', listController);
})();