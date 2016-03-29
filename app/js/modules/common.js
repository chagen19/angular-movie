(function () {
    'use strict';


    function favoriteButton(favoriteService) {


        return {
            restrict: 'E',
            scope: {
                favorites: '=',
                result: '='
            },
            templateUrl: 'views/components/favorite-button.html',
            link: function (scope) {
                scope.addFavorite = function (fav) {
                    fav.source = 'themoviedb';
                    console.log("Adding Favorite");
                    favoriteService.addFavorite(fav, function (data) {
                        console.log("Emitting favoriteAdded Event");
                        scope.$emit('favoriteAdded', data);
                    });
                };

                scope.removeFavorite = function (fav) {
                    console.log("Removing Favorite");
                    favoriteService.removeFavorite(scope.favorites[fav.id], function (data) {
                        console.log("Emitting favoriteRemoved Event", fav);
                        scope.$emit('favoriteRemoved', fav);
                    });
                };


            }
        };
    }


    function itemsLoadedDirective($timeout) {
        function link(scope, element, attrs) {
            scope.$watch(attrs.currentItem, function (value) {
                if (value == attrs.totalResults - 1) {
                    <!-- Fix to delay isotop until images are loaded -->
                    $timeout(function () {
                        console.log('Re-initiating isotope for element', element);
                        scope.$emit('isotope.onLayout');
                        //scope.$emit('iso-init', {name: null, params: null});
                    }, 700);
                }
            });
        }

        return {
            link: link
        };
    }

    angular.module('movieApp.common', [
        'movieApp.common.directives'
    ]);

    angular.module('movieApp.common.directives', [
            'movieApp.favorites.services'
        ])
        .directive('favoriteButton', favoriteButton)
        .directive('currentItem', itemsLoadedDirective);
})();
