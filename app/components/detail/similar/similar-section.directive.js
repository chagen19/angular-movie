/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';

    var similarController = function ($scope, $log, TheMovieDBService) {
        var vm = this;

        TheMovieDBService.getSimilarMovies(vm.movieId).then(function (movies) {
            vm.results = movies.results;
            vm.total = movies.results.length;
            vm.total_results = movies.total_results;
        });
    };

    angular.module('movieApp.movieDetail')
        .component('similarSection', {
            templateUrl: 'components/list/movie-list.html',
            controller: similarController,
            controllerAs: 'movieList',
            bindings: {
                movieId: '@'
            }
        });
})();