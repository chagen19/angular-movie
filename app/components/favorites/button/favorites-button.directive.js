/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';
    function favoriteButton($log, favoriteService) {
        var link = function(scope) {

            scope.addFavorite = function (fav) {
                fav.source = 'themoviedb';
                favoriteService.addFavorite(fav, function (data) {
                    $log.debug("Emitting favoriteAdded Event");
                    scope.$emit('favoriteAdded', data);
                });
            };

            scope.removeFavorite = function (fav) {
                favoriteService.removeFavorite(scope.favorites[fav.id], function () {
                    $log.debug("Emitting favoriteRemoved Event", fav);
                    scope.$emit('favoriteRemoved', fav);
                });
            };
            
        };
        
        return {
            restrict: 'E',
            scope: {
                favorites: '=',
                movie: '='
            },
            templateUrl: 'components/favorites/button/favorite-button.html',
            link: link
        };
    }
    angular.module('movieApp.favorites')
        .directive('favoriteButton', favoriteButton);
})();