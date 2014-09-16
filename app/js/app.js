'use strict';


// Declare app level module which depends on filters, and services
angular.module('movieApp', [
  'ngRoute',
  'ngAnimate',
  'movieControllers',
  'iso.directives'
]).
config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider.when('/search/:movieName', {
      templateUrl: 'partials/movies.html', 
      controller: 'SearchCtrl'
    });
     $routeProvider.when('/favorites', {
      templateUrl: 'partials/movies.html', 
      controller: 'FavoritesCtrl'
    });
    $routeProvider.when('/details/:movieId', {
      templateUrl: 'partials/movieDetail.html', 
      controller: 'DetailCtrl'
    });
    $routeProvider.otherwise({
      redirectTo: '/'
    });
}]).run(["$rootScope", "$http", 
         function ($rootScope, $http) {
         $http.get("https://api.themoviedb.org/3/configuration?api_key=013eff1b8075d646416de6ec45620619").success(function(data) {
  			$rootScope.url = data.images.base_url;
        $rootScope.tid=0;
  		});	

}]);
