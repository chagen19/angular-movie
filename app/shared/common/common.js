(function () {
    'use strict';

    function itemsLoadedDirective($timeout) {
        function link(scope, element, attrs) {
            scope.$watch(attrs.currentItem, function (value) {
                if (value == attrs.totalResults - 1) {
                    <!-- Fix to delay isotop until images are loaded -->
                    $timeout(function () {
                        scope.$emit('isotope.onLayout');
                    }, 300);
                }
            });
        }

        return {
            link: link
        };
    }

    angular.module('movieApp.common', [])
        .directive('currentItem', ['$timeout', itemsLoadedDirective]);
})();
