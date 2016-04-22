/**
 * Created by chagen on 4/3/16.
 */
(function() {

    function movieCardDirective() {
        return {
            restrict: 'E',
            scope: {
                movie: '=',
                goTo: '&go',
                favorites: '=',
                url: '@'
            },
            templateUrl: 'components/list/card/movie-card.html',
            link: function(scope) {
                scope.go = function(value) {
                    // Need to pass an object that matches to the parameter name of passed in method
                    scope.goTo({path: value});
                };
            }
        };
    }

    angular.module('movieApp.movieList')
        .directive('movieCard', movieCardDirective);
})();