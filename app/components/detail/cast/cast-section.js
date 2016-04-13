/**
 * Created by chagen on 4/3/16.
 */
(function () {
    function castSection($rootScope, theMovieDBService) {
        return {
            restrict: 'E',
            scope: {
                movieId: '@'
            },
            templateUrl: 'components/detail/cast/cast-section.html',
            controller: function ($scope) {
                console.log("MovieId IS" + $scope.movieId);
                $scope.url = $rootScope.url;
                theMovieDBService.getCredits($scope.movieId).then(function (data) {
                    $scope.cast = data.cast;
                    $scope.maxDisplay = 18;
                    $scope.total = (data.cast.length > $scope.maxDisplay) ? $scope.maxDisplay : data.cast.length;
                });
            }
        };
    }

    angular.module('movieApp.movieDetail')
        .directive('castSection', castSection);
})();