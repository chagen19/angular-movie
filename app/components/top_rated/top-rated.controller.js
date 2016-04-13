(function () {
    'use strict';

    function topRatedCtrl($rootScope, theMovieDBService) {
        var vm = this;
        $rootScope.activeTabIndex = $rootScope.topRatedTabIndex;
        $rootScope.$watch('favorites', function (newValue) {
            vm.favorites = newValue;
        });
        theMovieDBService.getTopRated().then(function (data) {
            vm.results = data.results;
            vm.total = data.results.length;
            vm.total_results = data.total_results;
        });
    }

    angular.module('movieApp.topRated', [
            'movieApp.theMovieDB.services'
        ])
        .controller('TopRatedCtrl', topRatedCtrl);
})();