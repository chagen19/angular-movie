(function () {
    'use strict';

    function theMovieDBProvider() {
        var apiUrl = '';
        var apiKey = '';

        return {
            configure: function (settings) {
                apiKey = settings.apiKey;
                apiUrl = settings.apiUrl;
            },
            $get: function ($http) {
                console.log("Getting Provider Object");
                return {
                    getMovies: function (searchCriteria) {
                        var url = apiUrl + "/search/movie?api_key=" + apiKey + "&query=" + searchCriteria;
                        return $http.get(url);
                    },
                    getMovieDetails: function (movieId) {
                        var url = apiUrl + "/movie/" + movieId + "?api_key=" + apiKey;
                        console.log(url);
                        return $http.get(url);
                    },
                    getSimilarMovies: function (movieId) {
                        var url = apiUrl + "/movie/" + movieId + "/similar?api_key=" + apiKey;
                        return $http.get(url);
                    },
                    getCredits: function (movieId) {
                        var url = apiUrl + "/movie/" + movieId + "/credits?api_key=" + apiKey;
                        console.log(url);
                        return $http.get(url);
                    },
                    getConfigurationData: function () {
                        var url = apiUrl + "/configuration?api_key=" + apiKey;
                        return $http.get(url);
                    },
                    getMovieById: function (movieId) {
                        var url = apiUrl + "/movie/" + movieId + "?api_key=" + apiKey;
                        return $http.get(url);
                    },
                    getVideos: function (movieId) {
                        var url = apiUrl + "/movie/" + movieId + "/videos?api_key=" + apiKey;
                        return $http.get(url);
                    }
                }
            }
        }
    }

    angular.module('movieApp.theMovieDB.services', [])
        .config(function (theMovieDBServiceProvider) {
            console.log("Configuring Provider", theMovieDBServiceProvider);
            theMovieDBServiceProvider.configure({
                apiUrl: 'https://api.themoviedb.org/3',
                apiKey: '013eff1b8075d646416de6ec45620619'
            });
        })
        .provider('theMovieDBService', theMovieDBProvider());
    // .value('apiUrl', 'https://api.themoviedb.org/3')
    // .value('apiKey', '013eff1b8075d646416de6ec45620619');
})();