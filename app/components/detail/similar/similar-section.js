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
            bindToController: true,
            templateUrl: 'components/list/movie-list.html',
            controller: function ($scope) {
                var vm = this;
                $scope.url = $rootScope.url;
                console.log("URL", vm.url);
                theMovieDBService.getSimilarMovies(vm.movieId).then(function (data) {
                    vm.results = data.results;
                    vm.total = data.results.length;
                    vm.total_results = data.total_results;
                });
            },
            controllerAs: 'movieList',
            link: function() {
                var vm = this;
                vm.go = function(value) {
                    // Need to pass an object that matches to the parameter name of passed in method
                    vm.goTo({path: value});
                };
            }
        };
    }

    angular.module('movieApp.movieDetail')
        .directive('similarSection', similarSection);

})();