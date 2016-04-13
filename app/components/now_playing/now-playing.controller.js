(function () {
    'use strict';

    function nowPlayingCtrl($rootScope, theMovieDBService) {
        var vm = this;

        $rootScope.activeTabIndex = $rootScope.nowPlayingTabIndex;
        $rootScope.$watch('favorites', function (newValue) {
            vm.favorites = newValue;
        });
        theMovieDBService.getNowPlaying().then(function (data) {
            vm.results = data.results;
            vm.total = data.results.length;
            vm.total_results = data.total_results;
        });

    }

    angular.module('movieApp.nowPlaying', [
            'movieApp.theMovieDB.services'
        ])
        .controller('NowPlayingCtrl', nowPlayingCtrl);
})();