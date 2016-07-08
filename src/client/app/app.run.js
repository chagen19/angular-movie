(function () {
    function initProvider() {
        var profileId = 0;
        var debug = false;

        return {
            configure: function (settings) {
                profileId = settings.profileId;
                debug = settings.debug;
            },
            $get: function ($rootScope, $log, $location, TheMovieDBService, FavoriteService) {

                return {
                    initialize: function () {
                        $log.info("Initializing App");
                        $rootScope.debug = debug;
                        $rootScope.tid = 0;
                        $rootScope.profileId = profileId;

                        $rootScope.go = function (path) {
                            $location.path(path);
                        };
                        FavoriteService.getFavoritesStore();
                    }
                };
            }
        };
    }

    angular.module('movieApp')
        .config(function (InitProvider, TheMovieDBServiceProvider, $translateProvider) {
            InitProvider.configure({profileId: 1, debug: false});
            TheMovieDBServiceProvider.configure({cache: true});

            $translateProvider.translations('en', {
                "menu.item.upcoming": 'Upcoming',
                "menu.item.favorites": 'Favorites',
                "menu.item.In Theatres": 'In Theatres',
                "menu.item.toprated": 'Top Rated'

            });

            $translateProvider.translations('de', {
                "menu.item.upcoming": 'Bevorstehende',
                "menu.item.favorites": 'Favoriten',
                "menu.item.nowplaying": 'in Theater',
                "menu.item.toprated": 'Bestbewertet'
            });
            // Can override this to create a cutom function that determines the default language
            $translateProvider.determinePreferredLanguage();

        })
        .run(function (Init) {
            Init.initialize();
        })
        .filter('array', function() {
            return function(arrayLength) {
                arrayLength = Math.ceil(arrayLength);
                var arr = new Array(arrayLength), i = 0;
                for (; i < arrayLength; i++) {
                    arr[i] = i;
                }
                return arr;
            };
        })
        .provider('Init', initProvider)
        .value('TheMovieDBBaseUrl', 'https://api.themoviedb.org/3')
        .value('TheMovieDBApiKey', '013eff1b8075d646416de6ec45620619')
        .value('FavoriteServiceBaseUrl', 'http://localhost:3000');

})();