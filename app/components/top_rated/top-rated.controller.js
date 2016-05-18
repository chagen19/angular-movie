(function () {
    'use strict';

    function topRatedCtrl($scope, TheMovieDBService) {
        var vm = this;
        TheMovieDBService.getTopRated().then(function (data) {
            vm.results = data.results;
            vm.total = data.results.length;
            vm.total_results = data.total_results;
        });
        $scope.$watch("movieList.filter", function(newValue) {
            if(newValue) {
                $scope.$broadcast('iso-init', {name: null, params: null});
            }
        });
    }

    angular.module('movieApp.topRated', [
            'movieApp.theMovieDB.services'
        ])
        .controller('TopRatedController', topRatedCtrl);
})();