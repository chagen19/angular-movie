/**
 * Created by chagen on 4/3/16.
 */
(function () {
     'use strict';

        var movieSortController = function($log) {
            var vm = this;
            vm.sortedAsc = function (column) {
                return vm.orderProp === column && !vm.sortReverse;
            };

            vm.sortedDesc = function (column) {
                return vm.orderProp === column && vm.sortReverse;
            };

            vm.setSortOrder = function (value, sortAscending) {
                // If same sort value, use previous descending flag which should be the current ascending flag
                if (value === vm.orderProp) {
                    sortAscending = vm.sortReverse;
                }
                $log.info("Sorting by ", value, ", ascending ", sortAscending);
                vm.orderProp = value;
                vm.sortReverse = !sortAscending;
            };
            vm.setSortOrder('title', true);
        };
        
      

    angular.module('movieApp.movieList')
        .component('movieSort', {
            templateUrl: 'app/components/list/sort/movie-sort.html',
            controller: movieSortController,
            controllerAs: 'sort'
        });

})();
    