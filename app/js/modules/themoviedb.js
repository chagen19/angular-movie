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
			templateUrl: 'views/movie-details.html',
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
	
		$scope.search = function() {
			theMovieDBService.getMovies().success(function(data) {
				$scope.total = data.results.length;
				$scope.total_results = data.total_results;
				$scope.results = data.results;
			});
		};

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
		$scope.search();
		
}])
.controller('DetailCtrl', ['$rootScope', '$scope', '$sce', '$timeout', 'theMovieDBService',
	function($rootScope, $scope, $sce, $timeout, theMovieDBService) {
		theMovieDBService.getMovieDetails().success(function(data) {
			$scope.movie = data;
			$rootScope.movieId = data.id;

			<!-- Fix to delay isotop until images are loaded -->
			$timeout(function() {
				console.log('Re-initiating isotope');
				$scope.$broadcast('iso-init', {name: null, params: null});
			}, 700);
		});
}])
.controller('SortController', ['$scope', function($scope) {
	$scope.sortedAsc = function(column) {
		return $scope.orderProp == column && !$scope.sortReverse;
	};

	$scope.sortedDesc = function(column) {
		return $scope.orderProp == column && $scope.sortReverse;
	};

	$scope.setSortOrder = function(value) {
			var sortAscending=true;
			// If same sort value, use previous descending flag which should be the current ascending flag
			if (value == $scope.orderProp) {
				sortAscending = $scope.sortReverse;		
			} 
			console.log("Sorting by ", value,  ", ascending ",sortAscending);
			$scope.orderProp = value;
			$scope.sortReverse = !sortAscending;
			$scope.$emit('iso-option', { sortBy: ['opt.' + value], sortAscending: sortAscending });
	};

	$scope.setSortOrder('title');

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
		},
		getMovieById : function(movieId) {
			return $http.get(apiUrl + "/movie/" + movieId + "?api_key=" + apiKey);
		},
	}
}]);

angular.module('movieApp.shared.directives', [
])
.directive('currentItem', ['$timeout', function($timeout) {

function link(scope, element, attrs) {
    scope.$watch(attrs.currentItem, function(value) {
    	if(value == attrs.totalResults-1) {
        	<!-- Fix to delay isotop until images are loaded -->
			$timeout(function() {
				console.log('Re-initiating isotope for item', value);
				scope.$emit('iso-init', {name: null, params: null});
			}, 500);
        }
    });
}

 return {
      link: link
    };

}])
.directive('trailersSection', ['$sce', function($sce) {

	return {
		restrict: 'E',
		 scope: {
		 		movie: "="
		 },
		templateUrl: 'views/components/trailers-section.html',
		controller: function($scope, $element, $attrs) {
			$scope.$watch(function($scope) { return $scope.movie;}, function(value) {
				if(value !== undefined) {
					$scope.setTrailer(0);
				}
			});
		},
		link: function(scope, element, attrs) {
			scope.setTrailer = function(index) {
				var trailer = scope.movie.trailers.youtube[index];
				if(null != trailer || null) {
					console.log("Setting trailer to index " + index);
					scope.yturl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + trailer.source + "?enablejsapi=0");
					scope.trailer = trailer;
				}
			}
		}
	};
}])
.value('apiUrl', 'https://api.themoviedb.org/3')
.value('apiKey', '013eff1b8075d646416de6ec45620619');
