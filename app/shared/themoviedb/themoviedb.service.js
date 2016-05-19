(function () {
    'use strict';

    function TheMovieDBServiceProvider() {
        var opts = {};

        return {
            configure: function (options) {
                opts = options;
            },
            $get: function ($log, $q, Restangular, TheMovieDBBaseUrl, TheMovieDBApiKey) {
                var configurationData;
                var initRestangular = function () {
                    $log.info("Initializing TheMovieDBService with options", opts);
                    return Restangular.withConfig(function (Configurer) {
                        Configurer.setBaseUrl(TheMovieDBBaseUrl);
                        Configurer.setDefaultRequestParams({
                            api_key: TheMovieDBApiKey
                        });
                        if (opts.cache)
                            Configurer.setDefaultHttpFields({cache: opts.cache});
                    });
                };

                var getConfigurationData = function() {
                      return restAngular.one('configuration').get();

                };
                var getContent = function (movieId, typeOfContent) {
                    return restAngular.one('movie', movieId).one(typeOfContent).get();
                };

                var restAngular = initRestangular();
                var _movieService = restAngular.all('movie');

                return {
                    getMovies: function (searchCriteria) {
                        return restAngular.all('search').get('movie', {query: searchCriteria});
                    },
                    getImageBaseUrl: function () {
                        var deferred = $q.defer();
                       getConfigurationData().then(function(data) {
                            deferred.resolve(data.images.base_url);
                        });
                        return deferred.promise;
                    },
                    getMovieById: function (movieId) {
                        return _movieService.get(movieId);
                    },
                    getNowPlaying: function () {
                        return _movieService.get('now_playing');
                    },
                    getTopRated: function () {
                        return _movieService.get('top_rated');
                    },
                    getUpcoming: function () {
                        return _movieService.get('upcoming');
                    },
                    getImages: function (movieId) {
                        return getContent(movieId, 'images');
                    },
                    getVideos: function (movieId) {
                        return getContent(movieId, 'videos');
                    },
                    getCredits: function (movieId) {
                        return getContent(movieId, 'credits');
                    },
                    getSimilarMovies: function (movieId) {
                        return getContent(movieId, 'similar');
                    }
                }
            }
        };
    }

    angular.module('movieApp.theMovieDB.services', ['restangular'])
        .provider('TheMovieDBService', TheMovieDBServiceProvider);
})();