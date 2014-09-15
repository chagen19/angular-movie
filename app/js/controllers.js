'use strict';

/* Controllers */

var movieControllers = angular.module('movieControllers', [])

.controller("SearchCtrl", ['$rootScope', '$scope', '$http', '$routeParams',
	function($rootScope, $scope, $http, $routeParams) {
		console.log("here");
		$http.get("https://api.themoviedb.org/3/search/movie?api_key=013eff1b8075d646416de6ec45620619&query=" + $routeParams.movieName).success(function(data) {
			$scope.results = data.results;
			$scope.total = data.total_results;
			$scope.orderProp = 'release_date';
		});
		
		$scope.addFavorite = function(fav) {
			console.log("Adding Favorite");
			$http.put("http://localhost:3000/profile/1", fav).success(function(data) {
				console.log(fav.title + " added to favorites!");
				fav.favorite=true;
			});
		};
	}])
.controller("FavoritesCtrl", ['$scope', '$http', '$routeParams',
	function($scope, $http, $routeParams) {
		$scope.results = [];
		$http.get("http://localhost:3000/profile/1").success(function(data) {
			var favorites = data.favorites;
			angular.forEach(favorites, function(fav) {
				console.log(fav['title'])
				fav.favorite = true;
				this.push(fav);
			}, $scope.results);
			$scope.page = "Favorites";
			$scope.total = favorites.length;
			$scope.orderProp = 'release_date';
		});

		$scope.removeFavorite = function(fav) {
			console.log("Removing Favorite");
			$http.delete("http://localhost:3000/profile/1/favorite/" + fav.id).success(function(data) {
				console.log(fav.title + " removed from favorites!");
			});
			var index = $scope.results.indexOf(fav);
			$scope.results.splice(index, 1);
		};
	}])
.controller("DetailCtrl", ['$rootScope', '$scope', '$http', '$routeParams', '$sce',
	function($rootScope, $scope, $http, $routeParams, $sce) {
		$http.get("https://api.themoviedb.org/3/movie/" + $routeParams.movieId + "?api_key=013eff1b8075d646416de6ec45620619&append_to_response=credits,trailers").success(function(data) {
		$scope.movie = data;

		$scope.setTrailer = function(value) {
			console.log("Setting trailer to index " + value);
			$scope.yturl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + data.trailers.youtube[value].source + "?enablejsapi=0");
			$scope.trailer = data.trailers.youtube[value];
		};
		$scope.setTrailer(0);
		$rootScope.movieId = data.id;
		});
	}]);