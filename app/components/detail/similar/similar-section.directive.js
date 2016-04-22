/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';
    function similarSection($rootScope, theMovieDBService) {

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
            vm.go = function (value) {
                // Need to pass an object that matches to the parameter name of passed in method
                vm.goTo({path: value});
            };
        };

        return {
            restrict: 'E',
            scope: {},
            bindToController: {
                movieId: '@',
                goTo: '&go',
                favorites: '='
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