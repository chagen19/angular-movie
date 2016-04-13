/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';

    function favoriteService($rootScope, $http) {

        var factory = {};
        factory.getFavorites = function () {
            return $http.get("http://localhost:3000/profile/" + $rootScope.profileId);
        };

        factory.removeFavorite = function (fav, cb) {
            console.log("Removing favorite from profile ", fav);
            $http.delete("http://localhost:3000/profile/54166d47c0edc80000a81de4/favorite/" + fav._id).success(cb);
        };
        factory.addFavorite = function (fav, cb) {
            //fav.source = 'themoviedb';
            $http.put("http://localhost:3000/profile/54166d47c0edc80000a81de4", fav).success(cb);
        };
        return factory;
    }

    angular.module('movieApp.favorites')
        .factory('favoriteService', favoriteService);
})();