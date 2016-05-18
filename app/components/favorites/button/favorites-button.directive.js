/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';
    
    var buttonController = function ($scope, $log, FavoriteService) {
        var vm = this;
        vm.favorites = {};
        var refreshFavorites = function() {
            vm.favorites = FavoriteService.getFavoritesStore();
        };

        vm.isFavorite  = function() {
            return vm.favorites[vm.movie.id];
        };

        vm.addFavorite = function (fav) {
            fav.source = 'themoviedb';
            FavoriteService.addFavorite(fav).then(function () {
                refreshFavorites();
                $log.debug("Emitting favoriteAdded Event");
                $scope.$emit('favoriteAdded', fav);
            });
        };

        vm.removeFavorite = function (fav) {
            FavoriteService.removeFavorite(vm.favorites[fav.id]).then(function () {
                refreshFavorites();
                $log.debug("Emitting favoriteRemoved Event");
                $scope.$emit('favoriteRemoved', fav);
            });
        };

        refreshFavorites();
    };
    
    angular.module('movieApp.favorites')
        .component('favoriteButton', {
            templateUrl: 'components/favorites/button/favorite-button.html',
            controller: buttonController,
            controllerAs: 'favoriteButton',
            bindings: {
                movie: '='
            }
        });
})();