(function () {
    'use strict';

    function favoritesCtrl($rootScope, $scope, $log, favoriteService, theMovieDBService) {
        var vm = this;
        $rootScope.activeTabIndex = $rootScope.favoritesTabIndex;
        var results = [];
        vm.results = [];
        $log.info("Retrieving Favorites");
        favoriteService.getFavorites().success(function (data) {
            var favs = data.favorites;
            $rootScope.storeFavoritesInScope(favs);
            vm.total = favs.length;
            angular.forEach(favs, function (fav, index) {
                theMovieDBService.getMovieById(fav.id).then(function (data) {
                    results.push(data);
                    // Set results after they all have been loaded
                    if (index === vm.total - 1) {
                        vm.results = results;
                    }
                });
            });

            // Remove movie from list and refresh isotope
            $scope.$on('favoriteRemoved', function (event, fav) {
                $log.debug("Received favoriteRemoved Event", fav.id);
                var removeIndex = results.map(function (item) {
                    return item.id;
                }).indexOf(fav.id);
                removeIndex > -1 && results.splice(removeIndex, 1);
                $scope.$broadcast('iso-init', {name: null, params: null});
            });
            vm.page = "Favorites";
        });
    }
    angular.module('movieApp.favorites', [
            'movieApp.theMovieDB.services'
        ])
        .controller('FavoritesCtrl', favoritesCtrl);
})();