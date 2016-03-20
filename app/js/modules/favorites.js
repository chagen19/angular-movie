'use strict';

angular.module('movieApp.favorites', [
	'ngRoute',
	'movieApp.favorites.controllers'
])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/favorites', {
      templateUrl: 'views/movie-list.html',
      controller: 'FavoritesCtrl'
    });
}]);

angular.module('movieApp.favorites.controllers', [
	'movieApp.favorites.services',
	'movieApp.theMovieDB.services',
	'ngAnimate'
]).controller('FavoritesCtrl', ['$rootScope', '$scope', '$timeout', 'favoriteService','theMovieDBService',
	function($rootScope, $scope, $timeout, favoriteService, theMovieDBService) {
		var results = [];
		$scope.results = [];
		console.log("Retrieving Favorites");
		favoriteService.getFavorites().success(function(data) {
			$scope.total = data.favorites.length;
			angular.forEach(data.favorites, function(fav, index) {
				theMovieDBService.getMovieById(fav.id).success(function(data) {
					results.push(data);
					// Set results after they all have been loaded
					if(index==$scope.total-1) {
						$scope.results = results;
					}
				});
				
			});
		$scope.page = "Favorites";
	});
		$scope.removeFavorite = function(fav) {
			console.log("FAV", fav);
			var results = $scope.results;
			favoriteService.removeFavorite($rootScope.favorites[fav.id], function(data) {
				var removeIndex = results.map(function(item) { return item.id; })
                       .indexOf(fav.id);

				console.log("Index Is: ", removeIndex)
				removeIndex > -1 && results.splice(removeIndex, 1);
				$rootScope.refreshFavorites();
				$scope.$broadcast('iso-init', {name: null, params: null});
			});
		};
}]);

angular.module('movieApp.favorites.services', [
])
.factory('favoriteService', ['$rootScope', '$http', function($rootScope, $http) {

	var factory = {};
	factory.getFavorites = function() {
		return $http.get("http://localhost:3000/profile/" + $rootScope.profileId);
	};

	factory.removeFavorite = function(fav, cb) {
		console.log("Removing favorite from profile ", fav);
		$http.delete("http://localhost:3000/profile/54166d47c0edc80000a81de4/favorite/" + fav._id).success(cb);
	};
	factory.addFavorite = function(fav, cb) {
		//fav.source = 'themoviedb';
		$http.put("http://localhost:3000/profile/54166d47c0edc80000a81de4", fav).success(cb);
	};
	return factory;
}]);
