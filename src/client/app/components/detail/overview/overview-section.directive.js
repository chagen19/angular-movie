/**
 * Created by chagen on 4/3/16.
 */
(function () {
    'use strict';

    angular.module('movieApp.movieDetail')
        .component('overviewSection', {
            templateUrl: 'app/components/detail/overview/overview-section.html',
            controllerAs: 'overview',
            bindings: {
                movie: '='
            }
        });

})();