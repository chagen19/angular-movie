(function () {
    'use strict';

    function theMovieDBFactory(Restangular) {
        var restAngular =
            Restangular.withConfig(function (Configurer) {
                Configurer.setBaseUrl('https://api.themoviedb.org/3');
                Configurer.setDefaultRequestParams({
                    api_key: '013eff1b8075d646416de6ec45620619'
                });
                Configurer.setDefaultHttpFields({cache: true});
            });
        var _movieService = restAngular.all('movie');

        function getContent(movieId, typeOfContent) {
            return restAngular.one('movie', movieId).one(typeOfContent).get();
        }

        return {
            getMovies: function (searchCriteria) {
                return restAngular.all('search').get('movie', {query: searchCriteria});
            },
            getConfigurationData: function () {
                return restAngular.one('configuration').get();
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
        };
    }

    angular.module('movieApp.theMovieDB.services', ['restangular'])
        .factory('theMovieDBService', theMovieDBFactory);
    // .value('apiUrl', 'https://api.themoviedb.org/3')
    // .value('apiKey', '013eff1b8075d646416de6ec45620619');
})();