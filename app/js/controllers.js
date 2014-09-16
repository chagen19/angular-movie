'use strict';

/* Controllers */

var movieControllers = angular.module('movieControllers', [])

.controller("SearchCtrl", ['$rootScope', '$scope', '$http', '$routeParams', '$timeout',
	function($rootScope, $scope, $http, $routeParams, $timeout) {
		$http.get("https://api.themoviedb.org/3/search/movie?api_key=013eff1b8075d646416de6ec45620619&query=" + $routeParams.movieName).success(function(data) {
			$scope.results = data.results;
			$scope.total = data.total_results;
			$scope.orderProp = 'release_date';
		});
		
		
		$scope.addFavorite = function(fav) {
			fav.source = 'themoviedb';
			$http.put("http://localhost:3000/profile/54166d47c0edc80000a81de4", fav).success(function(data) {
				console.log(fav.title + " added to favorites!");
				fav.favorite=true;
			});
		};

		<!-- Fix to delay isotop until images are loaded -->
		$timeout(function() {
			console.log('Re-initiating isotope');
			$scope.$broadcast('iso-init', {name: null, params: null});
		}, 100);
	}])
.controller("FavoritesCtrl", ['$scope', '$http', '$routeParams',
	function($scope, $http, $routeParams) {
		$scope.results = [];
		$http.get("http://localhost:3000/profile/1").success(function(data) {
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
		});

		$scope.removeFavorite = function(fav) {
			console.log("Removing favorite from profile " + fav.profileId);
			$http.delete("http://localhost:3000/profile/" + fav.profileId + "/favorite/" + fav._id).success(function(data) {
				console.log(fav.title + " removed from favorites!");
			});
			var index = $scope.results.indexOf(fav);
			$scope.results.splice(index, 1);
			$scope.$broadcast('iso-init', {name: null, params: null});
		};
	}])
.controller("DetailCtrl", ['$rootScope', '$scope', '$http', '$routeParams', '$sce', '$timeout',
	function($rootScope, $scope, $http, $routeParams, $sce, $timeout) {
		$http.get("https://api.themoviedb.org/3/movie/" + $routeParams.movieId + "?api_key=013eff1b8075d646416de6ec45620619&append_to_response=credits,trailers").success(function(data) {
		$scope.movie = data;

		$scope.setTrailer = function(value) {
			var trailer = data.trailers.youtube[value];
			if(null != data.trailers.youtube[value] || null) {
				console.log("Setting trailer to index " + value);
				$scope.yturl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + data.trailers.youtube[value].source + "?enablejsapi=0");
				$scope.trailer = data.trailers.youtube[value];
			}
		};
		$scope.setTrailer(0);
		$rootScope.movieId = data.id;

		<!-- Fix to delay isotop until images are loaded -->
		$timeout(function() {
			console.log('Re-initiating isotope');
			$scope.$broadcast('iso-init', {name: null, params: null});
		}, 500);
		});
	}]);