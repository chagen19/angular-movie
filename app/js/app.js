(function () {
    'use strict';

    function initProvider() {
        var profileId = 0;
        var debug = false;

        return {
            configure: function (settings) {
                profileId = settings.profileId;
                debug = settings.debug;
            },
            $get: function ($rootScope, $location, theMovieDBService, favoriteService) {

                return {
                    initialize: function () {
                        console.log("Initializing App");

                        theMovieDBService.getConfigurationData().success(function (data) {
                            $rootScope.url = data.images.base_url;
                        });
                        $rootScope.debug = debug;
                        $rootScope.tid = 0;
                        $rootScope.profileId = profileId;
                        $rootScope.favorites = {};

                        refreshFavorites();

                        function refreshFavorites() {
                            console.log("Refreshing Favorites");
                            favoriteService.getFavorites().success(function (data) {
                                $rootScope.favorites = {};
                                var favs = data.favorites;
                                for (var i = 0, len = favs.length; i < len; i++) {
                                    $rootScope.favorites[favs[i].id] = favs[i];
                                }
                            });
                        };
                        $rootScope.refreshFavorites = function () {
                            refreshFavorites();
                        };
                        $rootScope.go = function (path) {
                            $location.path(path);
                        };
                    }
                };
            }
        };
    }

// Declare app level module which depends on filters, and services
    angular.module('movieApp', [
            'ngRoute',
            'movieApp.favorites',
            'movieApp.movieList',
            'movieApp.movieDetail',
            'movieApp.movieSearch',
            'ui.bootstrap',
            'iso.directives',
        ])
        .config(function ($routeProvider, initProvider) {
            $routeProvider.when('/details/:movieId', {
                templateUrl: 'views/movie-detail.html',
                controller: 'DetailCtrl'
            }).when('/search/:movieName', {
                templateUrl: 'views/movie-list.html',
                controller: 'ListCtrl'
            }).when('/favorites', {
                templateUrl: 'views/movie-list.html',
                controller: 'FavoritesCtrl'
            }).otherwise({
                redirectTo: '/'
            });

            initProvider.configure({profileId: 1, debug: false});

        })
        .provider('init', initProvider())
        .run(function (init) {
            init.initialize();
        });
})();