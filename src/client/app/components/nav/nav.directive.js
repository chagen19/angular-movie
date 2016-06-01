/**
 * Created by chagen on 5/19/16.
 */
(function () {
    'use strict';
    var navCtrl = function($location, NavService, NAV_LINKS) {
        var vm = this;
        vm.links = NAV_LINKS;
console.log("NAV SERVICE", NavService)
        vm.go = function (path) {
            NavService.activeTab = path;
            $location.path(path);
        };

        vm.isActiveTab = function(currentTab) {
            return NavService.activeTab === currentTab;
        } ;
    };

    angular.module('movieApp')
        .component('movieNav', {
            templateUrl: 'app/components/nav/nav.html',
            controller: navCtrl,
            controllerAs: 'nav'
        })
        .service('NavService', function (NAV_LINKS) {
            this.activeTab = NAV_LINKS.UPCOMING;
        })
        .constant("NAV_LINKS", {
            "HOME": "/",
            "FAVORITES": "/favorites",
            "IN_THEATRES": "/now-playing",
            "TOP_RATED": "/top-rated",
            "UPCOMING": "/upcoming"
        });
})();