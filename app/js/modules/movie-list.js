(function () {
    'use strict';

    function listController($rootScope, $scope, $routeParams, theMovieDBService, favoriteService) {

        $scope.search = function () {
            theMovieDBService.getMovies($routeParams.movieName).success(function (data) {
                $scope.total = data.results.length;
                $scope.total_results = data.total_results;
                $scope.results = data.results;
            });
        };
        $scope.search();
    }

    function sortController($scope) {
        $scope.sortedAsc = function (column) {
            return $scope.orderProp == column && !$scope.sortReverse;
        };

        $scope.sortedDesc = function (column) {
            return $scope.orderProp == column && $scope.sortReverse;
        };

        $scope.setSortOrder = function (value) {
            var sortAscending = true;
            // If same sort value, use previous descending flag which should be the current ascending flag
            if (value == $scope.orderProp) {
                sortAscending = $scope.sortReverse;
            }
            console.log("Sorting by ", value, ", ascending ", sortAscending);
            $scope.orderProp = value;
            $scope.sortReverse = !sortAscending;
            $scope.$emit('iso-option', {sortBy: ['opt.' + value], sortAscending: sortAscending});
        };
        $scope.setSortOrder('title');
    }


    angular.module('movieApp.movieList', [
        'ngRoute',
        'movieApp.movieList.controllers'
    ]);

    angular.module('movieApp.movieList.controllers', [
            'movieApp.theMovieDB.services',
            'movieApp.favorites.services'
        ])
        .controller('ListCtrl', listController)
        .controller('SortController', sortController);
})();