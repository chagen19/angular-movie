(function () {
    'use strict';

    function favoritesCtrl($rootScope, $scope, $timeout, favoriteService, theMovieDBService) {
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

    function favoriteService($rootScope, $http) {

        var factory = {};
        factory.getFavorites = function () {
            return $http.get("http://localhost:3000/profile/" + $rootScope.profileId);
        };

        factory.removeFavorite = function (fav, cb) {
            console.log("Removing favorite from profile ", fav);
            $http.delete("http://localhost:3000/profile/54166d47c0edc80000a81de4/favorite/" + fav._id).success(cb);
        };
        factory.addFavorite = function (fav, cb) {
            //fav.source = 'themoviedb';
            $http.put("http://localhost:3000/profile/54166d47c0edc80000a81de4", fav).success(cb);
        };
        return factory;
    }

    angular.module('movieApp.favorites', [
        'ngRoute',
        'movieApp.favorites.controllers'
    ]);

    angular.module('movieApp.favorites.controllers', [
        'movieApp.favorites.services',
        'movieApp.theMovieDB.services',
        'ngAnimate'
    ]).controller('FavoritesCtrl', favoritesCtrl);

    angular.module('movieApp.favorites.services', [])
        .factory('favoriteService', favoriteService);
})();