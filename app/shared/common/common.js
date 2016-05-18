(function () {
    'use strict';

    function itemsLoadedDirective($timeout) {
        function link(scope) {
            scope.$watch(scope.currentItem, function (value) {
                if (value === scope.totalResults - 1) {
                    <!-- Fix to delay isotop until images are loaded -->
                    $timeout(function () {
                        scope.$emit('isotope.onLayout');
                    }, 400);
                }
            });
        }

        return {
            scope: {
                currentItem: '@',
                totalResults: '@'
            },
            link: link
        };
    }

    angular.module('movieApp.common', [])
        .directive('currentItem', itemsLoadedDirective);
})();
