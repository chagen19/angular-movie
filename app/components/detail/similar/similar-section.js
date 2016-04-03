/**
 * Created by chagen on 4/3/16.
 */
(function () {
    function similarSection($rootScope, theMovieDBService) {
        return {
            restrict: 'E',
            scope: {
                movieId: '@',
                goTo: '&go',
                favorites: '='
            },
            templateUrl: 'components/list/movie-list.html',
            controller: function ($scope) {
                $scope.url = $rootScope.url;
                theMovieDBService.getSimilarMovies($scope.movieId).success(function (data) {
                    $scope.total = data.results.length;
                    $scope.total_results = data.total_results;
                    $scope.results = data.results;
                });
            },
            link: function(scope) {
                scope.go = function(value) {
                    // Need to pass an object that matches to the parameter name of passed in method
                    scope.goTo({path: value});
                };
            }
        };
    }

    angular.module('movieApp.movieDetail')
        .directive('similarSection', ['$rootScope','theMovieDBService', similarSection]);

})();