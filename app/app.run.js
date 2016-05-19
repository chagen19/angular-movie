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
        .config(function (InitProvider, TheMovieDBServiceProvider) {
            InitProvider.configure({profileId: 1, debug: false});
            TheMovieDBServiceProvider.configure({cache: true});
        })
        .run(function (Init) {
            Init.initialize();
        })
        .provider('Init', initProvider)
        .value('TheMovieDBBaseUrl', 'https://api.themoviedb.org/3')
        .value('TheMovieDBApiKey', '013eff1b8075d646416de6ec45620619')
        .value('FavoriteServiceBaseUrl', 'http://localhost:3000');

})();