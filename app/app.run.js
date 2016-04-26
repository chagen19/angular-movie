(function () {
    function initProvider() {
        var profileId = 0;
        var debug = false;

        return {
            configure: function (settings) {
                profileId = settings.profileId;
                debug = settings.debug;
            },
            $get: function ($rootScope, $log, $location, theMovieDBService, favoriteService) {

                return {
                    initialize: function () {
                        $log.info("Initializing App");

                        theMovieDBService.getConfigurationData().then(function (data) {
                            $rootScope.url = data.images.base_url;
                        });
                        $rootScope.debug = debug;
                        $rootScope.tid = 0;
                        $rootScope.profileId = profileId;

                        function refreshFavorites() {
                            $log.info("Refreshing Favorites");
                            favoriteService.getFavorites().success(function (data) {
                                storeFavoritesInScope(data.favorites);
                            });
                        }

                        function storeFavoritesInScope(favs) {
                            $rootScope.favorites = {};
                            for (var i = 0, len = favs.length; i < len; i++) {
                                $rootScope.favorites[favs[i].id] = favs[i];
                            }
                        }

                        $rootScope.storeFavoritesInScope = storeFavoritesInScope;
                        $rootScope.$on('favoriteAdded', function () {
                            $log.info("Root Scope Received favoriteAdded Event");
                            refreshFavorites();
                        });

                        $rootScope.$on('favoriteRemoved', function () {
                            $log.info("Root Scope Received favoriteRemoved Event");
                            refreshFavorites();
                        });

                        $rootScope.go = function (path) {
                            $location.path(path);
                        };
                        refreshFavorites();
                    }
                };
            }
        };
    }

    angular.module('movieApp')
        .config(function (initProvider) {
            initProvider.configure({profileId: 1, debug: false});
        })
        .run(function (init) {
            init.initialize();
        })
        .provider('init', initProvider);
})();