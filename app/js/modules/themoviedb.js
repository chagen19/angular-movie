'use strict';

angular.module('movieApp.theMovieDB', [
	'ngRoute',
	'movieApp.theMovieDB.controllers'
])
.config(['$routeProvider', function($routeProvider){
	 $routeProvider.when('/search/:movieName', {
      templateUrl: 'views/movies.html',
      controller: 'SearchCtrl'
    });
	$routeProvider.when('/details/:movieId', {
			templateUrl: 'views/movieDetail.html',
			controller: 'DetailCtrl'
		});
}]);

angular.module('movieApp.theMovieDB.controllers', [
	'movieApp.theMovieDB.services',
	'movieApp.favorites.services',
	'movieApp.shared.directives',
	'ngAnimate',
  'iso.directives'
])
.controller('SearchCtrl', ['$rootScope', '$scope', '$timeout', 'theMovieDBService', 'favoriteService',
	function($rootScope, $scope, $timeout, theMovieDBService, favoriteService) {
		theMovieDBService.getMovies().success(function(data) {
			$scope.results = data.results;
			$scope.total = data.total_results;
			$scope.orderProp = 'release_date';
		});

		$scope.addFavorite = function(fav) {
			fav.source = 'themoviedb';
			favoriteService.addFavorite(fav, function() {
				$rootScope.refreshFavorites();
			});
		};
		$scope.removeFavorite = function(movie) {
			var fav = $rootScope.favorites[movie.id];
			favoriteService.removeFavorite(fav, function() {
				$rootScope.refreshFavorites();
			});
			
		};
}])
.controller('DetailCtrl', ['$rootScope', '$scope', '$sce', '$timeout', 'theMovieDBService',
	function($rootScope, $scope, $sce, $timeout, theMovieDBService) {
		theMovieDBService.getMovieDetails().success(function(data) {
			$scope.movie = data;
			$scope.setTrailer(0);
			$rootScope.movieId = data.id;

			<!-- Fix to delay isotop until images are loaded -->
			$timeout(function() {
				console.log('Re-initiating isotope');
				$scope.$broadcast('iso-init', {name: null, params: null});
			}, 700);
		});
	$scope.setTrailer = function(index) {
		var data = $scope.movie;
		var trailer = data.trailers.youtube[index];
		if(null != data.trailers.youtube[index] || null) {
			console.log("Setting trailer to index " + index);
			$scope.yturl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + data.trailers.youtube[index].source + "?enablejsapi=0");
			$scope.trailer = data.trailers.youtube[index];
		}
	};
}]);

angular.module('movieApp.theMovieDB.services', [
])
.factory('theMovieDBService', ['$http', '$routeParams', 'apiUrl', 'apiKey', function($http, $routeParams, apiUrl, apiKey) {
	return {
		getMovies : function() {
			return $http.get(apiUrl + "/search/movie?api_key=" + apiKey + "&query=" + $routeParams.movieName);
		},
		getMovieDetails : function() {
			return $http.get(apiUrl + "/movie/" + $routeParams.movieId + "?api_key=" + apiKey + "&append_to_response=credits,trailers");
		},
		getConfigurationData : function() {
			return $http.get(apiUrl + "/configuration?api_key=" + apiKey);
		}
	}
}]);

angular.module('movieApp.shared.directives', [
])
.directive('currentItem', ['$timeout', function($timeout) {

function link(scope, element, attrs) {
    scope.$watch(attrs.currentItem, function(value) {
    	if(value == scope.results.length-1) {
        	<!-- Fix to delay isotop until images are loaded -->
			$timeout(function() {
				console.log('Re-initiating isotope');
				scope.$emit('iso-init', {name: null, params: null});
			}, 500);
        }
    });

}

 return {
      link: link
    };

}])
.value('apiUrl', 'https://api.themoviedb.org/3')
.value('apiKey', '013eff1b8075d646416de6ec45620619');
