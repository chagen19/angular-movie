(function () {
    'use strict';

    function favoritesCtrl($scope, $log, FavoriteService, TheMovieDBService) {
        var vm = this;
        var results = [];
        vm.results = [];
        $log.info("Retrieving Favorites");
        FavoriteService.getFavorites().then(function (data) {
            var favorites = data.favorites;
            vm.total = favorites.length;
            angular.forEach(favorites, function (favorite, index) {
                TheMovieDBService.getMovieById(favorite.id).then(function (data) {
                    results.push(data);
                    // Set results after they all have been loaded
                    if (index === vm.total - 1) {
                        vm.results = results;
                    }
                });
            });
        });

        $scope.$watch("movieList.filter", function(newValue) {
            if(newValue) {
                $scope.$broadcast('iso-init', {name: null, params: null});
            }
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
    }
    angular.module('movieApp.favorites', [
            'movieApp.theMovieDB.services'
        ])
        .controller('FavoritesController', favoritesCtrl);
})();