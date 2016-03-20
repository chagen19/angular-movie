'use strict';
angular.module('movieApp.movieSearch', [
	'ngRoute',
	'movieApp.movieSearch.controllers'
])
.config(['$routeProvider', function($routeProvider){
	 $routeProvider.when('/search/:movieName', {
      templateUrl: 'views/movie-list.html',
      controller: 'SearchCtrl'
    });
}]);

angular.module('movieApp.movieSearch.controllers', [
	'movieApp.theMovieDB.services',
	'movieApp.favorites.services',
	'movieApp.movieSearch.directives'
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

angular.module('movieApp.movieSearch.directives', [
])
.directive('currentItem', ['$timeout', function($timeout) {
	function link(scope, element, attrs) {
	    scope.$watch(attrs.currentItem, function(value) {
	    	if(value == attrs.totalResults-1) {
	        	<!-- Fix to delay isotop until images are loaded -->
				$timeout(function() {
					console.log('Re-initiating isotope for item', value);
					scope.$emit('iso-init', {name: null, params: null});
				}, 100);
	        }
	    });
	}

	 return {
	      link: link
	    };
}]);
