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

        $scope.page = 'movie-list';
        $scope.search();
    }

    angular.module('movieApp.movieList', [
        'ngRoute',
        'movieApp.theMovieDB.services',
        'movieApp.favorites'
    ])
        .controller('ListCtrl', ['$rootScope', '$scope', '$routeParams', 'theMovieDBService', 'favoriteService',  listController]);
})();