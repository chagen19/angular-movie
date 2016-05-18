/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';
    function movieCardController($location, TheMovieDBService) {
        var vm = this;
         TheMovieDBService.getImageBaseUrl().then(function (data) {
             vm.url = data;
         });
        vm.go = function (path) {
            $location.path(path);
        };
    }

    angular.module('movieApp.movieList')
        .component('movieCard', {
            templateUrl: 'components/list/card/movie-card.html',
            controller: movieCardController,
            controllerAs: 'card',
            bindings: {
                movie: '='
            }
        });
})();