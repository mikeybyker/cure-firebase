(function() {
    'use strict';

    angular
        .module('cure')
        .config(config);

    function config($logProvider, toastrConfig) {

        $logProvider.debugEnabled(true);

        toastrConfig.allowHtml = true;
        toastrConfig.timeOut = 2000;
        toastrConfig.positionClass = 'toast-top-right';
        toastrConfig.preventDuplicates = false;     // true prevents same as last toast : don't want
        toastrConfig.preventOpenDuplicates = true;  // true prevents the same toast as is currently showing
        toastrConfig.maxOpened = 1;
        toastrConfig.progressBar = true;

    }

})();
