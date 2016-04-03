/**
 * Created by chagen on 4/3/16.
 */
(function () {
    function sortController($scope) {
        $scope.sortedAsc = function (column) {
            return $scope.orderProp == column && !$scope.sortReverse;
        };

        $scope.sortedDesc = function (column) {
            return $scope.orderProp == column && $scope.sortReverse;
        };

        $scope.setSortOrder = function (value, sortAscending) {
            // If same sort value, use previous descending flag which should be the current ascending flag
            if (value == $scope.orderProp) {
                sortAscending = $scope.sortReverse;
            }
            console.log("Sorting by ", value, ", ascending ", sortAscending);
            $scope.orderProp = value;
            $scope.sortReverse = !sortAscending;
        };
        $scope.setSortOrder('title', true);
    }

    function sortDirective() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/list/sort/movie-sort.html',
            controller:  ['$scope', sortController]
        }
    }

    angular.module('movieApp.movieList')
        .directive('movieSort', sortDirective);

})();
    