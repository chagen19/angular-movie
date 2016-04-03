(function () {
    'use strict';

    function detailCtrl($rootScope, $scope, $timeout, $routeParams, theMovieDBService) {

        $scope.movieId = $routeParams.movieId
        $rootScope.movieId = $scope.movieId;
        theMovieDBService.getMovieDetails($scope.movieId).success(function (data) {
            $scope.movie = data;
        });

        $scope.reInitIso = function () {
            <!-- Fix to delay isotop until images are loaded -->
            $timeout(function () {
                console.log('Re-initiating isotope');
                $scope.$broadcast('isotope.onLayout');
            }, 700);
        };
    }

    angular.module('movieApp.movieDetail', [
        'ngRoute',
        'movieApp.theMovieDB.services',
        'movieApp.common'
    ]).controller('DetailCtrl', ['$rootScope', '$scope', '$timeout', '$routeParams', 'theMovieDBService', detailCtrl]);

})();