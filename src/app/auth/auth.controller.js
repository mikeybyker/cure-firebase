(function () {
  'use strict';

  angular
    .module('cure')
    .controller('AuthController', function ($location, $log, $scope, Discog, Auth, toastr) {

      var vm = this;
      vm.oauthLogin = oauthLogin;
      vm.user = null;
      // Show top X by votes : will update live as/when top X changes
      vm.topTracks = Discog.getRanks(5);

      function oauthLogin(providerName) {
        if (!providerName) {
          return;
        }
        Auth.$signInWithPopup(providerName)
          .then(function (result) {
            $location.path('/release');
          }).catch(function (reason) {
            $log.warn('error ::: ', reason);
            toastr.error(reason.statusText, 'Error', {
              onHidden: function () {
                $location.path('/');
              }
            });
          });
      }

      Auth.$onAuthStateChanged(function (user) {
        vm.user = user;
      });

      // To clean up angularfire references (stop permission errors...)
      $scope.$on('$destroy', function () {
        vm.topTracks.$destroy && vm.topTracks.$destroy();
      });

    });

})();
