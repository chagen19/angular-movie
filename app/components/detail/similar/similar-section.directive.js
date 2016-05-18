/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';
    function similarSection($log, TheMovieDBService) {

        var similarController = function ($scope) {
            var vm = this;
            vm.getSimilarMovies = function () {
                TheMovieDBService.getSimilarMovies(vm.movieId).then(function (data) {
                    vm.results = data.results;
                    vm.total = data.results.length;
                    vm.total_results = data.total_results;
                });
            };
        };

        return {
            restrict: 'E',
            scope: {},
            bindToController: {
                movieId: '@'
            },
            controller: similarController,
            controllerAs: 'movieList',
            link: function (scope) {
                scope.movieList.getSimilarMovies();
            },
            templateUrl: 'components/list/movie-list.html'
        };
    }

    angular.module('movieApp.movieDetail')
        .directive('similarSection', similarSection);

})();