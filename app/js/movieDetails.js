'use strict';

angular.module('movieApp.details', [
	'ngRoute', 
	'movieApp.details.controllers'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/details/:movieId', {
      templateUrl: 'partials/movieDetail.html', 
      controller: 'DetailCtrl'
    });
}]);

angular.module('movieApp.details.controllers', [
	'moiveApp.details.services',
	'ngAnimate',
	'iso.directives'
])
.controller('DetailCtrl', ['$rootScope', '$scope', '$sce', '$timeout', 'detailsService',
	function($rootScope, $scope, $sce, $timeout, detailsService) {
		detailsService.getMovieDetails().success(function(data) {
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

angular.module('moiveApp.details.services', [
])
.factory('detailsService', ['$http', '$routeParams', function($http, $routeParams) {
	return {
		getMovieDetails : function() {
			return $http.get("https://api.themoviedb.org/3/movie/" + $routeParams.movieId + "?api_key=013eff1b8075d646416de6ec45620619&append_to_response=credits,trailers");
		}
	};
}]);