(function () {
  'use strict';

  angular
    .module('cure')
    .component('navbar', {
      controller: function ($location, $log, Auth) {

        var $ctrl = this; // to access from $onAuthStateChanged
        this.user = null;
        this.signout = signout;
        this.active = active;

        function signout() {
          Auth
            .$signOut()
            .then(function () {
              $location.path('/');
            });
        }

        function active(location) {
          return location === $location.path();
        }

        // Equiv. of $window.firebase.onAuthStateChanged
        Auth.$onAuthStateChanged(function (user) {
          $ctrl.user = user;
        });
      },
      templateUrl: 'app/components/navbar/navbar.html'
    });

})();
