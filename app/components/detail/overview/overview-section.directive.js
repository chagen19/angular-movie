/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';
    function overviewSection() {
        return {
            restrict: 'E',
            scope: {
                movie: '='
            },
            templateUrl: 'components/detail/overview/overview-section.html'
        };
    }

    angular.module('movieApp.movieDetail')
        .directive('overviewSection', overviewSection);

})();