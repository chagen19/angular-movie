'use strict';


// Declare app level module which depends on filters, and services
angular.module('movieApp', [
  'ngRoute',
  'movieApp.favorites',
  'movieApp.theMovieDB',
  'iso.directives'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });
}]).run(['$rootScope', '$http', '$location', 'theMovieDBService',
    function ($rootScope, $http, $location, theMovieDBService) {
      console.log("Getting configuration data");
        theMovieDBService.getConfigurationData().success(function(data) {
  			$rootScope.url = data.images.base_url;
        $rootScope.tid=0;
        $rootScope.profileId = 1;

        $rootScope.go = function(path) {
          $location.path(path);
        };
  	});
}]);
