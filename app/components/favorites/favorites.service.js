/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';

    function FavoriteService() {
        var opts = {};

        return {
            configure: function (options) {
                opts = options;
            },
            $get: function ($rootScope, $log, Restangular, FavoriteServiceBaseUrl) {
                var favoritesStore = [];
                var restAngular;
                var initRestangular = function () {
                    $log.info("Initializing FavoriteService with options", opts);
                    return Restangular.withConfig(function (Configurer) {
                        Configurer.setBaseUrl(FavoriteServiceBaseUrl);
                       
                        if (opts.cache)
                            Configurer.setDefaultHttpFields({cache: opts.cache});
                    });
                };
                
                var storeFavorites = function (favorites) {
                    favoritesStore = [];
                    for (var i = 0, len = favorites.length; i < len; i++) {
                        favoritesStore[favorites[i].id] = favorites[i];
                    }
                };

                var refreshFavorites = function () {
                    $log.info("Refreshing Favorites");
                    return getFavorites().then(function (data) {
                        storeFavorites(data.favorites);
                        $log.info("Successfully Refreshed Favorites");
                    });
                };

                var getFavorites = function () {
                    return restAngular.one('profile', $rootScope.profileId).get();
                };

                var restAngular = initRestangular();
                return {
                    getFavorites: function () {
                        return getFavorites();
                    },
                    getFavoritesStore: function () {
                        if (favoritesStore.length === 0) {
                            refreshFavorites();
                        }
                        return favoritesStore;
                    },
                    removeFavorite: function (fav) {
                        $log.info("Removing favorite from profile");
                        return restAngular.one('profile', '54166d47c0edc80000a81de4').one('favorite', fav._id).remove()
                            .then(function () {
                                return refreshFavorites();
                            });
                    },
                    addFavorite: function (fav) {
                        //fav.source = 'themoviedb';
                        $log.info("Adding favorite to profile");
                        return restAngular.one('profile', '54166d47c0edc80000a81de4').customPUT(fav)
                            .then(function () {
                                return refreshFavorites();
                            });
                    }
                }
            }
        };
    }

    angular.module('movieApp.favorites')
        .provider('FavoriteService', FavoriteService);
})();