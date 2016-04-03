(function () {
    'use strict';

    function favoritesCtrl($rootScope, $scope, favoriteService, theMovieDBService) {
        var results = [];
        $scope.results = [];
        console.log("Retrieving Favorites");
        favoriteService.getFavorites().success(function (data) {
            var favs = data.favorites;
            $rootScope.storeFavoritesInScope(favs);
            $scope.total = favs.length;
            angular.forEach(favs, function (fav, index) {
                theMovieDBService.getMovieById(fav.id).success(function (data) {
                    results.push(data);
                    // Set results after they all have been loaded
                    if (index == $scope.total - 1) {
                        $scope.results = results;
                    }
                });
            });

            // Remove movie from list and refresh isotope
            $scope.$on('favoriteRemoved', function (event, fav) {
                console.log("Received favoriteRemoved Event", fav.id);
                var removeIndex = results.map(function (item) {
                    return item.id;
                }).indexOf(fav.id);
                removeIndex > -1 && results.splice(removeIndex, 1);
                $scope.$broadcast('iso-init', {name: null, params: null});
            });
            $scope.page = "Favorites";
        });
    }
    angular.module('movieApp.favorites', [
            'movieApp.theMovieDB.services'
        ])
        .controller('FavoritesCtrl', ['$rootScope', '$scope', 'favoriteService', 'theMovieDBService', favoritesCtrl]);
})();