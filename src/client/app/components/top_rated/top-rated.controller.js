(function () {
    'use strict';

    function topRatedCtrl(TheMovieDBService) {
        var vm = this;
        TheMovieDBService.getTopRated().then(function (data) {
            vm.results = data.results;
            vm.total = data.results.length;
            vm.total_results = data.total_results;
        });
    }

    angular.module('movieApp.topRated', [
            'movieApp.theMovieDB.services'
        ])
        .controller('TopRatedController', topRatedCtrl);
})();