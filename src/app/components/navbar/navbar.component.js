(function() {
    'use strict';

    angular
        .module('cure')
        .component('navbar', {
            controller: function(Auth, $location, $log){

                var $ctrl = this; // to access from $onAuthStateChanged
                this.user = null;
                this.signout = signout;
                this.active = active;

                function signout() {
                    Auth
                        .$signOut()
                        .then(function(){
                            $location.path('/');
                        });
                }

                function active(location) {
                    return location === $location.path();
                }

                // Equiv. of $window.firebase.onAuthStateChanged
                Auth.$onAuthStateChanged(function(user) {
                    $ctrl.user = user;
                    if (user) {
                        // User is signed in.
                        // $log.info('$onAuthStateChanged ::: user signed in');
                    } else {
                        // No user signed in.
                        // $log.info('$onAuthStateChanged ::: user *not* signed in');
                    }
                });
            },
            templateUrl: 'app/components/navbar/navbar.html'
        });

})();