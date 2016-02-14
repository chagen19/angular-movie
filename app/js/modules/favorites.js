'use strict';

angular.module('movieApp.favorites', [
	'ngRoute',
	'movieApp.favorites.controllers'
])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/favorites', {
      templateUrl: 'views/movies.html',
      controller: 'FavoritesCtrl'
    });
}]);

angular.module('movieApp.favorites.controllers', [
	'movieApp.favorites.services',
	'ngAnimate',
  	'iso.directives'
]).controller('FavoritesCtrl', ['$rootScope', '$scope', '$timeout', 'favoriteService',
	function($rootScope, $scope, $timeout, favoriteService) {
		$scope.results = [];
		// var favs = $rootScope.favorites;
		// console.log("Getting Favs?", favs);
		// angular.forEach(Object.keys(favs), function(key,index) {
		//    this.push(favs[key]);
		// }, $scope.results);
		favoriteService.getFavorites().success(function(data) {
			var favorites = data.favorites;
			angular.forEach(favorites, function(fav) {
				console.log(fav['title']);
				fav.favorite = true;
				fav.profileId = data._id;
				this.push(fav);
			}, $scope.results);
		$scope.page = "Favorites";
		$scope.total = $scope.results.length;
		$scope.orderProp = 'title';
		$scope.sortReverse = false;
	});
		$scope.removeFavorite = function(fav) {
			console.log("FAV", fav);
			var results = $scope.results;
			favoriteService.removeFavorite(fav, function(data) {
				var removeIndex = results.map(function(item) { return item.id; })
                       .indexOf(fav.id);

				console.log("Index Is: ", removeIndex)
				removeIndex > -1 && results.splice(removeIndex, 1);
				$rootScope.refreshFavorites();
				$scope.$broadcast('iso-init', {name: null, params: null});
			});
		};
		$scope.setSortOrder = function(value) {
			console.log("Setting sortBy ", value,  $scope.sortReverse );
			
			var sortAscending=true;
			// If same sort value, use previous descending flag which should be the current ascending flag
			if (value == $scope.orderProp) {
				sortAscending = $scope.sortReverse;		
			} 
			$scope.orderProp = value;
			$scope.$emit('iso-option', { sortBy: ['opt.' + value], sortAscending: sortAscending });
			$scope.sortReverse = !sortAscending;
			
		}

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
