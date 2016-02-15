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
			templateUrl: 'views/movieDetail.html',
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
		theMovieDBService.getMovies().success(function(data) {
			$scope.total = data.results.length;
			$scope.orderProp = 'title';
			$scope.sortReverse = false;
			$scope.results = data.results;
		});

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
			
		}
}])
.controller('DetailCtrl', ['$rootScope', '$scope', '$sce', '$timeout', 'theMovieDBService',
	function($rootScope, $scope, $sce, $timeout, theMovieDBService) {
		theMovieDBService.getMovieDetails().success(function(data) {
			$scope.movie = data;
			$scope.setTrailer(0);
			$rootScope.movieId = data.id;

			<!-- Fix to delay isotop until images are loaded -->
			$timeout(function() {
				console.log('Re-initiating isotope');
				$scope.$broadcast('iso-init', {name: null, params: null});
			}, 700);
			loadChart();
		});
	$scope.setTrailer = function(index) {
		var trailer = $scope.movie.trailers.youtube[index];
		if(null != trailer || null) {
			console.log("Setting trailer to index " + index);
			$scope.yturl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + trailer.source + "?enablejsapi=0");
			$scope.trailer = trailer;
		}
	};
	function loadChart() {
$scope.chartConfig = {
        options: {
            chart: {
                type: 'solidgauge',
                height: 200
            },
            pane: {
                center: ['50%', '50%'],
                size: '100%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor:'#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
        series: [{
            data: [$scope.movie.vote_average],
            dataLabels: {
	        	format: '<div style="text-align:center"><span style="font-size:12px;color:black">{y}/10</span></div>'
	        }
        }],
        title: {
            text: 'Average Rating'
        },
        yAxis: {
            currentMin: 0,
            currentMax: 10,    
			stops: [
                [0.1, '#DF5353'], // red
	        	[0.5, '#DDDF0D'], // yellow
	        	[0.9, '#55BF3B'] // green
			],
			lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            labels: {
                y: 16
            }
        },
        loading: false
    }
}
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
.value('apiUrl', 'https://api.themoviedb.org/3')
.value('apiKey', '013eff1b8075d646416de6ec45620619');
