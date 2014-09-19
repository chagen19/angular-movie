'use strict';

angular.module('movieApp.favorites', [
	'ngRoute',
	'movieApp.favorites.controllers'
])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/favorites', {
      templateUrl: 'partials/movies.html', 
      controller: 'FavoritesCtrl'
    });
}]);

angular.module('movieApp.favorites.controllers', [
	'movieApp.favorites.services',
	'ngAnimate',
  	'iso.directives'
]).controller('FavoritesCtrl', ['$scope', '$timeout', 'favoriteService',
	function($scope, $timeout, favoriteService) {
		$scope.results = [];
		favoriteService.getFavorites().success(function(data) {
			var favorites = data.favorites;
			angular.forEach(favorites, function(fav) {
				console.log(fav['title']);
				fav.favorite = true;
				fav.profileId = data._id;
				this.push(fav);
			}, $scope.results);
			$scope.page = "Favorites";
			$scope.total = favorites.length;
			$scope.orderProp = 'release_date';

			<!-- Fix to delay isotop until images are loaded -->
			$timeout(function() {
				console.log('Re-initiating isotope');
				$scope.$broadcast('iso-init', {name: null, params: null});
			}, 100);
		});

		$scope.removeFavorite = function(fav) {
			favoriteService.removeFavorite(fav);
			var index = $scope.results.indexOf(fav);
			$scope.results.splice(index, 1);
			$scope.$broadcast('iso-init', {name: null, params: null});
		};

}]);

angular.module('movieApp.favorites.services', [
])
.factory('favoriteService', ['$http', function($http) {

	var factory = {};
	factory.getFavorites = function() {
		return $http.get("http://localhost:3000/profile/1");
	};

	factory.removeFavorite = function(fav) {
		console.log("Removing favorite from profile " + fav.profileId);
		$http.delete("http://localhost:3000/profile/" + fav.profileId + "/favorite/" + fav._id).success(function(data) {
			console.log(fav.title + " removed from favorites!");
		});
	};
	factory.addFavorite = function(fav) {
		fav.source = 'themoviedb';
		$http.put("http://localhost:3000/profile/54166d47c0edc80000a81de4", fav).success(function(data) {
			console.log(fav.title + " added to favorites!");
		});
	};
	return factory;
}]);