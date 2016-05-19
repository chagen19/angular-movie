(function () {
    'use strict';

    function upcomingCtrl($rootScope, theMovieDBService) {
        var vm = this;

        $rootScope.activeTabIndex = $rootScope.upcomingTabIndex;
        $rootScope.$watch('favorites', function (newValue) {
            vm.favorites = newValue;
        });
        theMovieDBService.getUpcoming().then(function (data) {
            vm.results = data.results;
            vm.total = data.results.length;
            vm.total_results = data.total_results;
        });

    }

    angular.module('movieApp.upcoming', [
            'movieApp.theMovieDB.services'
        ])
        .controller('UpcomingCtrl', upcomingCtrl);
})();