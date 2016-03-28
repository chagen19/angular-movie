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

        $scope.addFavorite = function (fav) {
            fav.source = 'themoviedb';
            favoriteService.addFavorite(fav, function () {
                $rootScope.refreshFavorites();
            });
        };
        $scope.removeFavorite = function (movie) {
            var fav = $rootScope.favorites[movie.id];
            favoriteService.removeFavorite(fav, function () {
                $rootScope.refreshFavorites();
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

    function itemsLoadedDirective($timeout) {
        function link(scope, element, attrs) {
            scope.$watch(attrs.currentItem, function (value) {
                if (value == attrs.totalResults - 1) {
                    <!-- Fix to delay isotop until images are loaded -->
                    $timeout(function () {
                        console.log('Re-initiating isotope for element', element);
                        scope.$emit('isotope.onLayout');
                        //scope.$emit('iso-init', {name: null, params: null});
                    }, 700);
                }
            });
        }

        return {
            link: link
        };
    }

    angular.module('movieApp.movieList', [
        'ngRoute',
        'movieApp.movieList.controllers'
    ]);

    angular.module('movieApp.movieList.controllers', [
            'movieApp.theMovieDB.services',
            'movieApp.favorites.services',
            'movieApp.movieList.directives'
        ])
        .controller('ListCtrl', listController)
        .controller('SortController', sortController);

    angular.module('movieApp.movieList.directives', [])
        .directive('currentItem', itemsLoadedDirective);
})();