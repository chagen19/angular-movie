/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';
    function favoriteButton($log, FavoriteService) {


        var link = function(scope) {
            var refreshFavorites = function() {
                scope.favorites = FavoriteService.getFavoritesStore();
            };

            scope.addFavorite = function (fav) {
                fav.source = 'themoviedb';
                FavoriteService.addFavorite(fav).then(function () {
                    refreshFavorites();
                    $log.debug("Emitting favoriteAdded Event");
                    scope.$emit('favoriteAdded', fav);
                });
            };

            scope.removeFavorite = function (fav) {
                FavoriteService.removeFavorite(scope.favorites[fav.id]).then(function () {
                    refreshFavorites();
                    $log.debug("Emitting favoriteRemoved Event" );
                    scope.$emit('favoriteRemoved', fav);
                });
            };

            refreshFavorites();
        };
        
        return {
            restrict: 'E',
            scope: {
                movie: '='
            },
            templateUrl: 'components/favorites/button/favorite-button.html',
            link: link
        };
    }
    angular.module('movieApp.favorites')
        .directive('favoriteButton', favoriteButton);
})();