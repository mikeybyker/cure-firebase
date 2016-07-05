(function() {
    'use strict';

    angular
        .module('cure')
        .run(runBlock);

    function runBlock($log, $window, $rootScope, $location, firebaseConfig) {

        $window.firebase.initializeApp(firebaseConfig);

        var r = $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            if (error === 'AUTH_REQUIRED') {
                $location.path('/');
            }
        });

    }

})();