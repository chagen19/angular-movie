(function () {
    'use strict';

    function nowPlayingCtrl($scope, TheMovieDBService) {
        var vm = this;
        TheMovieDBService.getNowPlaying().then(function (data) {
            vm.results = data.results;
            vm.total = data.results.length;
            vm.total_results = data.total_results;
        });
    }

    angular.module('movieApp.nowPlaying', [
            'movieApp.theMovieDB.services'
        ])
        .controller('NowPlayingController', nowPlayingCtrl);
})();