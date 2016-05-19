(function () {
    'use strict';

    function searchController($location) {
        var vm = this;
        vm.go = function (path) {
            $location.path(path);
        };
    }

    angular.module('movieApp.movieSearch', [])
        .component('movieSearch', {
            templateUrl: 'components/search/movie-search.html',
            controller: searchController,
            controllerAs: 'search'
        });
})();