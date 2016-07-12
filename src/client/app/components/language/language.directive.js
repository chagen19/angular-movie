(function () {
    'use strict';

    function languageController($translate, $log) {
        var vm = this;
        vm.items = [
            {language: 'English', key: 'en_US'},
            {language: 'German', key: 'de_DE'},
            {language: 'Norwegian', key: 'no_NO'},
            ];
        vm.changeLanguage = function (langKey) {
            $log.info("Changing language to", langKey)
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