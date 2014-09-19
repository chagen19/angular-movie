'use strict';


// Declare app level module which depends on filters, and services
angular.module('movieApp', [
  'ngRoute',
  'movieApp.favorites',
  'movieApp.search',
  'movieApp.details',
  'iso.directives'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });
}]).run(['$rootScope', '$http', '$location',
    function ($rootScope, $http, $location) {
        $http.get("https://api.themoviedb.org/3/configuration?api_key=013eff1b8075d646416de6ec45620619").success(function(data) {
  			$rootScope.url = data.images.base_url;
        $rootScope.tid=0;

        $rootScope.go = function(path) {
          console.log("Path is " + path);
          $location.path(path);
        };
  	});	
}]);
