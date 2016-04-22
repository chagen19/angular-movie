/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';
    function favoriteButton(favoriteService) {
        return {
            restrict: 'E',
            scope: {
                favorites: '=',
                movie: '='
            },
            templateUrl: 'components/favorites/button/favorite-button.html',
            controller: function ($scope) {
                $scope.addFavorite = function (fav) {
                    console.log("FAV", $scope.favorites);
                    fav.source = 'themoviedb';
                    console.log("Adding Favorite");
                    favoriteService.addFavorite(fav, function (data) {
                        console.log("Emitting favoriteAdded Event");
                        $scope.$emit('favoriteAdded', data);
                    });
                };

                $scope.removeFavorite = function (fav) {
                    console.log("Removing Favorite");
                    favoriteService.removeFavorite($scope.favorites[fav.id], function () {
                        console.log("Emitting favoriteRemoved Event", fav);
                        $scope.$emit('favoriteRemoved', fav);
                    });
                };


            }
        };
    }
    angular.module('movieApp.favorites')
        .directive('favoriteButton', favoriteButton);
})();