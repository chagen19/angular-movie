/**
 * Created by chagen on 4/3/16.
 */
(function () {
    function posterSection() {
        return {
            restrict: 'E',
            templateUrl: 'components/detail/poster/poster-section.html'
        }
    }

    angular.module('movieApp.movieDetail')
        .directive('posterSection', posterSection);
})();