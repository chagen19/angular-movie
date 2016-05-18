(function () {
    'use strict';

    function itemsLoadedDirective($timeout) {
        function link(scope) {
            scope.$watch('currentItem', function (value) {
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
                currentItem: '=',
                totalResults: '@'
            },
            link: link
        };
    }

    function isoFilterChangeDirective() {
        return {
            scope: {
                isoFilter: '=isoFilterWatcher'
            },
            link: function (scope) {
                scope.$watch('isoFilter', function (newValue) {
                    if (newValue) {
                        scope.$emit('iso-init', {name: null, params: null});
                    }
                });
            }
        }
    }

    angular.module('movieApp.common', [])
        .directive('currentItem', itemsLoadedDirective)
        .directive('isoFilterWatcher', isoFilterChangeDirective);
})();
