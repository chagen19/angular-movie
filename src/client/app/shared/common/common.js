(function () {
    'use strict';

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
        };
    }

    angular.module('movieApp.common', [])
        .directive('isoFilterWatcher', isoFilterChangeDirective);
})();
