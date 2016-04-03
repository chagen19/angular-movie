/**
 * Created by chagen on 4/3/16.
 */
(function () {
    function overviewSection() {
        return {
            restrict: 'E',
            templateUrl: 'components/detail/overview/overview-section.html'
        }
    }

    angular.module('movieApp.movieDetail')
        .directive('overviewSection', overviewSection);

})();