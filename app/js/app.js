'use strict';


// Declare app level module which depends on filters, and services
angular.module('movieApp', [
  'ngRoute',
  'movieApp.favorites',
  'movieApp.theMovieDB',
  'iso.directives',
  'ui.bootstrap',
  'highcharts-ng'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });
}]).run(['$rootScope', '$http', '$location', 'theMovieDBService', 'favoriteService',
    function ($rootScope, $http, $location, theMovieDBService, favoriteService) {
      console.log("Getting configuration data");
      theMovieDBService.getConfigurationData().success(function(data) {
  			$rootScope.url = data.images.base_url;
      });
      $rootScope.tid=0;
      $rootScope.debug=false;
      $rootScope.profileId = 1;
      $rootScope.favorites = {};
      
      refreshFavorites();

      function refreshFavorites() {
        console.log("Refreshing Favorites");
        favoriteService.getFavorites().success(function(data) {
          $rootScope.favorites = {};
          var favs = data.favorites;
          for (var i = 0, len = favs.length; i < len; i++) {
            $rootScope.favorites[favs[i].id] = favs[i];
          }
        });
      };
      $rootScope.refreshFavorites = function() {
        refreshFavorites();
      };
      $rootScope.go = function(path) {
        $location.path(path);
      };
}]);
