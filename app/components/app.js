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
            $get: ['$rootScope', '$location', 'theMovieDBService', 'favoriteService', function ($rootScope, $location, theMovieDBService, favoriteService) {

                return {
                    initialize: function () {
                        console.log("Initializing App");

                        theMovieDBService.getConfigurationData().success(function (data) {
                            $rootScope.url = data.images.base_url;
                        });
                        $rootScope.debug = debug;
                        $rootScope.tid = 0;
                        $rootScope.profileId = profileId;

                        $rootScope.activeTabIndex = 0;
                        $rootScope.searchTabIndex = 0;
                        $rootScope.favoritesTabIndex = 1;
                        $rootScope.nowPlayingTabIndex = 2;

                        function refreshFavorites() {
                            console.log("Refreshing Favorites");
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
                            console.log("Root Scopt Received favoriteAdded Event");
                            refreshFavorites();
                        });

                        $rootScope.$on('favoriteRemoved', function () {
                            console.log("Root Scopt Received favoriteRemoved Event");
                            refreshFavorites();
                        });

                        $rootScope.go = function (path) {
                            $location.path(path);
                        };
                        refreshFavorites();
                    }
                };
            }]
        };
    }

// Declare app level module which depends on filters, and services
    angular.module('movieApp', [
            'ngRoute',
            'ngAnimate',
            'movieApp.favorites',
            'movieApp.movieList',
            'movieApp.movieDetail',
            'movieApp.movieSearch',
            'movieApp.nowPlaying',
            'movieApp.common',
            'ui.bootstrap',
            'iso.directives'
        ])
        .config(['$routeProvider', 'initProvider', function ($routeProvider, initProvider) {
            $routeProvider.when('/details/:movieId', {
                templateUrl: 'components/detail/movie-detail.html',
                controller: 'DetailCtrl'
            }).when('/search/:movieName', {
                templateUrl: 'components/list/movie-list.html',
                controller: 'ListCtrl'
            }).when('/favorites', {
                templateUrl: 'components/list/movie-list.html',
                controller: 'FavoritesCtrl'
            }).when('/now-playing', {
                templateUrl: 'components/list/movie-list.html',
                controller: 'NowPlayingCtrl'
            }).otherwise({
                templateUrl: 'components/search/movie-search.html',
                controller: 'SearchCtrl'
            });
            initProvider.configure({profileId: 1, debug: false});
        }])
        .provider('init', initProvider)
        .run(function (init) {
            init.initialize();
        });
})();