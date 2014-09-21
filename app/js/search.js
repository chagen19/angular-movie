'use strict';

angular.module('movieApp.search', [
	'ngRoute',
	'movieApp.search.controllers'
])
.config(['$routeProvider', function($routeProvider){
	 $routeProvider.when('/search/:movieName', {
      templateUrl: 'partials/movies.html', 
      controller: 'SearchCtrl'
    });
}]);

angular.module('movieApp.search.controllers', [
	'movieApp.search.services',
	'movieApp.favorites.services',
	'ngAnimate',
  	'iso.directives',
  	'movieApp.shared.directives'
]).controller('SearchCtrl', ['$scope', '$timeout', 'searchService', 'favoriteService',
	function($scope, $timeout, searchService, favoriteService) {
		searchService.getMovies().success(function(data) {
			$scope.results = data.results;
			$scope.total = data.total_results;
			$scope.orderProp = 'release_date';
		});

		$scope.addFavorite = function(fav) {
			fav.source = 'themoviedb';
			fav.favorite=true;
			favoriteService.addFavorite(fav);
		};
}]);

angular.module('movieApp.search.services', [
])
.factory('searchService', ['$http', '$routeParams', function($http, $routeParams) {
	return {
		getMovies : function() {
			return $http.get("https://api.themoviedb.org/3/search/movie?api_key=013eff1b8075d646416de6ec45620619&query=" + $routeParams.movieName);
		}
	};
}]);

angular.module('movieApp.shared.directives', [
])
.directive('currentItem', ['$timeout', function($timeout) {

function link(scope, element, attrs) {
    scope.$watch(attrs.currentItem, function(value) {
        if(value == scope.results.length) {
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

}]);
