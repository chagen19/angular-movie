(function () {
    'use strict';

    function languageController($translate) {
        var vm = this;
        vm.items = [
            {language: 'English', key: 'en_US'},
            {language: 'German', key: 'de_DE'}
            ];
        vm.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };

    }

    angular.module('movieApp')
        .component('language', {
            templateUrl: 'app/components/language/language.html',
            controller: languageController,
            controllerAs: 'language'
        });
})();