'use strict';

angular.module('movieApp.theMovieDB', [
	'ngRoute',
	'movieApp.theMovieDB.controllers'
])
.config(['$routeProvider', function($routeProvider){

	$routeProvider.when('/details/:movieId', {
			templateUrl: 'views/movie-details.html',
			controller: 'DetailCtrl'
		});
}]);

angular.module('movieApp.theMovieDB.controllers', [
	'movieApp.theMovieDB.services',
	'movieApp.favorites.services',
	'movieApp.shared.directives',
	'ngAnimate'
]);

angular.module('movieApp.theMovieDB.services', [
])
.factory('theMovieDBService', ['$http', '$routeParams', 'apiUrl', 'apiKey', function($http, $routeParams, apiUrl, apiKey) {
	return {
		getMovies : function() {
			var url = apiUrl + "/search/movie?api_key=" + apiKey + "&query=" + $routeParams.movieName;
			return $http.get(url);
		},
		getMovieDetails : function() {
			var url = apiUrl + "/movie/" + $routeParams.movieId + "?api_key=" + apiKey + "&append_to_response=trailers";
			console.log(url);
			return $http.get(url);
		},
		getSimilarMovies : function() {
			var url = apiUrl + "/movie/" + $routeParams.movieId + "/similar?api_key=" + apiKey;
			return $http.get(url);
		},
		getCredits : function() {
			var url = apiUrl + "/movie/" + $routeParams.movieId + "/credits?api_key=" + apiKey;
			console.log(url);
			return $http.get(url);
		},
		getConfigurationData : function() {
			var url = apiUrl + "/configuration?api_key=" + apiKey;
			return $http.get(url);
		},
		getMovieById : function(movieId) {
			var url = apiUrl + "/movie/" + movieId + "?api_key=" + apiKey;
			return $http.get(url);
		},
	}
}])
.value('apiUrl', 'https://api.themoviedb.org/3')
.value('apiKey', '013eff1b8075d646416de6ec45620619');
