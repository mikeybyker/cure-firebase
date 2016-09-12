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

        // Trying to stop unit-tests blowing up...
        // Why did I put init in .run?
        // Docs has in config : https://github.com/firebase/angularfire/blob/master/docs/reference.md#initialization
        //  And anyway, this doesn't help :-|
        // firebase.initializeApp(firebaseConfig);
    }

})();