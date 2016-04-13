(function () {
    'use strict';

    function searchController($rootScope) {
        $rootScope.activeTabIndex = $rootScope.searchTabIndex;
    }

    angular.module('movieApp.movieSearch', [])
        .controller('SearchCtrl', searchController);
})();