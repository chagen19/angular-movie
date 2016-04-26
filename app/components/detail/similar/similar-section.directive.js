/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';
    function similarSection($rootScope, $log, theMovieDBService) {

        var similarController = function ($scope) {
            var vm = this;
            $scope.url = $rootScope.url;
            vm.getSimilarMovies = function () {
                theMovieDBService.getSimilarMovies(vm.movieId).then(function (data) {
                    vm.results = data.results;
                    vm.total = data.results.length;
                    vm.total_results = data.total_results;
                });
            };
        };

        return {
            restrict: 'E',
            scope: {
                favorites: '='
            },
            bindToController: {
                movieId: '@'
            },
            controller: similarController,
            controllerAs: 'movieList',
            link: function (scope) {
                scope.movieList.getSimilarMovies();
            },
            templateUrl: 'components/list/movie-list.html',
        };
    }

    angular.module('movieApp.movieDetail')
        .directive('similarSection', similarSection);

})();