(function () {
    'use strict';

    function upcomingCtrl($rootScope, TheMovieDBService) {
        var vm = this;

        TheMovieDBService.getUpcoming().then(function (data) {
            vm.results = data.results;
            vm.total = data.results.length;
            vm.total_results = data.total_results;
        });
    }

    angular.module('movieApp.upcoming', [
            'movieApp.theMovieDB.services'
        ])
        .controller('UpcomingController', upcomingCtrl);
})();