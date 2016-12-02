(function () {
  'use strict';

  angular
    .module('cure')
    .controller('ReleaseController', ReleaseController);

  function ReleaseController($routeParams, $location, Discog, toastr) {
    var vm = this;
    vm.releaseId = $routeParams.id;

    // Use once : don't need to keep on tracking/waiting for update
    Discog.getRelease($routeParams.id).then(function (data) {
      vm.release = data[0];
      vm.tracks = data[1];
    }, function (reason) {
      toastr.error(reason.statusText, 'Error', {
        onHidden: function () {
          $location.path('/');
        }
      });
    });

  }

})();
