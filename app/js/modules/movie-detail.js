'use strict';
angular.module('movieApp.movieDetail', [
	'ngRoute',
	'movieApp.movieDetail.controllers',
	'movieApp.movieSearch.directives'
])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/details/:movieId', {
			templateUrl: 'views/movie-detail.html',
			controller: 'DetailCtrl'
		});
}]);

angular.module('movieApp.movieDetail.controllers', [
	'movieApp.movieDetail.directives',
	'movieApp.theMovieDB.services',
	'ngAnimate'
])
.controller('DetailCtrl', ['$rootScope', '$scope', '$sce', '$timeout', 'theMovieDBService',
	function($rootScope, $scope, $sce, $timeout, theMovieDBService) {
		theMovieDBService.getMovieDetails().success(function(data) {
			$scope.movie = data;
			$scope.trailerCount = data.trailers.youtube.length;
			$rootScope.movieId = data.id;
			$scope.reInitIso();
		});

		$scope.reInitIso = function() {
			<!-- Fix to delay isotop until images are loaded -->
			$timeout(function() {
				console.log('Re-initiating isotope');
				$scope.$broadcast('iso-init', {name: null, params: null});
				// $scope.$emit('iso-method', {name: 'arrange', params: null});
				//$scope.$broadcast('chad');
			}, 700);
		};
}]);

angular.module('movieApp.movieDetail.directives', [
])
.directive('posterSection', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/components/poster-section.html'
	}
})
.directive('overviewSection', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/components/overview-section.html'
	}
})
.directive('trailersSection', ['$sce', function($sce) {

	return {
		restrict: 'E',
		scope: {
			movie: "="
		},
		templateUrl: 'views/components/trailers-section.html',
		controller: function($scope, $element, $attrs) {
			$scope.$watch($attrs.movie, function(value) {
				if(value) {
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
.directive('castSection', ['theMovieDBService', function(theMovieDBService) {
	return {
		restrict: 'E',
		templateUrl: 'views/components/cast-section.html',
		controller: function($scope, $element, $attrs) {
			theMovieDBService.getCredits().success(function(data) {
				$scope.cast = data.cast;
				$scope.total = data.cast.length;
			});
		},
		link: function(scope, element, attrs) {
		
		}
	}
}])
.directive('similarSection', ['$rootScope', 'theMovieDBService', function($rootScope, theMovieDBService) {

	return {
		restrict: 'E',
		templateUrl: 'views/movie-list.html',
		controller: function($scope, $element, $attrs) {
			$scope.url = $rootScope.url;
			theMovieDBService.getSimilarMovies().success(function(data) {
				$scope.total = data.results.length;
				$scope.total_results = data.total_results;
				$scope.results = data.results;
			});
		},
		link: function(scope, element, attrs) {
			scope.$on('chad', function() {
				console.log("Chadly")
				scope.$emit('iso-init', {name: null, params: null});
			});
		}
	};
}])