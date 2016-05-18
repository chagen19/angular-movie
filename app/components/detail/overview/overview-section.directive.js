/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';

    angular.module('movieApp.movieDetail')
        .component('overviewSection', {
            templateUrl: 'components/detail/overview/overview-section.html',
            bindings: {
                movie: '='
            }
        });

})();