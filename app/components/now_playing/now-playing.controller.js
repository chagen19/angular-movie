(function () {
    'use strict';

    function nowPlayingCtrl($rootScope, $scope, theMovieDBService) {
        $rootScope.activeTabIndex = $rootScope.nowPlayingTabIndex;
        $rootScope.$watch('favorites', function (newValue) {
            $scope.favorites = newValue;
        });
        theMovieDBService.getNowPlaying().success(function (data) {
            $scope.total = data.results.length;
            $scope.total_results = data.total_results;
            $scope.results = data.results;
        });

    }

    angular.module('movieApp.nowPlaying', [
            'movieApp.theMovieDB.services'
        ])
        .controller('NowPlayingCtrl', ['$rootScope', '$scope', 'theMovieDBService', nowPlayingCtrl]);
})();